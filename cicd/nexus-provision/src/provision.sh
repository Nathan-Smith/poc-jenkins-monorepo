#!/bin/bash

# fail if anything errors
set -e
# fail if a function call is missing an argument
set -u

# Nexus base URL
host=http://nexus:8081

# Nexus 3 Status REST API to determine when Nexus is ready to accept configuration changes
statusURL=$host/service/rest/v1/status/writable

echo "Testing $statusURL"
# Try the Status API for at least 120 seconds every 2 seconds, if Nexus fails to start in 120 seconds don't go ahead with provisioning
timeout -s TERM 120  bash -c \
'while [[ "$(curl -s -o /dev/null -L -w ''%{http_code}'' ${0})" != "200" ]];\
do echo "Waiting for ${0}" && sleep 2;\
done' ${statusURL}
echo "OK!"
curl -I $statusURL

# Default Credentials for an unprovisioned Nexus 3 Instance
username=admin
password=admin123

# Return the HTTP Status Code for attempting to use the Authenticated Nexus 3 Status-Check REST API
function checkAdminPassword {
  printf "$(curl -s -o /dev/null -L -u $username:$1 -w ''%{http_code}'' $host/service/rest/v1/status/check)"
}

# Use the Default Credentials or if Nexus was already provisioned, use the provisioned Admin password. Note that this logic doesn't allow for the Admin password to be changed after inital provisioning.
if [[ "$(checkAdminPassword $password)" == "200" ]]; then
  echo "Using default creds"
elif [[ "$(checkAdminPassword $NEXUS_ADMIN_PASSWORD)" == "200" ]]; then
  echo "Using provisioned creds"
  password=$NEXUS_ADMIN_PASSWORD
else
  echo "Credentials for admin user are incorrect"
  exit 1
fi

scriptName=provision
# Read the contents of the script and escape new lines and double quotes so it can be embedded into a JSON HTTP Body
scriptBody=$(cat main/groovy/$scriptName.groovy | sed -z 's/\n/\\n/g;s/"/\\"/g')

function scriptHttpBody {
  cat <<EOF
  {
    "name": "$scriptName",
    "content": "$scriptBody",
    "type": "groovy"
  }
EOF
}

echo "Checking for existing script"
if [[ "$(curl -s -o /dev/null -L -u $username:$password -w ''%{http_code}'' $host/service/rest/v1/script/$scriptName)" == "200" ]]; then
  echo "Existing, uploading new version of $scriptName"
  httpMethod=PUT
  scriptUploadUrl=$host/service/rest/v1/script/$scriptName
else
  echo "Nonextant, uploading $scriptName"
  httpMethod=POST
  scriptUploadUrl=$host/service/rest/v1/script
fi

echo "$(scriptHttpBody)"
curl --fail-with-body -v -X $httpMethod -d "$(scriptHttpBody)" -H "accept: application/json" -H "Content-Type: application/json" -u $username:$password $scriptUploadUrl
printf "\n"

# Takes a Bash Array and join each element into a single string by the provided join string
function join_by { local IFS="$1"; shift; echo "$*"; }

# Takes a User Configuration value and converts it into a JSON Array of Objects
function usersToJson {
  # Split the string by :
  IFS=':' read -r -a users <<< "$1"
  for index in "${!users[@]}"
  do
    # Repalce ; that separates key-values pairs with ","
    # Replace = that seperates key and value with ":"
    users[$index]=$(echo "{\"${users[index]}}" | sed -z 's/\;/","/g;s/=/":"/g;s/,"}/}/g')
  done
  # Join the array of JSON Object (as string) into a JSON Array
  printf "[$(join_by , "${users[@]}")]"
}

# The HTTP JSON Body that the provision script uploaded eariler to Nexus will read as arguments
function runHttpBody {
  cat <<EOF
{
  "adminPassword": "$NEXUS_ADMIN_PASSWORD",
  "adminUsers": $(usersToJson $NEXUS_ADMIN_USERS),
  "deployerUsers": $(usersToJson $NEXUS_DEPLOYER_USERS)
}
EOF
}

echo "Running $scriptName ($host/service/rest/v1/script/$scriptName/run)"
echo "$(runHttpBody)"
curl --fail-with-body -v -u $username:$password  -d "$(runHttpBody)" -H "Content-Type: application/json" "$host/service/rest/v1/script/$scriptName/run"
printf "\n"

echo "Validating changes..."
echo "Checking Admin Password:"

if [[ "$(checkAdminPassword $NEXUS_ADMIN_PASSWORD)" == "200" ]]; then
  echo "Admin Password is working"
else
  echo "Admin Password not applied"
  exit 1
fi
