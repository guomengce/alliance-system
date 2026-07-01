import { apiClient } from '../request';
import type { ApiEnvelope, ApiListResponse, PaginationQuery } from '../types';

export interface AdminBroadcastDto {
  id: string;
  title: string;
  body: string;
  target: string;
  category: string;
  createdAt: string;
}

export interface AdminBroadcastDraftDto {
  title: string;
  body: string;
  target: string;
  category: string;
  categoryLabel: string;
}

export interface AdminBroadcastTemplateDto {
  content: string;
  updatedAt: string;
}

export type SendAdminBroadcastPayload = Pick<
  AdminBroadcastDto,
  'title' | 'body' | 'target' | 'category'
>;

const wait = <T,>(data: T, ms = 180): Promise<T> => (
  new Promise((resolve) => {
    globalThis.setTimeout(() => resolve(data), ms);
  })
);

let broadcastDraftStore: AdminBroadcastDraftDto = {
  title: '系统升级与安全保障提示',
  body: '全联盟结算通道已完成例行维护，所有充值、解锁、认购在链上秒级同步确认，安心畅享有保障。',
  target: 'all',
  category: 'official_notice',
  categoryLabel: '官方通知公告与安全维护大盘提醒',
};

let broadcastTemplateStore: AdminBroadcastTemplateDto = {
  content: '【补额提醒】尊敬的会员 {uid}，您当前的信用度池已严重不足，请及时认购新代收方案。',
  updatedAt: '2026-07-01 09:00:00',
};

export const adminBroadcastApi = {
  list: (query: PaginationQuery = {}) => (
    apiClient.get<ApiEnvelope<ApiListResponse<AdminBroadcastDto>>>('/admin/broadcasts', { query })
  ),
  send: (payload: SendAdminBroadcastPayload) => {
    const sentBroadcast: AdminBroadcastDto = {
      id: `BROADCAST-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...payload,
    };

    broadcastDraftStore = {
      ...broadcastDraftStore,
      title: '',
      body: '',
      target: payload.target,
      category: payload.category,
    };

    return wait(sentBroadcast);
  },
  getDraft: () => wait({ ...broadcastDraftStore }),
  updateDraft: (payload: AdminBroadcastDraftDto) => {
    broadcastDraftStore = { ...payload };
    return wait({ ...broadcastDraftStore });
  },
  getTemplate: () => wait({ ...broadcastTemplateStore }),
  updateTemplate: (payload: Pick<AdminBroadcastTemplateDto, 'content'>) => {
    broadcastTemplateStore = {
      content: payload.content,
      updatedAt: new Date().toISOString(),
    };

    return wait({ ...broadcastTemplateStore });
  },
};
