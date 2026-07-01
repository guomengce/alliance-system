import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { QueueOrderItem, ReleaseLogItem } from '../../features/client/queue/types';
import {
  INITIAL_CLIENT_QUEUE_ORDER_DTOS,
  INITIAL_CLIENT_RELEASE_LOG_DTOS
} from '../../mock/client/queue';

export interface ClientQueueSummaryDto {
  originalLocked: number;
  releasedAmount: number;
  remainingLocked: number;
}

export interface ClientQueueOrderDto extends QueueOrderItem {}

export interface ClientReleaseLogDto extends ReleaseLogItem {}

export const clientQueueApi = {
  getSummary: () => (
    apiClient.get<ApiEnvelope<ClientQueueSummaryDto>>('/client/queue/summary')
  ),
  listOrders: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<ClientQueueOrderDto>>>('/client/queue/orders', { query })
  ),
  listReleaseLogs: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<ClientReleaseLogDto>>>('/client/queue/release-logs', { query })
  )
};

export const mapClientQueueOrderDto = (dto: ClientQueueOrderDto): QueueOrderItem => ({
  ...dto,
  unlockHistory: dto.unlockHistory ? [...dto.unlockHistory] : undefined
});

export const mapClientReleaseLogDto = (dto: ClientReleaseLogDto): ReleaseLogItem => ({
  id: dto.id,
  date: dto.date,
  desc: dto.desc
});

export const getInitialClientQueueOrders = (): QueueOrderItem[] => (
  INITIAL_CLIENT_QUEUE_ORDER_DTOS.map((order) => mapClientQueueOrderDto(order))
);

export const getInitialClientReleaseLogs = (): ReleaseLogItem[] => (
  INITIAL_CLIENT_RELEASE_LOG_DTOS.map((log) => mapClientReleaseLogDto(log))
);

export const getClientQueueOrders = async (): Promise<QueueOrderItem[]> => {
  const response = await clientQueueApi.listOrders();
  return response.data.items.map((order) => mapClientQueueOrderDto(order));
};

export const getClientReleaseLogs = async (): Promise<ReleaseLogItem[]> => {
  const response = await clientQueueApi.listReleaseLogs();
  return response.data.items.map((log) => mapClientReleaseLogDto(log));
};
