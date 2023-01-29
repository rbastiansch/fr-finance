FROM node:16-alpine3.17

RUN apk update \
  && apk add openssl1.1-compat

WORKDIR /usr/app

COPY package*.json ./
COPY .env.local .env

USER root

# Install the good ol' NPM modules and get Adonis CLI in the game
RUN yarn --no-optional

CMD yarn dev
