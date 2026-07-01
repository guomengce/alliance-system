import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');

describe('admin segmented tab controls', () => {
  it.each([
    'src/features/admin/users/detail/components/TabSelector.tsx',
    'src/features/admin/finance/components/AntdHeaderTabs.tsx',
    'src/features/admin/commissions/components/AntdList.tsx',
    'src/features/admin/logs/components/AntdFiltersPanel.tsx',
  ])('%s uses Ant Design Segmented with the shared admin style', (path) => {
    const source = readSource(path);

    expect(source).toContain('Segmented');
    expect(source).toContain('alliance-antd-admin-segmented-tabs');
  });

  it('keeps the shared admin segmented style aligned with the client queue filter', () => {
    const source = readSource('src/features/admin/shared/antd-overrides.css');

    expect(source).toContain('.alliance-antd-admin-segmented-tabs.ant-segmented');
    expect(source).toContain('background: #100d14;');
    expect(source).toContain('border-radius: 12px;');
    expect(source).toContain('min-height: 28px;');
    expect(source).toContain('background: var(--color-primary-light) !important;');
    expect(source).toContain('color: #210c44 !important;');
    expect(source).not.toContain('.alliance-antd-admin-segmented-tabs.ant-segmented .ant-segmented-group');
    expect(source).not.toContain('.alliance-antd-admin-segmented-tabs.ant-segmented .ant-segmented-item-label');
  });

  it('keeps 20px below the admin user detail segmented tabs', () => {
    const tabSelector = readSource('src/features/admin/users/detail/components/TabSelector.tsx');
    const userStyles = readSource('src/features/admin/users/antd-overrides.css');

    expect(tabSelector).toContain('alliance-antd-admin-user-detail-segmented');
    expect(userStyles).toContain('.alliance-antd-admin-user-detail-segmented.ant-segmented');
    expect(userStyles).toContain('margin-bottom: 20px;');
  });

  it('keeps 20px below the admin finance segmented tabs', () => {
    const headerTabs = readSource('src/features/admin/finance/components/AntdHeaderTabs.tsx');
    const financeStyles = readSource('src/features/admin/finance/antd-overrides.css');

    expect(headerTabs).toContain('alliance-antd-admin-finance-segmented');
    expect(financeStyles).toContain('.alliance-antd-admin-finance-segmented.ant-segmented');
    expect(financeStyles).toContain('margin-bottom: 20px;');
  });

  it('keeps admin commission search and segmented tabs on one desktop row', () => {
    const source = readSource('src/features/admin/commissions/components/AntdList.tsx');

    expect(source).toContain('alliance-antd-admin-commission-toolbar');
    expect(source).toContain('lg:flex-row');
    expect(source).toContain('lg:justify-between');
    expect(source).toContain('lg:max-w-[520px]');
  });
});
