FROM adoptopenjdk/openjdk8:jdk8u292-b10-alpine

RUN apk add \
  --update \
  --no-cache \
    bash \
    curl

COPY . /opt/app
WORKDIR /opt/app

ENTRYPOINT [ "/bin/bash", "-c", "/opt/app/test.sh" ]
