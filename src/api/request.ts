import request, { HttpRequestError } from '../request';
import type { ApiClient, ApiRequestOptions } from './types';

type AuthTokenProvider = () => string | null;

let authTokenProvider: AuthTokenProvider | null = null;

export class ApiRequestError extends HttpRequestError {
  payload: unknown;

  constructor(status: number, message: string, payload: unknown = null) {
    super(status, message, payload);
    this.name = 'ApiRequestError';
    this.payload = payload;
  }
}

export const setApiAuthTokenProvider = (provider: AuthTokenProvider | null) => {
  authTokenProvider = provider;
};

const withAuthProviderHeader = (headers?: HeadersInit) => {
  const token = authTokenProvider?.();
  if (!token) return headers;

  const nextHeaders = new Headers(headers);
  if (!nextHeaders.has('Authorization')) {
    nextHeaders.set('Authorization', `Bearer ${token}`);
  }

  return nextHeaders;
};

const toRequestConfig = <TBody = unknown>(
  options: ApiRequestOptions<TBody> = {}
) => {
  const { query, body, method, headers, ...config } = options;

  return {
    body,
    config: {
      ...config,
      headers: withAuthProviderHeader(headers)
    },
    method,
    query
  };
};

const normalizeError = (error: unknown): never => {
  if (error instanceof HttpRequestError && !(error instanceof ApiRequestError)) {
    throw new ApiRequestError(error.status, error.message, error.data);
  }

  throw error;
};

export const createApiClient = (): ApiClient => {
  const apiRequest: ApiClient['request'] = async <TResponse, TBody = unknown>(
    path: string,
    options: ApiRequestOptions<TBody> = {}
  ): Promise<TResponse> => {
    const { body, config, method = 'GET', query } = toRequestConfig(options);

    try {
      if (method === 'GET') {
        return await request.get<TResponse>(path, query, config);
      }

      if (method === 'DELETE') {
        return await request.delete<TResponse>(path, query, config);
      }

      if (method === 'PUT') {
        return await request.put<TResponse, TBody>(path, body, config);
      }

      if (method === 'PATCH') {
        return await request.patch<TResponse, TBody>(path, body, config);
      }

      return await request.post<TResponse, TBody>(path, body, config);
    } catch (error) {
      normalizeError(error);
    }
  };

  return {
    request: apiRequest,
    get: (path, options) => apiRequest(path, { ...options, method: 'GET' }),
    post: (path, body, options) => apiRequest(path, { ...options, method: 'POST', body }),
    put: (path, body, options) => apiRequest(path, { ...options, method: 'PUT', body }),
    patch: (path, body, options) => apiRequest(path, { ...options, method: 'PATCH', body }),
    delete: (path, options) => apiRequest(path, { ...options, method: 'DELETE' })
  };
};

export const apiClient = createApiClient();
