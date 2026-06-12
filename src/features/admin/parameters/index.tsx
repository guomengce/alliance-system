import React, { useState } from 'react';
import ApiPanel from './components/ApiPanel';
import CommissionPanel from './components/CommissionPanel';
import LimitsPanel from './components/LimitsPanel';
import type { CommissionLevels } from './types';
import { DEFAULT_API_PRICE_URL, DEFAULT_COMMISSION_LEVELS } from './utils';

export default function AdminParametersView() {
  const [commissionLevels, setCommissionLevels] = useState<CommissionLevels>(DEFAULT_COMMISSION_LEVELS);
  const [withdrawalFee, setWithdrawalFee] = useState<number>(15);
  const [l1UnlockRatio, setL1UnlockRatio] = useState<number>(10);
  const [apiPriceUrl, setApiPriceUrl] = useState<string>(DEFAULT_API_PRICE_URL);

  return (
    <div id="admin_parameters_view" className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 animate-fadeIn flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div>
        <h3 className="text-base font-bold text-white">全系统结算安全红线与运营参数微调面板</h3>
        <p className="text-xs text-[#cbc4d2]/60 mt-0.5">
          可实时微调 L1-L5 各层分成占比、排队解扣门限、以及提款矿工消耗手续封顶
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CommissionPanel
          commissionLevels={commissionLevels}
          setCommissionLevels={setCommissionLevels}
        />
        <LimitsPanel
          withdrawalFee={withdrawalFee}
          setWithdrawalFee={setWithdrawalFee}
          l1UnlockRatio={l1UnlockRatio}
          setL1UnlockRatio={setL1UnlockRatio}
        />
        <ApiPanel
          apiPriceUrl={apiPriceUrl}
          setApiPriceUrl={setApiPriceUrl}
        />
      </div>
    </div>
  );
}
