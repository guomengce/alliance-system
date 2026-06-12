import type { MetricGridProps } from '../types';
import MetricCard from './MetricCard';

export default function MetricGrid({ lockedQueueAmount, reserveBalance }: MetricGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <MetricCard 
        title="全网总会员数" 
        value="5,420 人" 
        sub="100% 链上真实注册账户" 
        colorClass="text-white"
      />
      <MetricCard 
        title="今日流动性认购单" 
        value="128,450.00 USDT" 
        sub="D0 今日到账累计单值" 
        colorClass="text-[#cfbcff]"
      />
      <MetricCard 
        title="今日已派发佣金 (L1-L5)" 
        value="15,240.22 USDT" 
        sub="D+1 04:00 精算核拨成功" 
        colorClass="text-emerald-400"
      />
      <MetricCard 
        title="全联盟锁仓排队总额" 
        value={`${lockedQueueAmount.toLocaleString()} USDT`} 
        sub="等待推荐下线认购实时释放" 
        colorClass="text-amber-400"
      />
      <MetricCard 
        title="储备账户总余量" 
        value={`${reserveBalance.toLocaleString()} USDT`} 
        sub="储备覆盖保证金充裕" 
        colorClass="text-teal-300"
      />
    </div>
  );
}
