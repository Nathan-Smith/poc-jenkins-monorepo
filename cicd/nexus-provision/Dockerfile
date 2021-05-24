FROM alpine:3.13.5

RUN apk add --no-cache \
  bash \
  curl \
  make \
  sed

COPY src/ .

ENTRYPOINT [ "/bin/bash", "-c", "./provision.sh" ]
