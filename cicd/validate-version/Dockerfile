FROM node:15.13.0-alpine3.13 as dev

RUN apk add --no-cache \
    bash=5.1.0-r0	\
    findutils=4.8.0-r0 \
    git=2.30.2-r0	\
    make=4.3-r0 &&\
  rm -rf /var/cache/apk/* &&\
  npm i -g npm@7.20.0

FROM dev as test

WORKDIR /opt/app

COPY ["package.json", "package-lock.json", "/opt/app/"]

RUN npm install

COPY . /opt/app/

FROM test as validate-version

ENTRYPOINT [ "/opt/app/src/validate-version.sh" ]
