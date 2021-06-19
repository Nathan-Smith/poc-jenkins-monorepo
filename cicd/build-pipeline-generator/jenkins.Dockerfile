FROM docker-repository-127-0-0-1.nip.io/jenkins:0.2.0-dev.1

COPY src/jenkins.yaml /usr/share/jenkins/ref/jenkins.yaml
ENV CASC_JENKINS_CONFIG=/usr/share/jenkins/ref/jenkins.yaml
