cd api-updated
docker compose up -d --build
docker exec -it fr-api-updated npx prisma db push
docker exec -it fr-api-updated npx prisma db seed

cd ../front
cp .env.local .env
yarn && yarn dev
