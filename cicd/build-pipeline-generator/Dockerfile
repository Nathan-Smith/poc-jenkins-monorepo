FROM node:15.13.0-alpine3.13 as dev

RUN apk add --update \
        bash \
        git \
        make

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
