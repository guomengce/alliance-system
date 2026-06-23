# Alliance Go Backend

This directory contains the Go + Gin implementation of the Alliance API.

The goal is API compatibility with the React frontend so it can keep calling the same `/api/...` routes.

Runtime storage is relational SQLite tables. `db.json` is only used by the one-time migration command.

## Architecture

The backend follows the agreed layered business structure:

```text
internal/
  interfaces/http/                  # Gin router, middleware, request/response mapping
  application/admin/                # Admin review, notification, parameter, plan, and broadcast workflows
  application/auth/                 # Authentication and profile use cases
  application/presenters/           # Response-safe view mapping and data sanitization
  application/support/              # Shared application formatting and ID helpers
  application/wallet/               # Wallet, commission, withdrawal, and balance use cases
  application/ports/                # Store and outbound dependency ports
  business/domain/                  # Core business data structures
  infrastructure/config/            # Environment configuration
  infrastructure/security/          # Password hashing and token signing
  infrastructure/persistence/sqlite/# SQLite implementation of persistence ports
```

Handlers should stay thin. Business workflows belong in `application/*`, core entities in `business/domain`, and third-party or storage integrations in `infrastructure/*` behind ports.

## Requirements

- Go 1.24 or newer
- Network access for the first `go mod download`

## Run

First migrate the existing seed data into SQLite:

```bash
cd backend-go
ALLIANCE_JSON_SEED_PATH=../db.json ALLIANCE_SQLITE_PATH=../alliance.sqlite go run ./cmd/migrate-json
```

Then run the server:

```bash
ALLIANCE_SQLITE_PATH=../alliance.sqlite PORT=3001 go run ./cmd/server
```

Or from the repository root:

```bash
npm run db:migrate
npm run api:dev
```

`npm run db:migrate` rebuilds the runtime SQLite tables from `db.json`. The server does not read or write `db.json` while serving requests.

The Go server listens on `PORT` and exposes API routes under `/api`. It does not read or write `db.json` while serving requests.

## Verify

```bash
cd backend-go
go test ./...
```

This workspace also supports the project-local Go toolchain at `../.tools/go` through the root npm scripts.
