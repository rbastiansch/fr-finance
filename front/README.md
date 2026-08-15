# Fr Finance frontend

Nuxt 4 SPA migrated from the legacy frontend in `front-old/`. The app uses Tailwind CSS 4, Apollo GraphQL, Vitest, and Storybook.

## Setup

Make sure to install dependencies:

```bash
# yarn
yarn install
```

Copy `.env.example` to `.env.local` and set the Apollo API endpoint before starting the app.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# yarn
yarn build
```

## Checks

```bash
yarn typecheck
yarn testrun
yarn coverage
yarn build-storybook
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
