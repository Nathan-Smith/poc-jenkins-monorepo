FROM node:15.13.0-alpine3.13 as dev

RUN apk add --no-cache \
    bash=5.1.0-r0	\
    curl=7.77.0-r1	\
    git=2.30.2-r0	\
    make=4.3-r0	\
    rsync=3.2.3-r1 &&\
  rm -rf /var/cache/apk/* &&\
  npm i -g npm@7.20.0

USER node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
