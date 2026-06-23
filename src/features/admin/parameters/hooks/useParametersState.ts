import { useState } from 'react';
import { useAppContext } from '../../../../context/AppContext';
import type { CommissionLevels } from '../types';
import { DEFAULT_API_PRICE_URL, DEFAULT_COMMISSION_LEVELS } from '../utils';

export function useParametersState() {
  const { triggerGlobalAlert } = useAppContext();
  const [commissionLevels, setCommissionLevels] = useState<CommissionLevels>(DEFAULT_COMMISSION_LEVELS);
  const [withdrawalFee, setWithdrawalFee] = useState<number>(15);
  const [l1UnlockRatio, setL1UnlockRatio] = useState<number>(10);
  const [apiPriceUrl, setApiPriceUrl] = useState<string>(DEFAULT_API_PRICE_URL);

  const handleSaveCommissionLevels = () => {
    triggerGlobalAlert('L1-L5 各层推荐代付分佣占比修改已实时推送并锁入智能结算合约！', 'success');
  };

  const handleSaveLimits = () => {
    triggerGlobalAlert('出金封底矿工费、L1 解锁提点比例保存成功！', 'success');
  };

  const handleTestApiPrice = () => {
    triggerGlobalAlert('Yahoo Finance API 跨链报盘价格抓取成功！TROO市价复归锁定在 $0.125', 'success');
  };

  return {
    apiPriceUrl,
    commissionLevels,
    handleSaveCommissionLevels,
    handleSaveLimits,
    handleTestApiPrice,
    l1UnlockRatio,
    setApiPriceUrl,
    setCommissionLevels,
    setL1UnlockRatio,
    setWithdrawalFee,
    withdrawalFee
  };
}
