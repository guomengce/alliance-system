import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const backendDir = path.join(rootDir, 'backend-go');
const localGoBin = path.join(rootDir, '.tools', 'go', 'bin');
const commonGoBins = [
  'C:\\Program Files\\Go\\bin',
  'C:\\Go\\bin',
];

const commands = {
  'api:dev': ['run', './cmd/server'],
  'db:migrate': ['run', './cmd/migrate-json'],
  'go:test': ['test', './...'],
};

const commandName = process.argv[2];
const goArgs = commands[commandName];

if (!goArgs) {
  console.error(`Unknown Go command: ${commandName || '(empty)'}`);
  console.error(`Available commands: ${Object.keys(commands).join(', ')}`);
  process.exit(1);
}

const pathParts = [];
if (existsSync(localGoBin)) {
  pathParts.push(localGoBin);
}
commonGoBins.forEach((binPath) => {
  if (existsSync(binPath)) {
    pathParts.push(binPath);
  }
});
pathParts.push(process.env.PATH || '');

const env = {
  ...process.env,
  PATH: pathParts.join(path.delimiter),
  GOCACHE: process.env.GOCACHE || path.join(rootDir, '.cache', 'go-build'),
  GOMODCACHE: process.env.GOMODCACHE || path.join(rootDir, '.cache', 'go-mod'),
  ALLIANCE_SQLITE_PATH: process.env.ALLIANCE_SQLITE_PATH || path.join(rootDir, 'alliance.sqlite'),
  ALLIANCE_JSON_SEED_PATH: process.env.ALLIANCE_JSON_SEED_PATH || path.join(rootDir, 'db.json'),
  ALLIANCE_PUBLIC_DIR: process.env.ALLIANCE_PUBLIC_DIR || path.join(rootDir, 'dist', 'public'),
  PORT: process.env.PORT || '3001',
};

const child = spawn('go', goArgs, {
  cwd: backendDir,
  env,
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) {
    console.error(`Go command stopped by signal ${signal}`);
    process.exit(1);
  }
  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error('Failed to start Go command.');
  console.error('Install Go 1.24+ or provide a local toolchain at .tools/go/bin.');
  console.error(error.message);
  process.exit(1);
});
