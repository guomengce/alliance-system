export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type QueryParamValue = string | number | boolean | null | undefined;

export interface QueryParams {
  [key: string]: QueryParamValue | QueryParamValue[];
}

export interface ApiEnvelope<TData> {
  data: TData;
  code?: string;
  message?: string;
  success?: boolean;
}

export interface ApiListResponse<TItem> {
  items: TItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PaginationQuery extends QueryParams {
  page?: number;
  pageSize?: number;
}

export interface ApiRequestOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  query?: QueryParams;
  headers?: HeadersInit;
  signal?: AbortSignal;
  credentials?: RequestCredentials;
}

export interface ApiErrorPayload {
  code?: string;
  message?: string;
  details?: unknown;
}

export interface ApiClient {
  request<TResponse, TBody = unknown>(
    path: string,
    options?: ApiRequestOptions<TBody>
  ): Promise<TResponse>;
  get<TResponse>(path: string, options?: Omit<ApiRequestOptions, 'method' | 'body'>): Promise<TResponse>;
  post<TResponse, TBody = unknown>(path: string, body?: TBody, options?: Omit<ApiRequestOptions<TBody>, 'method' | 'body'>): Promise<TResponse>;
  put<TResponse, TBody = unknown>(path: string, body?: TBody, options?: Omit<ApiRequestOptions<TBody>, 'method' | 'body'>): Promise<TResponse>;
  patch<TResponse, TBody = unknown>(path: string, body?: TBody, options?: Omit<ApiRequestOptions<TBody>, 'method' | 'body'>): Promise<TResponse>;
  delete<TResponse>(path: string, options?: Omit<ApiRequestOptions, 'method' | 'body'>): Promise<TResponse>;
}
