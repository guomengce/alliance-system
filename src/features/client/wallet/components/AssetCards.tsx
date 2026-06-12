import { Clock, Coins, DollarSign, Lock, TrendingUp } from 'lucide-react';
import MetricCard from '../../../../components/MetricCard';
import type { AssetCardsProps } from '../types';

export default function AssetCards({ usdtBalance, trooBalance, lockedQueueAmount }: AssetCardsProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        label="总资产 (USDT)"
        value={usdtBalance.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        icon={<DollarSign className="w-4.5 h-4.5" />}
        subtext="资产实时汇率波动 +0.25%"
        subIcon={<TrendingUp className="w-3.5 h-3.5" />}
      />

      <MetricCard
        label="TROO 余额"
        value={trooBalance.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        icon={<Coins className="w-4.5 h-4.5" />}
        subtext={`≈ ${(trooBalance * 0.27).toLocaleString('zh-CN', { maximumFractionDigits: 2 })} USDT`}
        hoverGradientColor="bg-[#cdc0e9]"
      />

      <MetricCard
        label="排队账号锁定金额"
        value={lockedQueueAmount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        icon={<Lock className="w-4 h-4" />}
        subtext="排队中，待解锁释放"
        subIcon={<Clock className="w-3.5 h-3.5" />}
        hoverGradientColor="bg-[#e7c365]"
      />
    </section>
  );
}
