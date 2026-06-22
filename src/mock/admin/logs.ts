import type { AdminLog } from '../../features/admin/logs/types';

const ADMIN_LOG_SEEDS: AdminLog[] = [
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

export const getInitialAdminLogs = (): AdminLog[] => (
  ADMIN_LOG_SEEDS.map((log) => ({ ...log }))
);
