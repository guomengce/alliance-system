import { useMemo, useState } from 'react';
import type { DownlineMember, Transaction } from '@/src/types';
import { getInitialAdminLogs } from '../../../../mock/admin/logs';
import type { AdminLog } from '../types';
import { buildAdminLogs, filterAdminLogs } from '../utils';

interface UseLogsStateOptions {
  transactions: Transaction[];
  downlines: DownlineMember[];
}

const simulatedActions: Array<Pick<AdminLog, 'category' | 'severity' | 'moduleName' | 'action' | 'details' | 'payload'>> = [
  {
    category: 'security',
    severity: 'warn',
    moduleName: '安全与RBAC',
    action: '监测到异地可疑IP访问尝试',
    details: 'IP 45.22.84.15 尝试发起未授权接口请求 `/api/admin/system/params`，已被二级节点WAF防火墙拦截',
    payload: '{\n  "blockedIp": "45.22.84.15",\n  "requestedRoute": "/api/admin/system/params",\n  "protocol": "HTTPS",\n  "authHeader": "Malformed Bearer token",\n  "secAction": "IP_COOLING_60MIN"\n}'
  },
  {
    category: 'finance',
    severity: 'info',
    moduleName: '财务模块',
    action: '超级代理佣金提现秒级拨付完成',
    details: '出账审核单 TXN-8812903125 二审确认通过。45,000 USDT 已全额通过高保密离网接口广播到 Ethereum 主网',
    payload: '{\n  "targetNetwork": "Ethereum Mainnet (ERC-20)",\n  "payoutUSDT": 45000.00,\n  "destAddress": "0x923Fjk0293asdf92398",\n  "gasLimitGwei": 32.5,\n  "auditTime": "0.12s",\n  "chainStatus": "SUCCESS"\n}'
  },
  {
    category: 'operation',
    severity: 'info',
    moduleName: '排队解锁中心',
    action: '执行系统队列自动纠偏校准',
    details: '检测到当前全联盟已释放质押金额过载比小于 0.08%，自动同步触发队列排队等待缩减，解冻锁定权重 1 级',
    payload: '{\n  "calibrationType": "AUTO_RESIZE_QUEUE",\n  "unlockedRatio": 0.0008,\n  "targetQueueVolume": 3100.0,\n  "triggerStatus": "CALIBRATED"\n}'
  },
  {
    category: 'system',
    severity: 'critical',
    moduleName: '参数配置',
    action: 'USDT法币兑换率汇率API完成热同步',
    details: '自动心跳调度：成功对接 Binance Open API 汇率及 TRON 链上 USDT 即时锚定价格，保持当前汇率 1 USDT 兑换比 ¥7.24',
    payload: '{\n  "binanceFeedPrice": 1.0002,\n  "rmbRate": 7.2435,\n  "lastSuccessUpdate": "2026-06-03 08:00:15",\n  "nodeLatency": "18ms",\n  "engine": "CoinMarketCapSync"\n}'
  }
];

const pad = (n: number) => n < 10 ? '0' + n : n;

function createSimulatedLog(simulatedCount: number): AdminLog {
  const randomAction = simulatedActions[Math.floor(Math.random() * simulatedActions.length)];
  const now = new Date();
  const dateStr = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate()) + ' ' + pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());

  return {
    id: 'LOG-' + (8812912 + simulatedCount),
    timestamp: dateStr,
    operator: '999001 (SYS)',
    category: randomAction.category,
    severity: randomAction.severity,
    ipAddress: ['192.168.1.100', '127.0.0.1', '103.45.112.59', '182.23.4.195'][Math.floor(Math.random() * 4)],
    moduleName: randomAction.moduleName,
    action: randomAction.action,
    details: randomAction.details,
    payload: randomAction.payload
  };
}

export function useLogsState({ transactions, downlines }: UseLogsStateOptions) {
  const initialLogs = useMemo(() => getInitialAdminLogs(), []);
  const [extraLogs, setExtraLogs] = useState<AdminLog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeDetailLog, setActiveDetailLog] = useState<AdminLog | null>(null);
  const [simulatedCount, setSimulatedCount] = useState<number>(0);
  const [isExporting, setIsExporting] = useState(false);

  const logs = useMemo(() => {
    return buildAdminLogs({
      initialLogs,
      extraLogs,
      transactions,
      downlines
    });
  }, [initialLogs, transactions, downlines, extraLogs]);

  const filteredLogs = useMemo(() => {
    return filterAdminLogs(logs, {
      searchQuery,
      selectedSeverity,
      selectedCategory
    });
  }, [logs, searchQuery, selectedSeverity, selectedCategory]);

  const handleSimulateLog = () => {
    setExtraLogs(prev => [createSimulatedLog(simulatedCount), ...prev]);
    setSimulatedCount(prev => prev + 1);
  };

  const handleClearAllLogs = () => {
    if (window.confirm('您确定要彻底排空当前内存中的所有审计日志吗？清空操作不可逆转！')) {
      setExtraLogs([]);
    }
  };

  const handleExportLogs = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('🎉 联盟系统管理后台日志成功导出！本次已备份 ' + filteredLogs.length + ' 条过滤审计记录日志至 Excel/CSV/JSON 综合封包中。');
    }, 1500);
  };

  return {
    activeDetailLog,
    filteredLogs,
    handleClearAllLogs,
    handleExportLogs,
    handleSimulateLog,
    isExporting,
    logs,
    searchQuery,
    selectedCategory,
    selectedSeverity,
    setActiveDetailLog,
    setSearchQuery,
    setSelectedCategory,
    setSelectedSeverity
  };
}
