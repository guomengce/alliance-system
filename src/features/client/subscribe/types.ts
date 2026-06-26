import type { Dispatch, FormEvent, SetStateAction } from 'react';
import type { Transaction } from '../../../types';

export interface SubscribeViewProps {
  usdtBalance: number;
  commissionPoolLimit: number;
  commissionPoolRemaining: number;
  onUpdateCommissionPool: (limitDiff: number, remainingDiff: number) => void;
  onUpdateBalances: (usdtDiff: number, trooDiff: number, lockedDiff?: number) => void;
  onAddTransaction: (txn: Transaction) => void;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  badge: string;
  badgeStyle: string;
  poolLimit: number;
  giftRatio: number;
  releaseLimit: number;
  queueRelease: number;
  isPopular?: boolean;
  description: string;
  borderStyle?: string;
  badgeColor?: string;
}

export interface Purchase {
  id: string;
  name: string;
  amount: number;
  troo: number;
  giftRatio: number;
  lockAmount: number;
  progress: number;
  date: string;
  status: string;
  statusType: string;
  isConfirmation?: boolean;
}

export interface WorkspaceProps {
  usdtBalance: number;
  commissionPoolLimit: number;
  commissionPoolRemaining: number;
  plans: Plan[];
  selectedPlan: Plan;
  amountInput: number;
  successMsg: string;
  errorMsg: string;
  copiedId: string;
  detailModalItem: Purchase | null;
  purchases: Purchase[];
  setSuccessMsg: Dispatch<SetStateAction<string>>;
  setErrorMsg: Dispatch<SetStateAction<string>>;
  setAmountInput: Dispatch<SetStateAction<number>>;
  setDetailModalItem: Dispatch<SetStateAction<Purchase | null>>;
  handleSelectPlan: (plan: Plan) => void;
  handleDropdownChange: (planId: string) => void;
  handleSubscriptionSubmit: (e: FormEvent) => void;
  handleConfirmPurchase: () => void;
  handleCopyText: (text: string) => void;
}
