import type { Dispatch, SetStateAction } from 'react';

export type CommissionLevels = { [key: string]: number };

export interface CommissionPanelProps {
  commissionLevels: CommissionLevels;
  setCommissionLevels: Dispatch<SetStateAction<CommissionLevels>>;
}

export interface LimitsPanelProps {
  withdrawalFee: number;
  setWithdrawalFee: Dispatch<SetStateAction<number>>;
  l1UnlockRatio: number;
  setL1UnlockRatio: Dispatch<SetStateAction<number>>;
}

export interface ApiPanelProps {
  apiPriceUrl: string;
  setApiPriceUrl: Dispatch<SetStateAction<string>>;
}
