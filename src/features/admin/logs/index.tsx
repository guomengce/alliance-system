import { useMemo } from 'react';
import Workspace from './components/Workspace';
import { useLogsState } from './hooks/useLogsState';
import type { AdminLog, AdminLogsViewProps } from './types';

const initialLogs: AdminLog[] = [
  {
    id: 'LOG-8812903',
    timestamp: '2026-06-03 07:44:12',
    operator: '999001 (SYS)',
    category: 'finance',
    severity: 'info',
    ipAddress: '127.0.0.1',
    moduleName: '结算中心',
    action: '自动核销五代加盟佣金收益',
    details: '处理并清算超级代理 889425 (星空行者 Amanda) 旗下五代分销业绩，拨付 ¥12,340.50 USDT 直达可用账户余额',
    payload: '{\n  "event": "FINALIZE_REBATE",\n  "recipientUid": "889425",\n  "basisAmount": 12340.50,\n  "generations": 5,\n  "distributorType": "SuperAgent",\n  "triggerOrder": "ORD-554129841",\n  "consensus": "MULTI_SIG_TRUE",\n  "gasLimit": 85000\n}'
  },
  {
    id: 'LOG-8812904',
    timestamp: '2026-06-03 07:12:04',
    operator: 'admin_center@alliance.com',
    category: 'security',
    severity: 'warn',
    ipAddress: '198.51.100.22',
    moduleName: '安全与RBAC',
    action: '管理员登录二次身份验证验证成功',
    details: '高级风控专员 (Garry) 在异地 IP 重新进行设备密匙质押解锁，通过 Google 2FA 绑定校验成功登录',
    payload: '{\n  "action": "ADMIN_2FA_CHALLENGE",\n  "adminAccount": "ACC-003",\n  "deviceUuid": "6A23B19-F3E2-5D42-AD31-BF328AA92",\n  "ipAddress": "198.51.100.22",\n  "loginLocation": "Taiwan/Taipei",\n  "clientVersion": "AllianceDesktop v3.0.4"\n}'
  },
  {
    id: 'LOG-8812905',
    timestamp: '2026-06-03 06:33:45',
    operator: '999001 (SYS)',
    category: 'system',
    severity: 'info',
    ipAddress: '10.0.12.5',
    moduleName: '认购模块',
    action: '定期执行资金池 limit 溢出巡检完毕',
    details: '分析前 24 小时各套餐认购深度，目前 A方案 至 E方案 的平台剩余放款配额保持在 ¥198,000 以上，健康度良好',
    payload: '{\n  "systemCheck": "LIMIT_OVERFLOW_SCAN",\n  "remainingCapUSDT": 198350.22,\n  "status": "HEALTHY",\n  "riskLevel": 0.02,\n  "activeNodes": 128,\n  "hotspotZone": "Plan-C/Plan-E"\n}'
  },
  {
    id: 'LOG-8812906',
    timestamp: '2026-06-03 05:15:20',
    operator: '999001 (SYS)',
    category: 'finance',
    severity: 'critical',
    ipAddress: '127.0.0.1',
    moduleName: '财务模块',
    action: '监测到多笔跨链质押大额买入交易已确认',
    details: '来自 TRON (TRC-20) 链上哈希开头 TWe8a9b... 的 ¥25,000.00 重整入金流，已经通过 128 个全节点合意达成确认',
    payload: '{\n  "network": "TRON Network (TRC-20)",\n  "txid": "TWe8a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6",\n  "walletType": "GlobalHotReserve",\n  "blockHeight": 61849204,\n  "confirmations": 128,\n  "gasLimit": 1.8\n}'
  },
  {
    id: 'LOG-8812907',
    timestamp: '2026-06-02 23:45:01',
    operator: 'admin_center@alliance.com',
    category: 'operation',
    severity: 'info',
    ipAddress: '162.254.204.18',
    moduleName: '通知与广播',
    action: '发布联盟全网红头紧急升级系统公告',
    details: '联盟架构师 (Jack) 手动分发题为《新一代流动性质押提速白皮书落地公告》，激发全台 WebSocket 推送与邮件订阅',
    payload: '{\n  "broadcastId": "NOT-006",\n  "author": "Jack/Arch",\n  "title": "新一代流动性质押提速白皮书落地公告",\n  "channels": ["WEBSOCKET", "EMAIL", "IM_BOT"],\n  "targets": "ALL_REGISTERED_USERS",\n  "pushSuccessCount": 1421\n}'
  },
  {
    id: 'LOG-8812908',
    timestamp: '2026-06-02 21:10:55',
    operator: 'admin_center@alliance.com',
    category: 'system',
    severity: 'error',
    ipAddress: '103.45.112.59',
    moduleName: '安全与RBAC',
    action: '高密签名服务器握手心跳超时警告',
    details: '多重签名（Multi-Sign）集群节点 04 响应延迟超过 4200ms，为规避出款阻塞，财务临时切换至备用安全签署隧道',
    payload: '{\n  "error_code": "SIG_SERVER_TIMEOUT",\n  "primaryHost": "h_sig_node04.alliance.sec",\n  "latencyMs": 4210,\n  "backupHost": "h_sig_backup01.alliance.sec",\n  "fallbackTriggered": true,\n  "riskLevel": "MEDIUM_WARNING"\n}'
  },
  {
    id: 'LOG-8812909',
    timestamp: '2026-06-02 18:22:45',
    operator: '999001 (SYS)',
    category: 'finance',
    severity: 'warn',
    ipAddress: '127.0.0.1',
    moduleName: '结算中心',
    action: '超额佣金池溢出惩罚规则触发',
    details: '在认购订单下发中，由于部分代理人未申请提升池额至 ¥50,000，溢出的额外收益 ¥1,200.00 分离流向公海平台黑洞池',
    payload: '{\n  "poolId": "COMM_P_88912",\n  "overflowAmount": 1200.00,\n  "penaltyRate": 1.0,\n  "clearingCode": "BLACK_HOLE_SINK",\n  "reason": "Agent pool limit exceeded without timely collateral raise"\n}'
  },
  {
    id: 'LOG-8812910',
    timestamp: '2026-06-02 11:40:12',
    operator: 'admin_center@alliance.com',
    category: 'operation',
    severity: 'info',
    ipAddress: '162.254.204.18',
    moduleName: '套餐与配置',
    action: '修改黄金高收益方案C参数配比',
    details: '调整 方案C (Gold) 的最低认购起购价至 5,000 USDT，并对应调优每日最高流动性释放门槛为池额的 12%',
    payload: '{\n  "tier": "Gold_Plan_C",\n  "modifiedPrice": 5000,\n  "giftRatio": 6,\n  "releaseLimitPercent": 12,\n  "queueReleasePercent": 5,\n  "editor": "Jack/Arch"\n}'
  },
  {
    id: 'LOG-8812911',
    timestamp: '2026-06-02 09:12:00',
    operator: 'admin_center@alliance.com',
    category: 'security',
    severity: 'info',
    ipAddress: '162.254.204.18',
    moduleName: '核心配置项',
    action: '超级二级风控开关解锁启用',
    details: '启用二次重置绑定谷歌两步验证审核，仅授权拥有“超级管理账户”之管理员手动审批异机 2FA 绑定重置',
    payload: '{\n  "settingKey": "SECURE_FORCE_2FA_RESET_ADMIN_APPROVAL",\n  "previousValue": "false",\n  "currentValue": "true",\n  "encryptionLevel": "AES_256_GCM"\n}'
  }
];

export default function AdminLogsView({ transactions = [], downlines = [] }: AdminLogsViewProps) {
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
