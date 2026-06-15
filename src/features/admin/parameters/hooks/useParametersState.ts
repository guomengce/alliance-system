import { useState } from 'react';
import type { CommissionLevels } from '../types';
import { DEFAULT_API_PRICE_URL, DEFAULT_COMMISSION_LEVELS } from '../utils';

export function useParametersState() {
  const [commissionLevels, setCommissionLevels] = useState<CommissionLevels>(DEFAULT_COMMISSION_LEVELS);
  const [withdrawalFee, setWithdrawalFee] = useState<number>(15);
  const [l1UnlockRatio, setL1UnlockRatio] = useState<number>(10);
  const [apiPriceUrl, setApiPriceUrl] = useState<string>(DEFAULT_API_PRICE_URL);

  return {
    apiPriceUrl,
    commissionLevels,
    l1UnlockRatio,
    setApiPriceUrl,
    setCommissionLevels,
    setL1UnlockRatio,
    setWithdrawalFee,
    withdrawalFee
  };
}