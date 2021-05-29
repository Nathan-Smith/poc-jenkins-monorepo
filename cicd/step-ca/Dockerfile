# Modified from: https://raw.githubusercontent.com/smallstep/certificates/d4e9812a98017c07dcdceac2cab5186771bed05e/examples/docker/ca/Dockerfile
FROM smallstep/step-ca:0.15.15

COPY pki /run

CMD ["step-ca", "/run/config/ca.json"]
