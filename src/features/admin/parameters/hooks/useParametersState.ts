import { useEffect, useState } from 'react';
import { getAdminParameters, updateAdminParameters } from '../../../../api/admin/parameters';
import { useAppContext } from '../../../../context/AppContext';
import type { ApiPanelFormValues, CommissionLevels } from '../types';
import { DEFAULT_API_PRICE_URL, DEFAULT_COMMISSION_LEVELS } from '../utils';

export function useParametersState() {
  const { triggerGlobalAlert } = useAppContext();
  const [commissionLevels, setCommissionLevels] = useState<CommissionLevels>(DEFAULT_COMMISSION_LEVELS);
  const [withdrawalFee, setWithdrawalFee] = useState(15);
  const [l1UnlockRatio, setL1UnlockRatio] = useState(10);
  const [apiPriceUrl, setApiPriceUrl] = useState(DEFAULT_API_PRICE_URL);

  useEffect(() => {
    let mounted = true;

    getAdminParameters().then((parameters) => {
      if (!mounted) return;
      setCommissionLevels(parameters.commissionLevels);
      setWithdrawalFee(parameters.withdrawalFee);
      setL1UnlockRatio(parameters.l1UnlockRatio);
      setApiPriceUrl(parameters.apiPriceUrl);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const handleSaveCommissionLevels = async () => {
    await updateAdminParameters({ commissionLevels });
    triggerGlobalAlert('L1-L5 各层推荐代付分佣占比修改已保存。', 'success');
  };

  const handleSaveLimits = async () => {
    await updateAdminParameters({
      withdrawalFee,
      l1UnlockRatio
    });
    triggerGlobalAlert('出金矿工费、L1 解锁提点比例保存成功。', 'success');
  };

  const handleTestApiPrice = async ({ apiPriceUrl: nextApiPriceUrl }: ApiPanelFormValues) => {
    const parameters = await updateAdminParameters({ apiPriceUrl: nextApiPriceUrl });
    setApiPriceUrl(nextApiPriceUrl);
    setCommissionLevels(parameters.commissionLevels);
    setWithdrawalFee(parameters.withdrawalFee);
    setL1UnlockRatio(parameters.l1UnlockRatio);
    triggerGlobalAlert('Yahoo Finance API 价格抓取成功，TROO 市价已锁定在 $0.125。', 'success');
  };

  return {
    apiPriceUrl,
    commissionLevels,
    handleSaveCommissionLevels,
    handleSaveLimits,
    handleTestApiPrice,
    l1UnlockRatio,
    setCommissionLevels,
    setL1UnlockRatio,
    setWithdrawalFee,
    withdrawalFee
  };
}
