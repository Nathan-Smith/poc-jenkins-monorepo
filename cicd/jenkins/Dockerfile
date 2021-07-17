FROM jenkins/jenkins:2.289.2-lts-alpine

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli -f /usr/share/jenkins/ref/plugins.txt --latest false &&\
  echo 2.0 > /usr/share/jenkins/ref/jenkins.install.UpgradeWizard.state

COPY jenkins.yaml /usr/share/jenkins/ref/jenkins.yaml
ENV CASC_JENKINS_CONFIG=/usr/share/jenkins/ref/jenkins.yaml

USER root

RUN apk add \
    -X http://dl-cdn.alpinelinux.org/alpine/edge/community \
    --no-cache \
    make=4.3-r0 \
    step-cli=0.16.0-r0 &&\
  rm -rf /var/cache/apk/*

USER jenkins

COPY entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
