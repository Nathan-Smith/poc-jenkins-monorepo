FROM node:15.13.0-alpine3.13

RUN apk add --no-cache \
    bash=5.1.0-r0 &&\
  rm -rf /var/cache/apk/* &&\
  npm i -g npm@7.20.0

COPY . /opt/app
WORKDIR /opt/app

ENTRYPOINT [ "/bin/bash", "-c", "/opt/app/test.sh" ]
