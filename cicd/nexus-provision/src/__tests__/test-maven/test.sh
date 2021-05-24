#!/bin/bash

# fail if anything errors
set -e
# fail if a function call is missing an argument
set -u
set +x

./gradlew clean build

printf "Test maven release publish with auth\n"

./gradlew publish

printf "Test maven release publish 2nd time should fail\n"

# Expecting error
set +e
./gradlew publish
result=$?
set -e

if [[ "$result" == "0" ]]; then
  exit 1
fi

printf "Test maven release publish without auth\n"

echo "nexusUseCredentials=false" > gradle.properties
cat gradle.properties

# Expecting error
set +e
./gradlew publish
result=$?
set -e

printf "publishing without auth should fail\n"

if [[ "$result" == "0" ]]; then
  exit 1
fi

printf "Test maven install without auth\n"

curl -vvv -o lib.jar http://nexus:8081/repository/maven-releases/test/maven/library/0.1.0/library-0.1.0.jar
