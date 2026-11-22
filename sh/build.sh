set -e

cd api
docker compose up -d --build --force-recreate --renew-anon-volumes
docker compose exec -T fr-api yarn prisma db push
docker compose exec -T fr-api yarn prisma db seed

cd ../front
if [ -f .env.local ]; then
    cp .env.local .env
elif [ ! -f .env ]; then
    cp .env.example .env
fi

yarn --frozen-lockfile
yarn dev
