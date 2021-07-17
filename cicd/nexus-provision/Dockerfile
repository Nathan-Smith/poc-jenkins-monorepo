FROM alpine:3.13.5

RUN apk add --no-cache \
    bash=5.1.0-r0	\
    curl=7.77.0-r1	\
    make=4.3-r0	\
    sed=4.8-r0 &&\
  rm -rf /var/cache/apk/*

WORKDIR /opt/app

COPY src/ .

ENTRYPOINT [ "/bin/bash", "-c", "./provision.sh" ]
