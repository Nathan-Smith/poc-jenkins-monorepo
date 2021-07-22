FROM adoptopenjdk:11.0.11_9-jdk-hotspot as dev

WORKDIR /opt/app

COPY gradlew ./gradlew
COPY gradle ./gradle

RUN ./gradlew --version

FROM dev as test

COPY *.gradle.kts ./

RUN ./gradlew build
