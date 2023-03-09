To automatically run the project follow the instructions on terminal
`docker-compose up -d`
`docker exec -it fr-api npx prisma db push`
`docker exec -it fr-api npx prisma db seed`

To debug you'll have to attach to remote path `/usr/app`

# VS Code debug config

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Docker: Attach to Node",
      "remoteRoot": "/usr/app"
    }
  ]
}
```
