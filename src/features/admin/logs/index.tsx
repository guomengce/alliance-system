import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  AlertCircle, 
  Trash2, 
  RefreshCw, 
  Download, 
  Database, 
  Filter, 
  Clock, 
  ArrowRight, 
  Check, 
  Settings, 
  ShieldCheck, 
  Terminal, 
  X, 
  Search, 
  Plus, 
  Eye, 
  FileText, 
  Lock, 
  Globe 
} from 'lucide-react';

import { Transaction, DownlineMember } from '../../../types';

interface AdminLog {
  id: string;
  timestamp: string;
  operator: string;
  category: 'security' | 'finance' | 'operation' | 'system';
  severity: 'info' | 'warn' | 'error' | 'critical';
  ipAddress: string;
  moduleName: string;
  action: string;
  details: string;
  payload?: string;
}

interface AdminLogsViewProps {
  transactions?: Transaction[];
  downlines?: DownlineMember[];
}

export default function AdminLogsView({ transactions = [], downlines = [] }: AdminLogsViewProps) {
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

  const [extraLogs, setExtraLogs] = useState<AdminLog[]>([]);

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeDetailLog, setActiveDetailLog] = useState<AdminLog | null>(null);
  const [simulatedCount, setSimulatedCount] = useState<number>(0);
  const [isExporting, setIsExporting] = useState(false);

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

  // Status badges helpers
  const getSeverityBadge = (sec: string) => {
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

  const getCategoryBadge = (cat: string) => {
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

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'security': return '安全与防护';
      case 'finance': return '财务出账';
      case 'operation': return '运营事务';
      case 'system': return '核心系统';
      default: return '通用日志';
    }
  };

  return (
    <div id="admin_logs_view" className="flex flex-col gap-6 animate-fadeIn">
      {/* Top Welcome Title Grid */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Terminal className="w-6 h-6 text-[#cfbcff]" />
            操作日志与审计底册
          </h2>
          <p className="text-xs text-[#cbc4d2]/60 mt-1 font-semibold">
            安全守护级底层节点运维通道、多级管理员登录活动、核心分成及出账操作审计底册记录
          </p>
        </div>

        {/* Floating Quick Stats Indicators */}
        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          <button
            type="button"
            onClick={handleSimulateLog}
            className="px-4 py-2 bg-[#6750a4]/30 text-[#cfbcff] border border-[#cfbcff]/20 hover:bg-[#6750a4]/50 transition-all rounded-xl text-xs font-bold inline-flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            模拟产生动态事件
          </button>

          <button
            type="button"
            onClick={handleExportLogs}
            disabled={isExporting || logs.length === 0}
            className="px-4 py-2 bg-[#cfbcff]/10 text-[#cfbcff] hover:bg-[#cfbcff]/20 border border-[#cfbcff]/20 transition-all rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            {isExporting ? '生成加密包...' : '导出审计底册'}
          </button>

          <button
            type="button"
            onClick={handleClearAllLogs}
            disabled={logs.length === 0}
            className="p-2 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 transition-all rounded-xl border border-rose-500/20 flex items-center justify-center cursor-pointer active:scale-95 disabled:opacity-40 select-none"
            title="清空审计日志"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Central Quick Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#16121c] p-4 rounded-2xl border border-white/5">
          <div className="text-[10px] text-[#cbc4d2]/50 font-black uppercase tracking-wider">当前日志总数</div>
          <div className="text-lg sm:text-2xl font-mono font-black text-white mt-1.5 flex items-center gap-2">
            <Database className="w-5 h-5 text-[#cfbcff]/70" />
            {logs.length} 条
          </div>
        </div>

        <div className="bg-[#16121c] p-4 rounded-2xl border border-white/5">
          <div className="text-[10px] text-[#cbc4d2]/50 font-black uppercase tracking-wider">今日安全拦截</div>
          <div className="text-lg sm:text-2xl font-mono font-black text-amber-400 mt-1.5 flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-500/70 animate-pulse" />
            {logs.filter(l => l.severity === 'critical' || l.category === 'security').length} 次
          </div>
        </div>

        <div className="bg-[#16121c] p-4 rounded-2xl border border-white/5">
          <div className="text-[10px] text-[#cbc4d2]/50 font-black uppercase tracking-wider">异地管理员IP</div>
          <div className="text-lg sm:text-2xl font-mono font-black text-emerald-400 mt-1.5 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-500/70" />
            {new Set(logs.map(l => l.ipAddress)).size} 个
          </div>
        </div>

        <div className="bg-[#16121c] p-4 rounded-2xl border border-white/5">
          <div className="text-[10px] text-[#cbc4d2]/50 font-black uppercase tracking-wider">日志更新心跳</div>
          <div className="text-lg sm:text-2xl font-mono font-black text-sky-400 mt-1.5 flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-500/70" />
            正常 (LIVE)
          </div>
        </div>
      </div>

      {/* Search and Filters Bento Grid Panel */}
      <div className="bg-[#16121c] p-5 rounded-2xl border border-white/5 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Main search input field */}
          <div className="relative group flex-grow">
            <Search className="w-4 h-4 text-[#cbc4d2] opacity-60 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#cfbcff] transition-colors" />
            <input 
              type="text" 
              placeholder="搜索操作详情、管理员/系统、IP地址、模块名称、LOG流水号"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e1927]/90 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#cfbcff]/50 focus:ring-1 focus:ring-[#cfbcff]/20 transition-all font-semibold"
            />
          </div>

          {/* Selector filters split rows */}
          <div className="flex items-center gap-3 flex-wrap w-full md:w-auto justify-start md:justify-end">
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <span className="text-[10px] text-[#cbc4d2]/50 font-bold uppercase tracking-wider inline-flex items-center gap-1 shrink-0">
                <Filter className="w-3 h-3 text-[#cfbcff]" /> 等级:
              </span>
              {/* Desktop Level Filter Button Group */}
              <div className="hidden sm:flex bg-[#201b2a] rounded-xl p-0.5 border border-white/5 shrink-0">
                {['All', 'info', 'warn', 'error', 'critical'].map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setSelectedSeverity(sev)}
                    className={`px-3 py-1 text-[11px] font-black rounded-lg transition-all capitalize select-none cursor-pointer ${
                      selectedSeverity === sev
                        ? 'bg-[#6750a4] text-white'
                        : 'text-[#cbc4d2]/50 hover:text-white'
                    }`}
                  >
                    {sev === 'All' ? '全部' : sev}
                  </button>
                ))}
              </div>
              {/* Mobile Level Filter Dropdown Selector */}
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="flex sm:hidden w-full bg-[#201b2a] border border-white/10 text-xs text-[#cbc4d2] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#cfbcff]/40 cursor-pointer font-semibold"
              >
                <option value="All">全部等级 (All)</option>
                <option value="info">Info (信息)</option>
                <option value="warn">Warn (警告)</option>
                <option value="error">Error (错误)</option>
                <option value="critical">Critical (核心拦截)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <span className="text-[10px] text-[#cbc4d2]/50 font-bold uppercase tracking-wider inline-flex items-center gap-1 shrink-0">
                类别:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#201b2a] border border-white/10 text-xs text-[#cbc4d2] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#cfbcff]/40 cursor-pointer font-semibold w-full sm:w-auto"
              >
                <option value="All">全部类别</option>
                <option value="security">安全与防护</option>
                <option value="finance">财务出账</option>
                <option value="operation">运营事务</option>
                <option value="system">核心系统</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Main Logs Table / Card Grid container */}
      <div className="bg-[#16121c]/90 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        {/* 1. Desktop structured table layout (visible only at screen >= lg) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="border-b border-white/5 bg-[#201b2a]/30 text-[10px] text-[#cbc4d2]/50 uppercase tracking-wider font-extrabold select-none">
                <th className="py-4 px-5 w-[14%]">流水ID</th>
                <th className="py-4 px-4 w-[16%]">时间戳</th>
                <th className="py-4 px-4 w-[15%]">审计模块</th>
                <th className="py-4 px-4 w-[18%]">操作人 (Operator)</th>
                <th className="py-4 px-4 w-[27%]">操作事项 (Action Event)</th>
                <th className="py-4 px-4 w-[10%] text-center">状态底册</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 bg-white/2 rounded-2xl border border-white/5 flex items-center justify-center text-[#cbc4d2]/30">
                        <Database className="w-6 h-6" />
                      </div>
                      <p className="text-[#cbc4d2]/40 text-xs font-semibold">没有检索到任何符合条件的联盟审计日志记录</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr 
                    key={log.id}
                    onClick={() => setActiveDetailLog(log)}
                    className="border-b border-white/2 hover:bg-white/[0.02] cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-5 select-all font-mono text-xs font-black text-[#cfbcff] group-hover:underline truncate" title={log.id}>
                      {log.id}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-[#cbc4d2]/60 whitespace-nowrap">
                      {log.timestamp.replace(/^\d{4}-/, '')}
                    </td>
                    <td className="py-3.5 px-4 truncate">
                      <span className={`px-2 py-0.5 border rounded-lg text-[11px] font-black tracking-wide leading-0 whitespace-nowrap ${getCategoryBadge(log.category)}`}>
                        {log.moduleName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-black text-white truncate" title={log.operator}>
                      {log.operator}
                    </td>
                    <td className="py-3.5 px-4 text-xs">
                      <p className="font-extrabold text-white text-[13px] leading-tight group-hover:text-[#cfbcff] transition-colors truncate" title={log.action}>
                        {log.action}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-[9.5px] uppercase font-black tracking-wider rounded-md inline-flex items-center justify-center min-w-[72px] leading-none ${getSeverityBadge(log.severity)}`}>
                        {log.severity}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 2. Responsive Cards layout stack (visible only on screen < lg) */}
        <div className="block lg:hidden divide-y divide-white/5">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white/2 rounded-2xl border border-white/5 flex items-center justify-center text-[#cbc4d2]/30 animate-pulse">
                  <Database className="w-6 h-6" />
                </div>
                <p className="text-[#cbc4d2]/40 text-xs font-semibold">没有检索到任何符合条件的联盟审计日志记录</p>
              </div>
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div 
                key={log.id}
                onClick={() => setActiveDetailLog(log)}
                className="p-4 sm:p-5 hover:bg-white/[0.02] cursor-pointer transition-colors flex flex-col gap-3 group active:bg-white/[0.04]"
              >
                {/* ID badge and Categories Header Row */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-[#cfbcff] lg:group-hover:underline">
                      {log.id}
                    </span>
                    <span className="h-3 w-px bg-white/10" />
                    <span className="text-[10px] text-[#cbc4d2]/45 font-mono">{log.timestamp.replace(/^\d{4}-/, '')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`px-1.5 py-0.5 border rounded text-[9px] font-black tracking-wide leading-none whitespace-nowrap ${getCategoryBadge(log.category)}`}>
                      {log.moduleName}
                    </span>
                    <span className={`px-1.5 py-0.5 text-[8.5px] uppercase font-black tracking-wider rounded inline-flex leading-none ${getSeverityBadge(log.severity)}`}>
                      {log.severity}
                    </span>
                  </div>
                </div>

                {/* Brief description column */}
                <div className="space-y-1 text-left">
                  <h4 className="font-extrabold text-white text-[13px] sm:text-sm group-hover:text-[#cfbcff] transition-colors leading-snug truncate">
                    {log.action}
                  </h4>
                </div>

                {/* Footer specs metadata */}
                <div className="flex items-center justify-between text-[10.5px] text-[#cbc4d2]/40 font-semibold border-t border-white/5 pt-2 mt-0.5 flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white/45">Operator:</span>
                    <span className="text-[#cfbcff] font-bold font-mono truncate max-w-[150px] sm:max-w-none">{log.operator}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Statistics bottom footer */}
        <div className="p-4 bg-[#201b2a]/20 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#cbc4d2]/40 select-none">
          <div className="font-semibold text-center sm:text-left">
            展示 {filteredLogs.length} 条过滤审计项 （当前数据库池驻留：{logs.length} 个事件）
          </div>
          <div className="font-mono text-[10px]">
            Node Signature: SECURE_WAF_LOGGER_V3B
          </div>
        </div>
      </div>

      {/* Audit Detail Inspector Drawer / Modal */}
      {activeDetailLog && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          {/* Backdrop screen filter lock */}
          <div 
            onClick={() => setActiveDetailLog(null)}
            className="absolute inset-0 bg-black/75 backdrop-blur-md transition-all"
          />
          
          {/* Modal dialog core card content with adaptive heights and custom scrollbars */}
          <div className="bg-[#120f18] rounded-3xl border border-[#cfbcff]/20 max-w-xl w-full p-5 sm:p-7 relative shadow-2xl overflow-hidden animate-scaleUp z-10 flex flex-col gap-4 max-h-[92vh]">
            
            {/* Header: Log Identification Title and Close lock */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#cfbcff]/10 border border-[#cfbcff]/20 flex items-center justify-center text-[#cfbcff]">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight uppercase">
                    审计底册深度透视
                  </h3>
                  <p className="text-[10px] font-mono text-[#cfbcff]/60 font-bold tracking-widest mt-0.5">
                    ID: {activeDetailLog.id}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveDetailLog(null)}
                className="p-1.5 bg-white/5 hover:bg-white/10 transition-colors text-[#cbc4d2] hover:text-white rounded-lg cursor-pointer outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable central content wrapper */}
            <div className="flex-grow overflow-y-auto space-y-4 pr-1.5 custom-scrollbar pb-1 text-left">
              {/* Structured Specifications Matrix */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">事件时间戳</span>
                  <span className="font-mono text-white tracking-tight block break-all">{activeDetailLog.timestamp}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">审计级别 / Severity</span>
                  <span className="block mt-0.5">
                    <span className={`px-2 py-0.5 text-[9.5px] uppercase font-black tracking-wider rounded-md leading-none ${getSeverityBadge(activeDetailLog.severity)}`}>
                      {activeDetailLog.severity}
                    </span>
                  </span>
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">操作触发人 (Operator)</span>
                  <span className="font-black text-white tracking-tight block truncate max-w-full" title={activeDetailLog.operator}>
                    {activeDetailLog.operator}
                  </span>
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">发起端 IP 签名</span>
                  <span className="font-mono text-white tracking-tight block">{activeDetailLog.ipAddress}</span>
                </div>
              </div>

              {/* Narrative text fields */}
              <div className="space-y-1">
                <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">操作基本事项</span>
                <p className="text-sm font-black text-white leading-tight">
                  {activeDetailLog.action}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">透视事件详细叙述 (Details)</span>
                <p className="text-xs sm:text-[13px] text-[#cbc4d2]/85 leading-relaxed font-semibold whitespace-pre-wrap break-all">
                  {activeDetailLog.details}
                </p>
              </div>

              {/* Code Block Container for Event Payload Packet */}
              {activeDetailLog.payload && (
                <div className="space-y-1.5 animate-fadeIn">
                  <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">底层节点 JSON 加密报文主体</span>
                  <div className="bg-[#0b080f] rounded-xl border border-white/5 p-3.5 font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-44 custom-scrollbar relative leading-relaxed tab-size-2">
                    <pre className="whitespace-pre text-left">{activeDetailLog.payload}</pre>
                    <span className="absolute top-2 right-2 text-[9px] font-bold text-white/20 select-none">SECURE_BLOCK_DATA</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer triggers */}
            <div className="flex gap-3 justify-end pt-3 border-t border-white/5 mt-0.5 shrink-0 select-none">
              <button
                type="button"
                onClick={() => setActiveDetailLog(null)}
                className="px-5 py-2 bg-[#cfbcff] text-[#24134c] hover:bg-[#ebdfff] active:scale-95 transition-all text-xs font-extrabold rounded-xl cursor-pointer"
              >
                我知道了
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

