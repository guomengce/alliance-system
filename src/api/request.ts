import type { ApiClient, ApiErrorPayload, ApiRequestOptions, QueryParams } from './types';

type ImportMetaWithEnv = ImportMeta & {
  env?: {
    VITE_API_BASE_URL?: string;
  };
};

const DEFAULT_API_BASE_URL = (import.meta as ImportMetaWithEnv).env?.VITE_API_BASE_URL ?? '';

type AuthTokenProvider = () => string | null;

let authTokenProvider: AuthTokenProvider | null = null;

export class ApiRequestError extends Error {
  status: number;
  payload: ApiErrorPayload | null;

  constructor(status: number, message: string, payload: ApiErrorPayload | null = null) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.payload = payload;
  }
}

export const setApiAuthTokenProvider = (provider: AuthTokenProvider | null) => {
  authTokenProvider = provider;
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

const createRequestUrl = (path: string, query?: QueryParams, baseUrl = DEFAULT_API_BASE_URL): string => {
  const origin = typeof window === 'undefined' ? 'http://localhost' : window.location.origin;
  const url = new URL(path, baseUrl || origin);
  appendQuery(url, query);
  return baseUrl ? url.toString() : `${url.pathname}${url.search}`;
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

export const createApiClient = (baseUrl = DEFAULT_API_BASE_URL): ApiClient => {
  const request: ApiClient['request'] = async <TResponse, TBody = unknown>(
    path: string,
    options: ApiRequestOptions<TBody> = {}
  ): Promise<TResponse> => {
    const { body, headers, method = 'GET', query, ...restOptions } = options;
    const token = authTokenProvider?.();
    const requestHeaders = new Headers(headers);

    if (body !== undefined && !requestHeaders.has('Content-Type')) {
      requestHeaders.set('Content-Type', 'application/json');
    }

    if (token && !requestHeaders.has('Authorization')) {
      requestHeaders.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(createRequestUrl(path, query, baseUrl), {
      ...restOptions,
      method,
      headers: requestHeaders,
      body: body === undefined ? undefined : JSON.stringify(body)
    });

    const payload = await parseResponse(response);

    if (!response.ok) {
      const errorPayload = typeof payload === 'object' && payload !== null ? payload as ApiErrorPayload : null;
      throw new ApiRequestError(
        response.status,
        errorPayload?.message || response.statusText || 'Request failed',
        errorPayload
      );
    }

    return payload as TResponse;
  };

  return {
    request,
    get: (path, options) => request(path, { ...options, method: 'GET' }),
    post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
    put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
    patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
    delete: (path, options) => request(path, { ...options, method: 'DELETE' })
  };
};

export const apiClient = createApiClient();
