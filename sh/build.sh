cd api
cp .env.local .env
docker-compose up -d
docker exec -it fr-api npx prisma db push
docker exec -it fr-api npx prisma db seed

cd ../front
cp .env.local .env
yarn && yarn dev
