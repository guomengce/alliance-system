import type { BackendErrorPayload } from './types';

type QueryParamValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryParamValue | QueryParamValue[]>;

interface BackendRequestOptions<TBody = unknown> extends Omit<RequestInit, 'body'> {
  body?: TBody;
  query?: QueryParams;
}

type AuthTokenProvider = () => string | null;

export const BACKEND_AUTH_TOKEN_STORAGE_KEY = 'alliance_backend_auth_token';

let authTokenProvider: AuthTokenProvider | null = null;

export class BackendRequestError extends Error {
  status: number;
  payload: BackendErrorPayload | null;

  constructor(status: number, message: string, payload: BackendErrorPayload | null = null) {
    super(message);
    this.name = 'BackendRequestError';
    this.status = status;
    this.payload = payload;
  }
}

export const setBackendAuthTokenProvider = (provider: AuthTokenProvider | null) => {
  authTokenProvider = provider;
};

export const getStoredBackendAuthToken = () => (
  sessionStorage.getItem(BACKEND_AUTH_TOKEN_STORAGE_KEY) ||
  localStorage.getItem(BACKEND_AUTH_TOKEN_STORAGE_KEY)
);

export const setStoredBackendAuthToken = (token: string | null, remember = false) => {
  sessionStorage.removeItem(BACKEND_AUTH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(BACKEND_AUTH_TOKEN_STORAGE_KEY);

  if (!token) return;
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(BACKEND_AUTH_TOKEN_STORAGE_KEY, token);
};

const appendQuery = (url: URL, query?: QueryParams) => {
  if (!query) return;

  Object.entries(query).forEach(([key, value]) => {
    const values = Array.isArray(value) ? value : [value];
    values.forEach((item) => {
      if (item === null || item === undefined) return;
      url.searchParams.append(key, String(item));
    });
  });
};

const normalizeBackendPath = (path: string) => {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path === '/api' || path.startsWith('/api/')) return path;
  return `/api${path.startsWith('/') ? path : `/${path}`}`;
};

const createBackendUrl = (path: string, query?: QueryParams) => {
  const origin = typeof window === 'undefined' ? 'http://localhost' : window.location.origin;
  const url = new URL(normalizeBackendPath(path), origin);
  appendQuery(url, query);
  return `${url.pathname}${url.search}`;
};

const parseResponse = async (response: Response): Promise<unknown> => {
  if (response.status === 204) return undefined;

  const text = await response.text();
  if (!text) return undefined;

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return JSON.parse(text);
  }

  return text;
};

export const backendRequest = async <TResponse, TBody = unknown>(
  path: string,
  options: BackendRequestOptions<TBody> = {}
): Promise<TResponse> => {
  const { body, headers, method = 'GET', query, ...restOptions } = options;
  const requestHeaders = new Headers(headers);
  const token = authTokenProvider?.() ?? getStoredBackendAuthToken();

  if (body !== undefined && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (token && !requestHeaders.has('Authorization')) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(createBackendUrl(path, query), {
    ...restOptions,
    method,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body)
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    const errorPayload = typeof payload === 'object' && payload !== null ? payload as BackendErrorPayload : null;
    throw new BackendRequestError(
      response.status,
      errorPayload?.message || errorPayload?.error || response.statusText || 'Request failed',
      errorPayload
    );
  }

  return payload as TResponse;
};

export const backendApiClient = {
  get: <TResponse>(path: string, options?: Omit<BackendRequestOptions, 'method' | 'body'>) => (
    backendRequest<TResponse>(path, { ...options, method: 'GET' })
  ),
  post: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<BackendRequestOptions<TBody>, 'method' | 'body'>
  ) => backendRequest<TResponse, TBody>(path, { ...options, method: 'POST', body })
};
