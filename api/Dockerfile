FROM node:24-alpine

RUN apk add --no-cache openssl python3 make g++

WORKDIR /usr/app

COPY package.json yarn.lock ./
COPY prisma.config.ts ./
COPY prisma ./prisma

# RUN corepack enable && yarn install --frozen-lockfile

COPY . .

RUN HUSKY=0 yarn --no-optional

EXPOSE 3334 4000 9229

CMD ["sh", "-c", "yarn prisma generate && yarn dev"]
