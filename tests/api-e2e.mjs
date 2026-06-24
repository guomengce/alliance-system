import { spawn, spawnSync } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { createServer } from 'node:net';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const backendDir = join(rootDir, 'backend-go');
const goBin = join(rootDir, '.tools', 'go', 'bin');

const checks = [];

function check(name, condition, details = '') {
  if (!condition) {
    throw new Error(`${name}${details ? `: ${details}` : ''}`);
  }
  checks.push(name);
}

async function freePort() {
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      server.close(() => resolvePort(address.port));
    });
  });
}

async function request(baseURL, path, { method = 'GET', token, body } = {}) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  const response = await fetch(`${baseURL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await response.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
  }
  return { response, data };
}

async function waitForHealth(baseURL) {
  const deadline = Date.now() + 15_000;
  let lastError;
  while (Date.now() < deadline) {
    try {
      const { response, data } = await request(baseURL, '/api/health');
      if (response.ok && data.status === 'ok') return;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  }
  throw new Error(`server did not become healthy${lastError ? `: ${lastError.message}` : ''}`);
}

async function main() {
  const port = await freePort();
  const tempDir = await mkdtemp('/tmp/alliance-api-e2e-');
  const sqlitePath = join(tempDir, 'e2e.sqlite');
  const baseURL = `http://127.0.0.1:${port}`;
  const env = {
    ...process.env,
    PATH: `${goBin}:${process.env.PATH || ''}`,
    GOCACHE: join(rootDir, '.cache', 'go-build'),
    GOMODCACHE: join(rootDir, '.cache', 'go-mod'),
    ALLIANCE_SQLITE_PATH: sqlitePath,
    ALLIANCE_JSON_SEED_PATH: join(rootDir, 'db.json'),
    ALLIANCE_PUBLIC_DIR: join(rootDir, 'dist', 'public'),
    PORT: String(port),
  };

  const migration = spawnSync('go', ['run', './cmd/migrate-json'], {
    cwd: backendDir,
    env,
    encoding: 'utf8',
  });
  if (migration.status !== 0) {
    throw new Error(`migration failed: ${migration.stderr || migration.stdout}`);
  }

  const server = spawn('go', ['run', './cmd/server'], {
    cwd: backendDir,
    env,
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let stderr = '';
  server.stderr.on('data', (chunk) => {
    stderr += chunk.toString();
  });

  try {
    await waitForHealth(baseURL);

    const clientEmail = `client-${Date.now()}@example.com`;
    const targetEmail = `target-${Date.now()}@example.com`;
    const operatorEmail = `operator-${Date.now()}@alliance.system`;

    const clientRegister = await request(baseURL, '/api/auth/register', {
      method: 'POST',
      body: { email: clientEmail, nickname: 'Client E2E', password: 'secret123' },
    });
    check('client register succeeds', clientRegister.response.ok, await responseDetails(clientRegister));
    const clientToken = clientRegister.data.token;
    check('client token returned', Boolean(clientToken));
    check('client password omitted', !clientRegister.data.user.password);

    const targetRegister = await request(baseURL, '/api/auth/register', {
      method: 'POST',
      body: { email: targetEmail, nickname: 'Target E2E', password: 'secret123' },
    });
    check('target register succeeds', targetRegister.response.ok, await responseDetails(targetRegister));
    const targetToken = targetRegister.data.token;

    const operatorRegister = await request(baseURL, '/api/auth/register', {
      method: 'POST',
      body: { email: operatorEmail, nickname: 'Operator E2E', password: 'secret123' },
    });
    check('operator register succeeds', operatorRegister.response.ok, await responseDetails(operatorRegister));
    const operatorToken = operatorRegister.data.token;
    check('operator portal returned', operatorRegister.data.user.portalMode === 'admin');

    const seededAdminLogin = await request(baseURL, '/api/auth/login', {
      method: 'POST',
      body: { email: 'admin_center@alliance.com', password: 'admin1234' },
    });
    check('seeded super admin login succeeds', seededAdminLogin.response.ok, await responseDetails(seededAdminLogin));
    const adminToken = seededAdminLogin.data.token;
    check('seeded super admin role returned', seededAdminLogin.data.user.role === 'SUPER_ADMIN');

    const me = await request(baseURL, '/api/auth/me', { token: clientToken });
    check('auth me succeeds', me.response.ok, await responseDetails(me));
    check('auth me returns current user', me.data.user.email === clientEmail);

    const catalogPlans = await request(baseURL, '/api/catalog/plans', { token: clientToken });
    check('catalog plans readable by client', catalogPlans.response.ok, await responseDetails(catalogPlans));

    const adminState = await request(baseURL, '/api/wallet/user-state', { token: adminToken });
    check('admin user-state succeeds', adminState.response.ok, await responseDetails(adminState));
    const targetDownline = adminState.data.downlines.find((item) => item.email === targetEmail);
    check('target downline available to admin', Boolean(targetDownline));
    check('target downline password omitted', !targetDownline.password);

    const subscribe = await request(baseURL, '/api/wallet/subscribe', {
      method: 'POST',
      token: clientToken,
      body: { amount: 100, planName: 'E2E Starter', planPrice: 100, poolLimit: 500, trooRatio: 7, queueRatio: 0.31 },
    });
    check('client subscribe succeeds', subscribe.response.ok, await responseDetails(subscribe));

    const transfer = await request(baseURL, '/api/wallet/transfer', {
      method: 'POST',
      token: clientToken,
      body: { amount: 25, targetUid: targetDownline.uid },
    });
    check('client transfer succeeds', transfer.response.ok, await responseDetails(transfer));

    const clientState = await request(baseURL, '/api/wallet/user-state', { token: clientToken });
    check('client state after subscribe and transfer succeeds', clientState.response.ok, await responseDetails(clientState));
    check('client balance updated', clientState.data.user.usdtBalance === 9875, `got ${clientState.data.user.usdtBalance}`);
    check('client transfer transaction created', clientState.data.transactions.some((txn) => txn.type === 'transfer' && txn.amount === -25));

    const targetState = await request(baseURL, '/api/wallet/user-state', { token: targetToken });
    check('target state succeeds', targetState.response.ok, await responseDetails(targetState));
    check('target transfer credited', targetState.data.user.usdtBalance === 10025, `got ${targetState.data.user.usdtBalance}`);

    const markRead = await request(baseURL, '/api/notifications/mark-read', {
      method: 'POST',
      token: clientToken,
      body: { markAll: true },
    });
    check('client notification mark-read succeeds', markRead.response.ok, await responseDetails(markRead));

    const settlement = await request(baseURL, '/api/admin/settlements/run', {
      method: 'POST',
      token: adminToken,
      body: { amount: 1500 },
    });
    check('admin manual settlement succeeds', settlement.response.ok, await responseDetails(settlement));
    check('admin settlement balance updated', settlement.data.user.usdtBalance === seededAdminLogin.data.user.usdtBalance + 1500, `got ${settlement.data.user.usdtBalance}`);

    const forbidden = await request(baseURL, '/api/admin/settlements/run', {
      method: 'POST',
      token: operatorToken,
      body: { amount: 1500 },
    });
    check('operator cannot run finance settlement', forbidden.response.status === 403, `got ${forbidden.response.status}`);

    console.log(`API E2E passed (${checks.length} checks)`);
  } finally {
    await stopServer(server);
    await rm(tempDir, { recursive: true, force: true });
    if (server.exitCode && server.exitCode !== 0 && server.exitCode !== 1) {
      console.error(stderr);
    }
  }
}

async function responseDetails(result) {
  return `status ${result.response.status}, body ${JSON.stringify(result.data)}`;
}

async function stopServer(server) {
  if (server.exitCode !== null || server.signalCode !== null) {
    return;
  }
  killProcessGroup(server, 'SIGTERM');
  await new Promise((resolveDone) => {
    const timeout = setTimeout(() => {
      if (server.exitCode === null && server.signalCode === null) {
        killProcessGroup(server, 'SIGKILL');
      }
      resolveDone();
    }, 1000);
    server.once('exit', () => {
      clearTimeout(timeout);
      resolveDone();
    });
  });
}

function killProcessGroup(server, signal) {
  try {
    process.kill(-server.pid, signal);
  } catch {
    try {
      server.kill(signal);
    } catch {
      // Process already exited.
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
