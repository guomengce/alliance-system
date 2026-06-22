import type { DownlineMember, Transaction } from '@/src/types';
import type { AdminLog } from './types';

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

export const mapDownlineToAdminLog = (member: DownlineMember): AdminLog => {
  const ipPool = ['192.168.1.100', '127.0.0.1', '103.45.112.59', '182.23.4.195'];
  const ip = ipPool[parseInt(member.uid, 10) % ipPool.length] || '127.0.0.1';

  return {
    id: `LOG-REG-${member.uid}`,
    timestamp: member.registrationDate || '2026-06-03 00:00:00',
    operator: '999001 (SYS)',
    category: 'operation',
    severity: 'info',
    ipAddress: ip,
    moduleName: '同盟注册中心',
    action: '同盟会员档案链上注册同步',
    details: `新会员 UID: ${member.uid} (${member.nickname || '未设置昵称'}) 已注册。代数级别: ${member.level}，质押总量: ¥${(member.volume || 0).toLocaleString()}，推荐上线: ${member.sponsor || '系统总站'}`,
    payload: JSON.stringify({
      uid: member.uid,
      tier: member.tier,
      level: member.level,
      nickname: member.nickname,
      sponsor: member.sponsor,
      volume: member.volume,
      blockchainSync: 'SUCCESS'
    }, null, 2)
  };
};

const transactionActionLabels: Record<Transaction['type'], string> = {
  recharge: '充值入金',
  withdraw: '大额提现',
  exchange: '持股置换',
  transfer: '人工对账',
  commission: '推广返佣',
  subscribe: '合约认购',
  lock: '锁仓排队'
};

export const mapTransactionToAdminLog = (transaction: Transaction): AdminLog => ({
  id: transaction.id.replace('TXN-', 'LOG-'),
  timestamp: transaction.time,
  operator: transaction.desc.includes('手动') || transaction.desc.includes('人工')
    ? '首席财务官 (Linda)'
    : '999001 (SYS)',
  category: 'finance',
  severity: transaction.status === 'failed'
    ? 'error'
    : transaction.status === 'pending'
      ? 'warn'
      : 'info',
  ipAddress: transaction.blockchainProof?.network?.includes('TRON')
    ? '103.45.112.59'
    : '162.254.204.18',
  moduleName: '财务模块',
  action: transaction.typeLabel || transactionActionLabels[transaction.type],
  details: `${transaction.desc} | 涉及资金: ${transaction.amount} ${transaction.currency} (${transaction.statusLabel || transaction.status})`,
  payload: JSON.stringify(transaction, null, 2)
});

interface BuildAdminLogsParams {
  initialLogs: AdminLog[];
  extraLogs: AdminLog[];
  transactions: Transaction[];
  downlines: DownlineMember[];
}

export const buildAdminLogs = ({
  initialLogs,
  extraLogs,
  transactions,
  downlines
}: BuildAdminLogsParams) => (
  [
    ...extraLogs,
    ...transactions.map(mapTransactionToAdminLog),
    ...downlines.map(mapDownlineToAdminLog),
    ...initialLogs
  ].sort((a, b) => b.timestamp.localeCompare(a.timestamp))
);

interface FilterAdminLogsParams {
  searchQuery: string;
  selectedSeverity: string;
  selectedCategory: string;
}

export const filterAdminLogs = (
  logs: AdminLog[],
  {
    searchQuery,
    selectedSeverity,
    selectedCategory
  }: FilterAdminLogsParams
) => {
  const query = searchQuery.trim().toLowerCase();

  return logs.filter(log => {
    const matchesSearch = query === '' ||
      log.id.toLowerCase().includes(query) ||
      log.operator.toLowerCase().includes(query) ||
      log.moduleName.toLowerCase().includes(query) ||
      log.action.toLowerCase().includes(query) ||
      log.details.toLowerCase().includes(query) ||
      log.ipAddress.includes(query);

    const matchesSeverity = selectedSeverity === 'All' || log.severity === selectedSeverity;
    const matchesCategory = selectedCategory === 'All' || log.category === selectedCategory;

    return matchesSearch && matchesSeverity && matchesCategory;
  });
};
