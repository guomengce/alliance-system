import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiClient } from './request';

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

describe('api request compatibility adapter', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal('localStorage', createStorage());
    vi.stubGlobal('sessionStorage', createStorage());
    vi.stubGlobal('location', { href: '/', origin: 'http://localhost' });
  });

  it('uses the shared request wrapper so apiClient calls include stored token', async () => {
    sessionStorage.setItem('token', 'token-from-storage');
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ data: { ok: true } }), {
      headers: { 'Content-Type': 'application/json' }
    }));
    vi.stubGlobal('fetch', fetchMock);

    const response = await apiClient.get<{ data: { ok: boolean } }>('/client/example', {
      query: { page: 1 }
    });

    expect(response.data.ok).toBe(true);
    expect(fetchMock.mock.calls[0][0]).toBe('/client/example?page=1');

    const headers = fetchMock.mock.calls[0][1].headers as Headers;
    expect(headers.get('Authorization')).toBe('Bearer token-from-storage');
  });
});
