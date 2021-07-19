FROM node:15.13.0-alpine3.13 as dev

RUN apk add --no-cache \
    bash=5.1.0-r0	\
    git=2.30.2-r0	\
    make=4.3-r0	&&\
  rm -rf /var/cache/apk/* &&\
  npm i -g npm@7.20.0

FROM dev as build

WORKDIR /opt/app

COPY ["package.json", "package-lock.json", "/opt/app/"]

RUN npm install

COPY . /opt/app/

RUN npm run build &&\
  npm i -g

FROM build as test

FROM build as build-pipeline-generator

ENTRYPOINT [ "build-pipeline-generator" ]
