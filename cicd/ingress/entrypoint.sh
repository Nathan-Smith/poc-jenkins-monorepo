#!/bin/sh
# Modified from: https://raw.githubusercontent.com/smallstep/certificates/30b30d764338b4413c208f9ca4e1aeb63a48bac8/examples/docker/nginx/entrypoint.sh

# Wait for renewer
sleep 10

# watch for the update of the cert and reload nginx
/certwatch.sh &

# Run docker CMD
exec "$@"
