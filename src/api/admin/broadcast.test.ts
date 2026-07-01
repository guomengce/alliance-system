import { describe, expect, it } from 'vitest';
import { adminBroadcastApi } from './broadcast';

describe('admin broadcast api', () => {
  it('returns the broadcast draft as one object', async () => {
    await expect(adminBroadcastApi.getDraft()).resolves.toMatchObject({
      target: 'all',
      category: 'official_notice',
    });
  });

  it('updates the template through the simulated api store', async () => {
    await expect(adminBroadcastApi.updateTemplate({ content: 'New template' })).resolves.toMatchObject({
      content: 'New template',
    });

    await expect(adminBroadcastApi.getTemplate()).resolves.toMatchObject({
      content: 'New template',
    });
  });
});
