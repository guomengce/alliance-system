import { useMemo } from 'react';
import { getInitialAdminLogs } from '../../../mock/admin/logs';
import Workspace from './components/Workspace';
import { useLogsState } from './hooks/useLogsState';
import type { AdminLog, AdminLogsViewProps } from './types';

export default function AdminLogsView({ transactions = [], downlines = [] }: AdminLogsViewProps) {
  const initialLogs = getInitialAdminLogs();
  const {
    activeDetailLog,
    extraLogs,
    isExporting,
    searchQuery,
    selectedCategory,
    selectedSeverity,
    setActiveDetailLog,
    setExtraLogs,
    setIsExporting,
    setSearchQuery,
    setSelectedCategory,
    setSelectedSeverity,
    setSimulatedCount,
    simulatedCount
  } = useLogsState();

  // Map and merge dynamic active models (downline member profiles & financial transactions ledger)
  const logs = useMemo(() => {
    // 1. Map dynamic user registrations/actions from the DownlineMember database
    const mappedDownlines = (downlines || []).map((member): AdminLog => {
      const ip = ['192.168.1.100', '127.0.0.1', '103.45.112.59', '182.23.4.195'][parseInt(member.uid) % 4] || '127.0.0.1';
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
    });

    // 2. Map dynamic financial transactions from standard ledger logs
    const mappedTxns = (transactions || []).map((tx): AdminLog => {
      let label = '资产划转';
      switch (tx.type) {
        case 'recharge': label = '充值入金'; break;
        case 'withdraw': label = '大额提现'; break;
        case 'exchange': label = '持股置换'; break;
        case 'transfer': label = '人工对账'; break;
        case 'commission': label = '推广返佣'; break;
        case 'subscribe': label = '合约认购'; break;
        case 'lock': label = '锁仓排队'; break;
      }
      return {
        id: tx.id.replace('TXN-', 'LOG-'),
        timestamp: tx.time,
        operator: tx.desc.includes('手动') || tx.desc.includes('人工') ? '首席财务官 (Linda)' : '999001 (SYS)',
        category: 'finance',
        severity: tx.status === 'failed' ? 'error' : tx.status === 'pending' ? 'warn' : 'info',
        ipAddress: tx.blockchainProof?.network?.includes('TRON') ? '103.45.112.59' : '162.254.204.18',
        moduleName: '财务模块',
        action: tx.typeLabel || label,
        details: `${tx.desc} | 涉及资金: ${tx.amount} ${tx.currency} (${tx.statusLabel || tx.status})`,
        payload: JSON.stringify(tx, null, 2)
      };
    });

    const combined = [...extraLogs, ...mappedTxns, ...mappedDownlines, ...initialLogs];
    // Sort descending by timestamp to keep the latest operations on top
    return combined.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  }, [transactions, downlines, extraLogs]);

  // Filter logs logic
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // Search matches
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = query === '' || 
        log.id.toLowerCase().includes(query) ||
        log.operator.toLowerCase().includes(query) ||
        log.moduleName.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.details.toLowerCase().includes(query) ||
        log.ipAddress.includes(query);

      // Severity matches
      const matchesSeverity = selectedSeverity === 'All' || log.severity === selectedSeverity;

      // Category matches
      const matchesCategory = selectedCategory === 'All' || log.category === selectedCategory;

      return matchesSearch && matchesSeverity && matchesCategory;
    });
  }, [logs, searchQuery, selectedSeverity, selectedCategory]);

  // Simulate a live new system event
  const handleSimulateLog = () => {
    const actionsPool = [
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

    const randomAction = actionsPool[Math.floor(Math.random() * actionsPool.length)];
    const pad = (n: number) => n < 10 ? '0' + n : n;
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const newId = `LOG-${8812912 + simulatedCount}`;

    const newLog: AdminLog = {
      id: newId,
      timestamp: dateStr,
      operator: '999001 (SYS)',
      category: randomAction.category as any,
      severity: randomAction.severity as any,
      ipAddress: ['192.168.1.100', '127.0.0.1', '103.45.112.59', '182.23.4.195'][Math.floor(Math.random() * 4)],
      moduleName: randomAction.moduleName,
      action: randomAction.action,
      details: randomAction.details,
      payload: randomAction.payload
    };

    setExtraLogs(prev => [newLog, ...prev]);
    setSimulatedCount(prev => prev + 1);
  };

  // Clear logs helper
  const handleClearAllLogs = () => {
    if (window.confirm('您确定要彻底排空当前内存中的所有审计日志吗？清空操作不可逆转！')) {
      setExtraLogs([]);
    }
  };

  // Simulate exporting report
  const handleExportLogs = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`🎉 联盟系统管理后台日志成功导出！本次已备份 ${filteredLogs.length} 条过滤审计记录日志至 Excel/CSV/JSON 综合封包中。`);
    }, 1500);
  };

  return (
    <Workspace
      logs={logs}
      filteredLogs={filteredLogs}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedSeverity={selectedSeverity}
      setSelectedSeverity={setSelectedSeverity}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      activeDetailLog={activeDetailLog}
      setActiveDetailLog={setActiveDetailLog}
      isExporting={isExporting}
      handleSimulateLog={handleSimulateLog}
      handleClearAllLogs={handleClearAllLogs}
      handleExportLogs={handleExportLogs}
    />
  );
}
