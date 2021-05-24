FROM node:15.13.0-alpine3.13

RUN apk add \
  --update \
  --no-cache \
    bash

COPY . /opt/app
WORKDIR /opt/app

ENTRYPOINT [ "/bin/bash", "-c", "/opt/app/test.sh" ]
