cd api-updated
docker compose up -d --build --force-recreate
docker exec -it fr-api-updated yarn prisma db push
docker exec -it fr-api-updated yarn prisma db seed

cd ../front
cp .env.local .env
yarn && yarn dev
