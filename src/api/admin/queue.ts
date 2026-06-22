import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';
import type { QueueRoster, QueueTrigger } from '../../features/admin/queue/types';
import { INITIAL_ADMIN_QUEUE_ROSTER_DTOS } from '../../mock/admin/queue';

export interface AdminQueueRosterDto {
  uid: string;
  nickname: string;
  original: number;
  current: number;
  unlocked: number;
  count: number;
  triggerHistory: QueueTrigger[];
}

export interface AdminQueueQuery extends PaginationQuery {
  keyword?: string;
  status?: string;
}

export const adminQueueApi = {
  list: (query: AdminQueueQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminQueueRosterDto>>>('/admin/queue/orders', { query })
  ),
  detail: (orderId: string) => (
    apiClient.get<ApiEnvelope<AdminQueueRosterDto>>(`/admin/queue/orders/${orderId}`)
  )
};

export const mapAdminQueueRosterDto = (dto: AdminQueueRosterDto): QueueRoster => ({
  uid: dto.uid,
  nickname: dto.nickname,
  original: dto.original,
  current: dto.current,
  unlocked: dto.unlocked,
  count: dto.count,
  triggerHistory: dto.triggerHistory
});

export const getInitialAdminQueueRoster = (): QueueRoster[] => (
  INITIAL_ADMIN_QUEUE_ROSTER_DTOS.map((roster) => mapAdminQueueRosterDto(roster))
);
