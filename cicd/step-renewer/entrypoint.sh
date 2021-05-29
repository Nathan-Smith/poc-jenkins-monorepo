#!/bin/sh
# Modified from: https://raw.githubusercontent.com/smallstep/certificates/0d4f96c1d9a9d78fc5a9cdc727e83723930803af/examples/docker/renewer/entrypoint.sh

# Wait for CA
sleep 5

# Write provisioner password to file
printf "$STEP_PROVISIONER_PASSWORD" > /etc/password

# Clean old certificates
rm -f /var/local/step/root_ca.crt

# Download the root certificate
step ca root /var/local/step/root_ca.crt

function downloadRootCertificate {
  printf "Downloading Root Certificat for $1\n"
  # Clean old certificates
  rm -f /var/local/step/$1.crt /var/local/step/$1.key

  # Get token
  STEP_TOKEN=$(step ca token $1 --password-file=/etc/password)
  # Download the root certificate
  step ca certificate --token $STEP_TOKEN $1 /var/local/step/$1.crt /var/local/step/$1.key
}

downloadRootCertificate ca-127-0-0-1.nip.io
downloadRootCertificate docker-repository-127-0-0-1.nip.io
downloadRootCertificate jenkins-127-0-0-1.nip.io
downloadRootCertificate nexus-127-0-0-1.nip.io

exec "$@"
