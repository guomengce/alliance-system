import type { ApiEnvelope, ApiListResponse, QueryParams } from '../api/types';
import { initialDownlines, initialTransactions } from './data';
import { handleClientNotificationsMockRequest } from './client/notifications';
import { INITIAL_CLIENT_PLAN_DTOS, INITIAL_CLIENT_SUBSCRIBE_ORDER_DTOS } from './client/subscribe';
import { INITIAL_CLIENT_QUEUE_ORDER_DTOS, INITIAL_CLIENT_RELEASE_LOG_DTOS } from './client/queue';
import { getInitialClientHomeData } from './client/home';
import { getInitialClientCommissionData } from './client/commission';
import { getInitialClientMemberData } from './client/member';
import { getInitialClientSettingsData } from './client/settings';
import { INITIAL_ADMIN_BROADCAST_CONFIG_DTO } from './admin/broadcast';
import { INITIAL_ADMIN_COMMISSION_DTOS, INITIAL_ADMIN_OVERFLOW_LOG_DTOS } from './admin/commissions';
import { getInitialAdminTrendData } from './admin/dashboard';
import { getInitialAdminLogs } from './admin/logs';
import { INITIAL_ADMIN_ORDER_DTOS } from './admin/orders';
import { INITIAL_ADMIN_PLAN_DTOS } from './admin/plans';
import { INITIAL_ADMIN_QUEUE_ROSTER_DTOS } from './admin/queue';
import { INITIAL_ADMIN_ACCOUNT_DTOS, INITIAL_PERMISSION_DEFINITION_DTOS, INITIAL_ROLE_PERMISSION_DTOS } from './admin/rbac';
import { getInitialAdminReportData } from './admin/reports';
import {
  INITIAL_ADMIN_SETTLEMENT_LOG_DTOS,
  INITIAL_ADMIN_SETTLEMENT_TRANSACTION_DTOS
} from './admin/settlement';
import type { AdminParametersDto } from '../api/admin/parameters';

type MockMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | string;

const envelope = <TData>(data: TData): ApiEnvelope<TData> => ({
  data,
  success: true
});

const listEnvelope = <TItem>(items: TItem[], query: QueryParams = {}): ApiEnvelope<ApiListResponse<TItem>> => {
  const page = Number(query.page ?? 1);
  const pageSize = Number(query.pageSize ?? (items.length || 10));
  const start = (page - 1) * pageSize;

  return envelope({
    items: items.slice(start, start + pageSize),
    total: items.length,
    page,
    pageSize
  });
};

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const adminParameters: AdminParametersDto = {
  commissionLevels: {
    l1: 40,
    l2: 40,
    l3: 40,
    l4: 40,
    l5: 40
  },
  withdrawalFee: 15,
  l1UnlockRatio: 10,
  apiPriceUrl: 'https://query1.finance.yahoo.com/v8/finance/chart/TROO-USD'
};

const pendingWithdrawals = initialTransactions
  .filter((transaction) => transaction.type === 'withdraw')
  .map((transaction) => ({ ...transaction, reviewer: undefined, reviewedAt: undefined }));

const adminLogActions = [
  {
    category: 'security',
    severity: 'warn',
    moduleName: '安全与 RBAC',
    action: '检测到异常 IP 访问尝试',
    details: '系统已拦截一次未授权后台接口访问。',
    payload: '{ "secAction": "IP_COOLING_60MIN" }'
  },
  {
    category: 'finance',
    severity: 'info',
    moduleName: '财务模块',
    action: '佣金提现拨付完成',
    details: '提现审核通过后已广播到链上网络。',
    payload: '{ "chainStatus": "SUCCESS" }'
  },
  {
    category: 'operation',
    severity: 'info',
    moduleName: '排队解锁中心',
    action: '执行队列自动校准',
    details: '系统已同步触发队列权重校准。',
    payload: '{ "triggerStatus": "CALIBRATED" }'
  },
  {
    category: 'system',
    severity: 'critical',
    moduleName: '参数配置',
    action: '价格 API 热同步完成',
    details: '系统成功刷新 USDT 汇率与 TROO 价格。',
    payload: '{ "engine": "MockPriceSync" }'
  }
] as const;

