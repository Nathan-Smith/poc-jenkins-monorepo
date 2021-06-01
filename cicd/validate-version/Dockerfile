FROM node:15.13.0-alpine3.13 as dev

RUN apk add --update \
        bash \
        findutils \
        git \
        make

FROM dev as test

WORKDIR /opt/app

COPY ["package.json", "package-lock.json", "/opt/app/"]

RUN npm install

COPY . /opt/app/

FROM test as validate-version

ENTRYPOINT [ "/opt/app/src/validate-version.sh" ]
