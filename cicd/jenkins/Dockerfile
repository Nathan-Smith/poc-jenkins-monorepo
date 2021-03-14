FROM maven:3.6.3-jdk-8-slim as plugin

COPY jgrapht-plugin/pom.xml ./pom.xml
RUN mvn dependency:go-offline -B

RUN mkdir -p ./target/classes
RUN mvn hpi:hpi

FROM jenkins/jenkins:lts-alpine

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli -f /usr/share/jenkins/ref/plugins.txt
COPY --from=plugin ./target/jgrapht-plugin.hpi /usr/share/jenkins/ref/plugins/jgrapht-plugin.hpi
RUN echo 2.0 > /usr/share/jenkins/ref/jenkins.install.UpgradeWizard.state

COPY jenkins.yaml /usr/share/jenkins/ref/jenkins.yaml
ENV CASC_JENKINS_CONFIG=/usr/share/jenkins/ref/jenkins.yaml

USER root

RUN apk add --update make

USER jenkins