# Alliance System

Alliance System is a React + TypeScript management console with separate client and admin portals. The current refactor keeps the approved UI intact while moving the codebase toward a maintainable enterprise-style frontend architecture.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- React Router

## Scripts

Install dependencies:

```bash
pnpm install
```

Start local development:

```bash
pnpm dev
```

Run type checks:

```bash
pnpm lint
```

Build production assets:

```bash
pnpm build
```

## Structure

- `src/features/admin`: admin portal business modules
- `src/features/client`: client portal business modules
- `src/layouts`: portal and shell layouts
- `src/router`: route configuration and guards
- `src/api`: request client and backend API adapters
- `src/shared`: shared components, hooks, utilities, constants, and types
