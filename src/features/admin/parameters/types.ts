import type { Dispatch, SetStateAction } from 'react';

export type CommissionLevels = { [key: string]: number };

export interface CommissionPanelProps {
  commissionLevels: CommissionLevels;
  setCommissionLevels: Dispatch<SetStateAction<CommissionLevels>>;
  onSaveCommissionLevels: () => void;
}

export interface LimitsPanelProps {
  withdrawalFee: number;
  setWithdrawalFee: Dispatch<SetStateAction<number>>;
  l1UnlockRatio: number;
  setL1UnlockRatio: Dispatch<SetStateAction<number>>;
  onSaveLimits: () => void;
}

export interface ApiPanelProps {
  apiPriceUrl: string;
  setApiPriceUrl: Dispatch<SetStateAction<string>>;
  onTestApiPrice: () => void;
}
