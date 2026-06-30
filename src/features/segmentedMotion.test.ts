import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');

const segmentedMotionTargets = [
  {
    path: 'src/features/admin/shared/antd-overrides.css',
    className: 'alliance-antd-admin-segmented-tabs',
  },
  {
    path: 'src/features/client/queue/queue-overrides.css',
    className: 'alliance-antd-queue-filter',
  },
  {
    path: 'src/features/shared/antd/queue-overrides.css',
    className: 'alliance-antd-queue-filter',
  },
  {
    path: 'src/features/client/commission/commission-overrides.css',
    className: 'alliance-antd-commission-filter',
  },
  {
    path: 'src/features/shared/antd/commission-overrides.css',
    className: 'alliance-antd-commission-filter',
  },
  {
    path: 'src/features/client/notifications/antd-overrides.css',
    className: 'alliance-antd-notification-tabs',
  },
  {
    path: 'src/features/client/team/antd-overrides.css',
    className: 'alliance-antd-team-segmented',
  },
  {
    path: 'src/features/client/team/antd-overrides.css',
    className: 'alliance-antd-team-view-segmented',
  },
];

describe('segmented tab/filter motion', () => {
  it.each(segmentedMotionTargets)('$className follows wallet transaction segmented thumb motion', ({ path, className }) => {
    const source = readSource(path);

    expect(source).toContain(`.${className}.ant-segmented .ant-segmented-item:hover`);
    expect(source).toContain(`.${className}.ant-segmented .ant-segmented-thumb`);
  });
});
