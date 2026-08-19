# Deploying the API to a VM

The simplest deployment is Docker Compose on the VM. The production image contains
Node.js, the compiled Adonis application, Prisma Client, and its runtime dependencies.
PostgreSQL runs alongside the API in the same Compose stack and persists data in a
named Docker volume.

## VM prerequisites

- Docker Engine
- Docker Compose plugin
- Firewall access for ports `80` and `443`
- At least 5 GB of free disk space for the application image and PostgreSQL volume

For SSH access to the VM, see [ACCESS.md](./ACCESS.md).

## Deploy

From the `api/deployment` directory on the VM:

```sh
cp .env.production.example .env.production
```

Edit `.env.production` and set at least `APP_KEY`, `APP_URL`,
`GRAPHQL_HOSTNAME`, `POSTGRES_PASSWORD`, and `CORS_ORIGIN`. Keep this file private
and do not commit it. Set `GRAPHQL_HOSTNAME` to the subdomain whose `A` record
points to the VM's reserved public IP, for example `graphql.example.com`.
The database URL is assembled automatically by Compose using the internal `fr-db`
service name. Do not use `localhost` or host port `5433` in the API connection string.

Create the DNS `A` record before starting Caddy:

```text
graphql.example.com -> <VM_RESERVED_PUBLIC_IP>
```

The reverse proxy exposes only GraphQL publicly over HTTPS. Caddy forwards requests
to the internal `fr-api:4000` service and obtains a certificate automatically after
DNS and OCI ingress are configured. Allow TCP ports `80` and `443` in the OCI
security list or network security group. Ports `3334` and `4000` do not need public
ingress rules.

Build the production image:

```sh
docker compose --env-file .env.production -f docker-compose.production.yml build
```

This repository does not currently contain Prisma migration files. If the database
schema needs to be initialized or synchronized, start both containers and run this
inside the existing `fr-api` container:

```sh
docker compose --env-file .env.production -f docker-compose.production.yml up -d fr-db
docker compose --env-file .env.production -f docker-compose.production.yml up -d fr-api

docker compose --env-file .env.production -f docker-compose.production.yml exec -T fr-api \
  node_modules/.bin/prisma db push --config prisma.config.js
```

The seed data is not loaded automatically during startup. To populate this demo
database, run the compiled seed script once after the schema is ready:

```sh
docker compose --env-file .env.production -f docker-compose.production.yml exec -T fr-api \
  node prisma/seed.js
```

The seed uses duplicate-safe inserts, so it can be rerun if a previous run was
interrupted. It loads the accounts, categories, and transactions included in the
repository.

Start or update the API:

```sh
docker compose --env-file .env.production -f docker-compose.production.yml up -d
```

The PostgreSQL data is stored in the `fr-db-production-data` Docker volume. Do not
use `docker compose down -v`, because removing the volume deletes the database.

For a production database with existing data, prefer adding Prisma migrations and
running `prisma migrate deploy` as part of the release process instead of using
`db push`. Inspect the startup output with:

```sh
docker compose --env-file .env.production -f docker-compose.production.yml logs -f fr-api
```

The HTTP API remains available only inside the Compose network on port `3334`.
GraphQL is available publicly through Caddy at `https://graphql.example.com`.

Update the frontend's public Apollo endpoint to the deployed GraphQL URL, for example
`https://graphql.example.com`:

```sh
NUXT_PUBLIC_APOLLO_API_HOST=https://graphql.example.com yarn generate
```

Inspect the reverse proxy output with:

```sh
docker compose --env-file .env.production -f docker-compose.production.yml logs -f caddy
```
