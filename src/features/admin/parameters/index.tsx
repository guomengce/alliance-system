import '../shared/antd-overrides.css';
import AntdApiPanel from './components/AntdApiPanel';
import AntdCommissionPanel from './components/AntdCommissionPanel';
import AntdLimitsPanel from './components/AntdLimitsPanel';
import { useParametersState } from './hooks/useParametersState';

export default function AdminParametersView() {
  const {
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
  } = useParametersState();

  return (
    <div id="admin_parameters_view" className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 animate-fadeIn flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div>
        <h3 className="text-base font-bold text-white">全系统结算安全红线与运营参数微调面板</h3>
        <p className="text-xs text-[#cbc4d2]/60 mt-0.5">
          可实时微调 L1-L5 各层分成占比、排队解锁门限，以及提款矿工手续费封顶。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AntdCommissionPanel
          commissionLevels={commissionLevels}
          setCommissionLevels={setCommissionLevels}
          onSaveCommissionLevels={handleSaveCommissionLevels}
        />
        <AntdLimitsPanel
          withdrawalFee={withdrawalFee}
          setWithdrawalFee={setWithdrawalFee}
          l1UnlockRatio={l1UnlockRatio}
          setL1UnlockRatio={setL1UnlockRatio}
          onSaveLimits={handleSaveLimits}
        />
        <AntdApiPanel
          apiPriceUrl={apiPriceUrl}
          onTestApiPrice={handleTestApiPrice}
        />
      </div>
    </div>
  );
}
