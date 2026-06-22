import { describe, expect, it } from 'vitest';
import { validateBroadcastForm } from './utils';

describe('admin broadcast utils', () => {
  it('validates broadcast title and body', () => {
    expect(validateBroadcastForm('', 'body')).toBe('标题和内容不能为空');
    expect(validateBroadcastForm('title', '')).toBe('标题和内容不能为空');
    expect(validateBroadcastForm('title', 'body')).toBeNull();
  });
});
