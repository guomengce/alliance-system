import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from './index';
import type { ApiEnvelope, ApiListResponse } from '../api/types';
import type { NotificationItem } from '../types';

const createStorage = (): Storage => {
  const store = new Map<string, string>();

  return {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (key) => store.get(key) ?? null,
    key: (index) => Array.from(store.keys())[index] ?? null,
    removeItem: (key) => store.delete(key),
    setItem: (key, value) => store.set(key, value)
  };
};

describe('request wrapper', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal('localStorage', createStorage());
    vi.stubGlobal('sessionStorage', createStorage());
    vi.stubGlobal('location', { href: '/', origin: 'http://localhost' });
  });

  it('handles notification mock responses through the request layer', async () => {
    const response = await request.get<ApiEnvelope<ApiListResponse<NotificationItem>>>(
      '/client/notifications',
      { category: 'commission' }
    );

    expect(response).toEqual(expect.objectContaining({
      data: expect.objectContaining({
        items: expect.any(Array)
      }),
      success: true
    }));
    expect(response.data.items.every((item) => item.category === 'commission')).toBe(true);
  });

  it('sends normal json requests with common headers', async () => {
    localStorage.setItem('locale', 'en');
    sessionStorage.setItem('token', 'token-1');
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    }));
    vi.stubGlobal('fetch', fetchMock);

    const response = await request.post('/client/example', { name: 'Ada' });

    expect(response).toEqual({ ok: true });
    const init = fetchMock.mock.calls[0][1];
    const headers = init.headers as Headers;
    expect(fetchMock.mock.calls[0][0]).toBe('/client/example');
    expect(init.body).toBe(JSON.stringify({ name: 'Ada' }));
    expect(headers.get('lang')).toBe('en');
    expect(headers.get('Authorization')).toBe('Bearer token-1');
    expect(headers.get('Content-Type')).toBe('application/json');
  });
});
