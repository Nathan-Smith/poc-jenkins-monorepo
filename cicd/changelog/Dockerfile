FROM node:15.13.0-alpine3.13 as dev

RUN apk add --update \
        bash\
        curl \
        git \
        make \
        rsync

FROM dev as test

WORKDIR /opt/app

COPY ["package.json", "package-lock.json", "/opt/app/"]

RUN npm install

FROM test as build

COPY . /opt/app/

RUN npm run build &&\
  npm i -g

FROM build as changelog

ENTRYPOINT [ "changelog" ]
