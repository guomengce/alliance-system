import type { StatusBadgeProps } from '../types';

export default function StatusBadge({ status, variant }: StatusBadgeProps) {
  if (variant === 'mobile') {
    return status === 'credited' ? (
      <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 whitespace-nowrap">已入池划账</span>
    ) : status === 'pending' ? (
      <span className="text-[9px] font-black text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 animate-pulse whitespace-nowrap">待日终划账</span>
    ) : status === 'pool_insufficient' ? (
      <span className="text-[9px] font-black text-amber-500 bg-amber-500/15 px-1.5 py-0.5 rounded border border-amber-400/30 whitespace-nowrap">额度池枯竭</span>
    ) : status === 'intercepted' ? (
      <span className="text-[9px] font-black text-red-500/60 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 whitespace-nowrap">⛔ 拦截回笼</span>
    ) : (
      <span className="text-[9px] font-black text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 whitespace-nowrap">❌ 广播失败</span>
    );
  }

  return status === 'credited' ? (
    <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">已入池划账</span>
  ) : status === 'pending' ? (
    <span className="text-[9px] font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 animate-pulse">待日终划账</span>
  ) : status === 'pool_insufficient' ? (
    <span className="text-[9px] font-black text-amber-500 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-400/30">⚠ 额度不足阻塞</span>
  ) : status === 'intercepted' ? (
    <span className="text-[9px] font-black text-red-400 bg-red-500/15 px-2 py-0.5 rounded border border-red-500/30">⛔ 拦截回笼存池</span>
  ) : (
    <span className="text-[9px] font-black text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">❌ 广播回滚失败</span>
  );
}
