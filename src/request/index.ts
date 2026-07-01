import { handleMockRequest } from '../mock/api';

type ImportMetaWithEnv = ImportMeta & {
  env?: {
    VITE_SERVICE_BASE_URL?: string;
    VITE_API_BASE_URL?: string;
  };
};

export type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue | QueryValue[]>;
type RequestConfig = Omit<RequestInit, 'body' | 'method'>;

const env = (import.meta as ImportMetaWithEnv).env;
const baseURL = env?.VITE_SERVICE_BASE_URL ?? env?.VITE_API_BASE_URL ?? '';
const timeout = 15000;
const authExpiredStatus = [401, 402, 403, 50013, 50014, 50015];

export class HttpRequestError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data: unknown = null) {
    super(message);
    this.name = 'HttpRequestError';
    this.status = status;
    this.data = data;
  }
}

const isAbsoluteUrl = (url: string) => /^https?:\/\//i.test(url);

const getStorage = (storage: Storage | undefined, key: string) => {
  try {
    return storage?.getItem(key) ?? '';
  } catch {
    return '';
  }
};

const removeStorage = (storage: Storage | undefined, key: string) => {
  try {
    storage?.removeItem(key);
  } catch {
    // Storage can be unavailable in restricted browser contexts.
  }
};

const getToken = () => (
  getStorage(globalThis.sessionStorage, 'token') ||
  getStorage(globalThis.sessionStorage, 'Authorization') ||
  getStorage(globalThis.localStorage, 'token') ||
  getStorage(globalThis.localStorage, 'Authorization')
);

const getLang = () => getStorage(globalThis.localStorage, 'locale') || 'hk';

const clearToken = () => {
  ['token', 'Authorization'].forEach((key) => {
    removeStorage(globalThis.sessionStorage, key);
    removeStorage(globalThis.localStorage, key);
  });
};

const redirectToLogin = () => {
  clearToken();
  if (typeof location !== 'undefined') {
    location.href = '/login';
  }
};

const appendParams = (target: URL, params?: QueryParams) => {
  if (!params) return;

  Object.entries(params).forEach(([key, value]) => {
    const values = Array.isArray(value) ? value : [value];
    values.forEach((item) => {
      if (item === null || item === undefined) return;
      target.searchParams.append(key, String(item));
    });
  });
};

const createUrl = (url: string, params?: QueryParams) => {
  const origin = typeof location === 'undefined' || !location.origin ? 'http://localhost' : location.origin;
  const normalizedBase = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
  const normalizedUrl = url.startsWith('/') ? url.slice(1) : url;
  const target = isAbsoluteUrl(url)
    ? url
    : normalizedBase
      ? `${normalizedBase}/${normalizedUrl}`
      : url;
  const parsedUrl = new URL(target, isAbsoluteUrl(target) ? undefined : origin);

  appendParams(parsedUrl, params);

  return isAbsoluteUrl(target) ? parsedUrl.toString() : `${parsedUrl.pathname}${parsedUrl.search}`;
};

const isFormData = (data: unknown): data is FormData => (
  typeof FormData !== 'undefined' && data instanceof FormData
);

const createBody = (data: unknown, headers: Headers) => {
  if (data === undefined || data === null) return undefined;
  if (isFormData(data)) return data;

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return JSON.stringify(data);
};

const parseResponse = async (response: Response) => {
  if (response.status === 204) return undefined;

  const text = await response.text();
  if (!text) return undefined;

  const contentType = response.headers.get('content-type') ?? '';
  return contentType.includes('application/json') ? JSON.parse(text) : text;
};

const getResponseStatus = (data: unknown) => {
  if (!data || typeof data !== 'object') return undefined;
  const value = (data as { status?: unknown; code?: unknown }).status ?? (data as { code?: unknown }).code;

  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim() && !Number.isNaN(Number(value))) {
    return Number(value);
  }

  return undefined;
};

const getResponseMessage = (data: unknown, fallback: string) => {
  if (!data || typeof data !== 'object') return fallback;
  const { message, msg, error } = data as { message?: unknown; msg?: unknown; error?: unknown };
  return [message, msg, error].find((item): item is string => typeof item === 'string' && item.length > 0) ?? fallback;
};

async function request<T = unknown>(
  url: string,
  method: string,
  data?: unknown,
  config: RequestConfig = {},
  params?: QueryParams
): Promise<T> {
  const mockPayload = handleMockRequest(url, method, params, data);
  if (mockPayload !== undefined) {
    return mockPayload as T;
  }

  const controller = new AbortController();
  const timer = globalThis.setTimeout(() => controller.abort(), timeout);
  const headers = new Headers(config.headers);
  const token = getToken();

  headers.set('lang', headers.get('lang') || getLang());
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', token.startsWith('Bearer ') ? token : `Bearer ${token}`);
  }

  try {
    const response = await fetch(createUrl(url, params), {
      ...config,
      method,
      headers,
      signal: config.signal ?? controller.signal,
      body: createBody(data, headers)
    });
    const responseData = await parseResponse(response);

    if (!response.ok) {
      if (authExpiredStatus.includes(response.status)) redirectToLogin();
      throw new HttpRequestError(
        response.status,
        getResponseMessage(responseData, response.statusText || 'Request failed'),
        responseData
      );
    }

    const status = getResponseStatus(responseData);
    if (status !== undefined && status !== 200) {
      if (authExpiredStatus.includes(status)) redirectToLogin();
      throw new HttpRequestError(status, getResponseMessage(responseData, 'Request failed'), responseData);
    }

    return responseData as T;
  } catch (error) {
    if (error instanceof HttpRequestError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new HttpRequestError(0, 'Request timeout', null);
    }
    throw error;
  } finally {
    globalThis.clearTimeout(timer);
  }
}

const http = {
  get<T = unknown>(url: string, params?: QueryParams, config?: RequestConfig) {
    return request<T>(url, 'GET', undefined, config, params);
  },

  post<T = unknown, TBody = unknown>(url: string, data?: TBody, config?: RequestConfig) {
    return request<T>(url, 'POST', data, config);
  },

  put<T = unknown, TBody = unknown>(url: string, data?: TBody, config?: RequestConfig) {
    return request<T>(url, 'PUT', data, config);
  },

  patch<T = unknown, TBody = unknown>(url: string, data?: TBody, config?: RequestConfig) {
    return request<T>(url, 'PATCH', data, config);
  },

  delete<T = unknown>(url: string, params?: QueryParams, config?: RequestConfig) {
    return request<T>(url, 'DELETE', undefined, config, params);
  },

  upload<T = unknown>(url: string, formData: FormData, config?: RequestConfig) {
    return request<T>(url, 'POST', formData, config);
  }
};

export default http;
