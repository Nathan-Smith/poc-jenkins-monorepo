#!/bin/sh

# Wait for CA
sleep 5

# Install CA Root Certificate, for pipelines to connect to Nexus via HTTPS
step ca bootstrap --ca-url $STEP_CA_URL --install --fingerprint $STEP_FINGERPRINT

# Start Jenkins
/sbin/tini -- /usr/local/bin/jenkins.sh
