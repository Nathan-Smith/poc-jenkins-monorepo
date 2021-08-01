FROM node:15.13.0-alpine3.13 as dev

RUN apk add --no-cache \
    bash=5.1.0-r0	\
    curl=7.77.0-r1	\
    git=2.30.2-r0	\
    libc6-compat=1.2.2-r1 \
    make=4.3-r0	\
    rsync=3.2.3-r1 &&\
  rm -rf /var/cache/apk/* &&\
  npm i -g npm@7.20.0

USER node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

FROM dev as test

WORKDIR /opt/app

COPY package.json package-lock.json /opt/app/

RUN npm ci

FROM test as builder

WORKDIR /opt/app

COPY . .

RUN npm run build

FROM node:15.13.0-alpine3.13 as calculator-app

WORKDIR /opt/app

ENV NODE_ENV production

RUN npm i -g npm@7.20.0 &&\
  addgroup -g 1001 -S nodejs &&\
  adduser -S nextjs -u 1001

COPY --from=builder /opt/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /opt/app/.next ./.next
COPY --from=builder /opt/app/node_modules ./node_modules
COPY --from=builder /opt/app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]
