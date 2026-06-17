export const getSeverityBadge = (sec: string) => {
  switch (sec) {
    case 'critical':
      return 'bg-rose-500/10 text-rose-300 border border-rose-500/30';
    case 'error':
      return 'bg-red-500/10 text-red-400 border border-red-500/20';
    case 'warn':
      return 'bg-amber-500/10 text-amber-300 border border-amber-500/20';
    case 'info':
    default:
      return 'bg-sky-500/10 text-sky-300 border border-sky-500/20';
  }
};

export const getCategoryBadge = (cat: string) => {
  switch (cat) {
    case 'security':
      return 'text-[#cfbcff] border-[#cfbcff]/20 bg-[#cfbcff]/5';
    case 'finance':
      return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
    case 'operation':
      return 'text-sky-300 border-sky-500/20 bg-sky-500/5';
    case 'system':
    default:
      return 'text-[#cbc4d2]/70 border-white/5 bg-white/5';
  }
};

export const getCategoryLabel = (cat: string) => {
  switch (cat) {
    case 'security': return '安全与防护';
    case 'finance': return '财务出账';
    case 'operation': return '运营事务';
    case 'system': return '核心系统';
    default: return '通用日志';
  }
};
