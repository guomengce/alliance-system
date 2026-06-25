import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('admin dashboard Ant Design wiring', () => {
  it('renders through Antd dashboard component replacements', () => {
    const source = readFileSync(resolve(__dirname, 'index.tsx'), 'utf8');

    expect(source).toContain("import AntdMetricGrid from './components/AntdMetricGrid'");
    expect(source).toContain("import AntdStatusHeader from './components/AntdStatusHeader'");
    expect(source).toContain("import AntdTrendPanel from './components/AntdTrendPanel'");
    expect(source).toContain("import AntdTrooPricePanel from './components/AntdTrooPricePanel'");
  });
});
