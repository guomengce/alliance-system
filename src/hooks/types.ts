import type { Transaction } from '../types';

export type PortalMode = 'client' | 'admin';

export type AdminRole = 'SUPER_ADMIN' | 'FINANCE_DIR' | 'RISK_OFFICER' | 'OPERATOR' | null;

export type LangCode = 'zh' | 'en' | 'zht';

export interface RegisteredUser {
  email: string;
  password: string;
  nickname: string;
  portalMode: PortalMode;
  role: AdminRole;
}

export type GlobalAlertType = 'success' | 'error' | 'warning' | 'info';

export interface GlobalAlertState {
  show: boolean;
  message: string;
  type: GlobalAlertType;
}

export type AddTransactionRecord = (transaction: Transaction) => void;
export type RefundUsdtBalance = (amount: number) => void;
