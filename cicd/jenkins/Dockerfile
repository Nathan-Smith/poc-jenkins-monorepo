FROM jenkins/jenkins:2.277.3-lts-alpine

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli -f /usr/share/jenkins/ref/plugins.txt --latest false
RUN echo 2.0 > /usr/share/jenkins/ref/jenkins.install.UpgradeWizard.state

COPY jenkins.yaml /usr/share/jenkins/ref/jenkins.yaml
ENV CASC_JENKINS_CONFIG=/usr/share/jenkins/ref/jenkins.yaml

USER root

RUN apk add \
    -X http://dl-cdn.alpinelinux.org/alpine/edge/testing \
    --update \
      make \
      step-cli

USER jenkins

COPY entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
