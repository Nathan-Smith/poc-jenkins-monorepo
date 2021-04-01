FROM node:15.13.0-alpine3.13

RUN apk add --update \
        git \
        make
