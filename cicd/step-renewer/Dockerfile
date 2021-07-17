# Modified from: https://raw.githubusercontent.com/smallstep/certificates/30b30d764338b4413c208f9ca4e1aeb63a48bac8/examples/docker/renewer/Dockerfile
FROM smallstep/step-ca:0.15.15

# hadolint ignore=DL3002
USER root

COPY crontab /var/spool/cron/crontabs/root
RUN chmod 0644 /var/spool/cron/crontabs/root

COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/usr/sbin/crond", "-l", "2", "-f"]
