FROM groovy:latest

USER root

RUN apt-get update \
    && apt-get install --yes --no-install-recommends \
        make

USER groovy
