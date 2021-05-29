# Modified from: https://raw.githubusercontent.com/smallstep/certificates/d4e9812a98017c07dcdceac2cab5186771bed05e/examples/docker/nginx/Dockerfile
FROM jwilder/nginx-proxy:0.9.0-alpine

RUN apk add inotify-tools
COPY certwatch.sh /
COPY entrypoint.sh /

RUN { \
      echo 'client_max_body_size 2g;'; \
    } > /etc/nginx/conf.d/my_proxy.conf

ENTRYPOINT ["/entrypoint.sh"]
CMD ["forego", "start", "-r"]