const pad = (value: number) => (value < 10 ? `0${value}` : String(value));

const createAdminLog = (index = 0) => {
  const action = adminLogActions[index % adminLogActions.length];
  const now = new Date();
  return {
    id: `LOG-${8812912 + index}`,
    timestamp: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
    operator: '999001 (SYS)',
    category: action.category,
    severity: action.severity,
    ipAddress: ['192.168.1.100', '127.0.0.1', '103.45.112.59', '182.23.4.195'][index % 4],
    moduleName: action.moduleName,
    action: action.action,
    details: action.details,
    payload: action.payload
  };
};

export const handleMockRequest = (
  path: string,
  method: MockMethod,
  query?: QueryParams,
  body?: unknown
): unknown => {
  const notificationPayload = handleClientNotificationsMockRequest(path, method, query);
  if (notificationPayload !== undefined) return notificationPayload;

  if (path === '/client/home/overview' && method === 'GET') {
    const { marketData, orders } = getInitialClientHomeData();
    return envelope({
      usdtBalance: 128450,
      trooBalance: 452190.22,
      lockedQueueAmount: 3100,
      cumulativeCommissions: 842500,
      arrivedCommissions: 830159.5,
      failedCommissions: 480,
      yesterdayRevenue: 842.12,
      remainingCredit: 2000,
      totalCredit: 40000,
      transactions: clone(initialTransactions),
      marketData,
      recentOrders: orders
    });
  }

  if (path === '/client/wallet/summary' && method === 'GET') {
    return envelope({ usdtBalance: 128450, trooBalance: 452190.22, lockedQueueAmount: 3100 });
  }

  if (path === '/client/wallet/transactions' && method === 'GET') {
    return listEnvelope(clone(initialTransactions), query);
  }

  if (path === '/client/wallet/recharge' && method === 'POST') {
    const payload = body as { amount?: number; network?: string };
    return envelope({
      ...initialTransactions[0],
      id: `TXN-${Date.now()}`,
      type: 'recharge',
      amount: payload.amount ?? 0,
      desc: `${payload.network ?? 'TRX'} recharge`
    });
  }

  if (path === '/client/wallet/withdraw' && method === 'POST') {
    const payload = body as { amount?: number; network?: string };
    return envelope({
      ...initialTransactions[0],
      id: `TXN-${Date.now()}`,
      type: 'withdraw',
      amount: -(payload.amount ?? 0),
      desc: `${payload.network ?? 'TRX'} withdrawal`
    });
  }

  if (path === '/client/wallet/transfer' && method === 'POST') {
    const payload = body as { amount?: number; targetUid?: string };
    return envelope({
      ...initialTransactions[0],
      id: `TXN-${Date.now()}`,
      type: 'transfer',
      amount: -(payload.amount ?? 0),
      desc: `Transfer to ${payload.targetUid ?? 'member'}`
    });
  }

  if (path === '/client/queue/summary' && method === 'GET') {
    return envelope({ originalLocked: 10000, releasedAmount: 6900, remainingLocked: 3100 });
  }

  if (path === '/client/queue/orders' && method === 'GET') {
    return listEnvelope(clone(INITIAL_CLIENT_QUEUE_ORDER_DTOS), query);
  }

  if (path === '/client/queue/release-logs' && method === 'GET') {
    return listEnvelope(clone(INITIAL_CLIENT_RELEASE_LOG_DTOS), query);
  }

  if (path === '/client/subscribe/plans' && method === 'GET') {
    return listEnvelope(clone(INITIAL_CLIENT_PLAN_DTOS), query);
  }

  if (path === '/client/subscribe/orders' && method === 'POST') {
    const payload = body as { amount?: number; planId?: string };
    return envelope({
      ...INITIAL_CLIENT_SUBSCRIBE_ORDER_DTOS[0],
      id: `SUB-${Date.now()}`,
      amount: payload.amount ?? 0,
      planId: payload.planId
    });
  }

  if (path === '/client/subscribe/orders' && method === 'GET') {
    return listEnvelope(clone(INITIAL_CLIENT_SUBSCRIBE_ORDER_DTOS), query);
  }

  if (path === '/client/member/profile' && method === 'GET') {
    const { recentActivities } = getInitialClientMemberData();
    return envelope({
      uid: '999001',
      nickname: 'Alliance Member',
      joinDate: '2023-10-24',
      remainingCredit: 2000,
      totalCredit: 40000,
      recentActivities
    });
  }

  if (path === '/client/member/profile' && method === 'PATCH') {
    const payload = body as Record<string, unknown>;
    const { recentActivities } = getInitialClientMemberData();
    return envelope({
      uid: '999001',
      nickname: 'Alliance Member',
      joinDate: '2023-10-24',
      remainingCredit: 2000,
      totalCredit: 40000,
      recentActivities,
      ...payload
    });
  }

  if (path === '/client/team/summary' && method === 'GET') {
    return envelope({
      totalMembers: initialDownlines.length,
      activeMembers: initialDownlines.filter((member) => member.status !== 'disabled').length,
      totalVolume: initialDownlines.reduce((sum, member) => sum + member.volume, 0)
    });
  }

  if (path === '/client/team/members' && method === 'GET') {
    return listEnvelope(clone(initialDownlines), query);
  }

  if (path === '/client/settings' && method === 'GET') {
    return envelope({
      nickname: 'Alliance Member',
      email: 'member@alliance.local',
      twoFAEnabled: true,
      activeDevices: getInitialClientSettingsData().activeDevices
    });
  }

  if (path === '/client/settings' && method === 'PATCH') {
    return envelope({
      nickname: 'Alliance Member',
      email: 'member@alliance.local',
      twoFAEnabled: true,
      activeDevices: getInitialClientSettingsData().activeDevices,
      ...(body as Record<string, unknown>)
    });
  }

  if (path === '/client/settings/password' && method === 'POST') {
    return envelope(null);
  }

  if (path === '/client/commissions/summary' && method === 'GET') {
    return envelope({
      cumulativeCommissions: 842500,
      pendingBalance: 12340.5,
      arrivedCommissions: 830159.5,
      failedCommissions: 480,
      commissionPoolLimit: 40000,
      commissionPoolRemaining: 2000
    });
  }

  if (path === '/client/commissions/records' && method === 'GET') {
    return listEnvelope(getInitialClientCommissionData().history, query);
  }

  if (path === '/client/commissions/ratios' && method === 'GET') {
    return envelope(getInitialClientCommissionData().ratios);
  }

  if (path === '/client/commissions/withdrawals' && method === 'POST') {
    return envelope({
      id: `COMM-${Date.now()}`,
      user: 'UID: 999001',
      userLetter: 'AM',
      amount: (body as { amount?: number })?.amount ?? 0,
      level: 'L1',
      reward: (body as { amount?: number })?.amount ?? 0,
      time: new Date().toISOString(),
      status: 'pending',
      statusLabel: 'Pending'
    });
  }

  if (path === '/admin/dashboard/overview' && method === 'GET') {
    return envelope({
      usdtBalance: 1082450,
      lockedQueueAmount: 318800,
      reserveBalance: 518800,
      trooMarketData: [
        { time: '02:00', price: 0.098, change: -1.2 },
        { time: '08:00', price: 0.101, change: 1.8 },
        { time: '14:00', price: 0.104, change: 3.2 },
        { time: '20:00', price: 0.107, change: 5.6 }
      ],
      trendData: getInitialAdminTrendData()
    });
  }

  if (path === '/admin/reports/summary' && method === 'GET') {
    return envelope(getInitialAdminReportData());
  }

  if (path === '/admin/logs' && method === 'GET') {
    return listEnvelope(getInitialAdminLogs(), query);
  }

  if (path === '/admin/logs' && method === 'POST') {
    return envelope(createAdminLog((body as { index?: number })?.index ?? 0));
  }

  if (path === '/admin/parameters' && method === 'GET') {
    return envelope(clone(adminParameters));
  }

  if (path === '/admin/parameters' && method === 'PATCH') {
    Object.assign(adminParameters, body);
    return envelope(clone(adminParameters));
  }

  if (path === '/admin/profile' && method === 'GET') {
    return envelope({
      uid: 'ADMIN-001',
      nickname: 'Alliance Admin',
      email: 'admin@alliance.local',
      role: 'super-admin',
      twoFAEnabled: true
    });
  }

  if (path === '/admin/profile' && method === 'PATCH') {
    return envelope({
      uid: 'ADMIN-001',
      nickname: 'Alliance Admin',
      email: 'admin@alliance.local',
      role: 'super-admin',
      twoFAEnabled: true,
      ...(body as Record<string, unknown>)
    });
  }

  if (path === '/admin/profile/password' && method === 'POST') {
    return envelope(null);
  }

  if (path === '/admin/users' && method === 'GET') {
    return listEnvelope(clone(initialDownlines), query);
  }

  const userDetailMatch = path.match(/^\/admin\/users\/([^/]+)$/);
  if (userDetailMatch && method === 'GET') {
    return envelope(clone(initialDownlines.find((user) => user.uid === userDetailMatch[1]) ?? initialDownlines[0]));
  }

  if (userDetailMatch && method === 'PATCH') {
    return envelope({
      ...clone(initialDownlines.find((user) => user.uid === userDetailMatch[1]) ?? initialDownlines[0]),
      ...(body as Record<string, unknown>)
    });
  }

  if (path === '/admin/orders' && method === 'GET') {
    return listEnvelope(clone(INITIAL_ADMIN_ORDER_DTOS), query);
  }

  const orderDetailMatch = path.match(/^\/admin\/orders\/([^/]+)$/);
  if (orderDetailMatch && method === 'GET') {
    return envelope(clone(INITIAL_ADMIN_ORDER_DTOS.find((order) => order.id === orderDetailMatch[1]) ?? INITIAL_ADMIN_ORDER_DTOS[0]));
  }

  if (path === '/admin/plans' && method === 'GET') {
    return listEnvelope(clone(INITIAL_ADMIN_PLAN_DTOS), query);
  }

  if (path === '/admin/plans' && method === 'POST') {
    return envelope({ ...INITIAL_ADMIN_PLAN_DTOS[0], ...(body as Record<string, unknown>), id: `PLAN-${Date.now()}` });
  }

  const planMatch = path.match(/^\/admin\/plans\/([^/]+)$/);
  if (planMatch && method === 'PATCH') {
    return envelope({ ...INITIAL_ADMIN_PLAN_DTOS[0], ...(body as Record<string, unknown>), id: planMatch[1] });
  }

  if (path === '/admin/queue/orders' && method === 'GET') {
    return listEnvelope(clone(INITIAL_ADMIN_QUEUE_ROSTER_DTOS), query);
  }

  const queueDetailMatch = path.match(/^\/admin\/queue\/orders\/([^/]+)$/);
  if (queueDetailMatch && method === 'GET') {
    return envelope(clone(INITIAL_ADMIN_QUEUE_ROSTER_DTOS.find((order) => order.uid === queueDetailMatch[1]) ?? INITIAL_ADMIN_QUEUE_ROSTER_DTOS[0]));
  }

  if (path === '/admin/rbac/roles' && method === 'GET') {
    return listEnvelope(clone(INITIAL_ROLE_PERMISSION_DTOS), query);
  }

  const roleMatch = path.match(/^\/admin\/rbac\/roles\/([^/]+)$/);
  if (roleMatch && method === 'PATCH') {
    return envelope({
      ...INITIAL_ROLE_PERMISSION_DTOS.find((role) => role.roleCode === roleMatch[1]) ?? INITIAL_ROLE_PERMISSION_DTOS[0],
      ...(body as Record<string, unknown>)
    });
  }

  if (path === '/admin/settlements' && method === 'GET') {
    return listEnvelope(clone(INITIAL_ADMIN_SETTLEMENT_TRANSACTION_DTOS), query);
  }

  const settlementMatch = path.match(/^\/admin\/settlements\/([^/]+)\/execute$/);
  if (settlementMatch && method === 'POST') {
    return envelope({
      ...INITIAL_ADMIN_SETTLEMENT_TRANSACTION_DTOS.find((item) => item.id === settlementMatch[1]) ?? INITIAL_ADMIN_SETTLEMENT_TRANSACTION_DTOS[0],
      status: 'settled'
    });
  }

  if (path === '/admin/commissions' && method === 'GET') {
    return listEnvelope(clone(INITIAL_ADMIN_COMMISSION_DTOS), query);
  }

  if (path === '/admin/finance/withdrawals' && method === 'GET') {
    return listEnvelope(clone(pendingWithdrawals), query);
  }

  const approveWithdrawalMatch = path.match(/^\/admin\/finance\/withdrawals\/([^/]+)\/approve$/);
  if (approveWithdrawalMatch && method === 'POST') {
    return envelope({
      ...(pendingWithdrawals.find((item) => item.id === approveWithdrawalMatch[1]) ?? pendingWithdrawals[0]),
      status: 'success',
      reviewer: 'Admin',
      reviewedAt: new Date().toISOString()
    });
  }

  const rejectWithdrawalMatch = path.match(/^\/admin\/finance\/withdrawals\/([^/]+)\/reject$/);
  if (rejectWithdrawalMatch && method === 'POST') {
    return envelope({
      ...(pendingWithdrawals.find((item) => item.id === rejectWithdrawalMatch[1]) ?? pendingWithdrawals[0]),
      status: 'failed',
      rejectReason: (body as { reason?: string })?.reason ?? 'Rejected'
    });
  }

  if (path === '/admin/broadcasts' && method === 'GET') {
    return listEnvelope([], query);
  }

  if (path === '/admin/broadcasts/config' && method === 'GET') {
    return envelope(clone(INITIAL_ADMIN_BROADCAST_CONFIG_DTO));
  }

  if (path === '/admin/broadcasts' && method === 'POST') {
    return envelope({
      id: `BCAST-${Date.now()}`,
      title: INITIAL_ADMIN_BROADCAST_CONFIG_DTO.broadcastTitle,
      body: INITIAL_ADMIN_BROADCAST_CONFIG_DTO.broadcastBody,
      target: INITIAL_ADMIN_BROADCAST_CONFIG_DTO.broadcastTarget,
      createdAt: new Date().toISOString(),
      ...(body as Record<string, unknown>)
    });
  }

  if (path === '/admin/rbac/accounts' && method === 'GET') {
    return listEnvelope(clone(INITIAL_ADMIN_ACCOUNT_DTOS), query);
  }

  if (path === '/admin/rbac/permissions' && method === 'GET') {
    return listEnvelope(clone(INITIAL_PERMISSION_DEFINITION_DTOS), query);
  }

  if (path === '/admin/settlements/logs' && method === 'GET') {
    return listEnvelope(clone(INITIAL_ADMIN_SETTLEMENT_LOG_DTOS), query);
  }

  if (path === '/admin/commissions/overflow-logs' && method === 'GET') {
    return listEnvelope(clone(INITIAL_ADMIN_OVERFLOW_LOG_DTOS), query);
  }

  return undefined;
};
