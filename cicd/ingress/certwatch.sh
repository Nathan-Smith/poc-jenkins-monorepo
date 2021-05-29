#!/bin/sh
# Modified from: https://raw.githubusercontent.com/smallstep/certificates/30b30d764338b4413c208f9ca4e1aeb63a48bac8/examples/docker/nginx/certwatch.sh

while true; do
    inotifywait -e modify /etc/nginx/certs/nexus-127-0-0-1.nip.io.crt
    nginx -s reload
done
