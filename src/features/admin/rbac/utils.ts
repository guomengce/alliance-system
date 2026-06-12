import type { AdminAccount, PermissionDefinition, RolePermission } from './types';

export const PERMISSION_INVENTORY: PermissionDefinition[] = [
  { code: 'USER_MANAGE', name: '用户档案管理', description: '查询、修改、冻结与解冻平台同盟普通用户的状态' },
  { code: 'PLAN_MANAGE', name: '套餐资产配置', description: '创建、设定、上架与下架流动性质押及TROO兑换套餐' },
  { code: 'ORDER_AUDIT', name: '订单风控审计', description: '审核订单到账、取消或驳回待处理的认购支付状态' },
  { code: 'COMMISSION_FINALIZE', name: '五代佣金核对', description: '查看和核销由特定交易激发的穿透式推广返佣配拨' },
  { code: 'QUEUE_CALIBRATE', name: '排队解锁纠偏', description: '手动对账和调整特定用户的锁仓持股排队可释放额度' },
  { code: 'FINANCE_SETTLE', name: '提币结算硬锁', description: '审核平台提币、出金划扣和修改会员个人钱包财务底册' },
  { code: 'SYSTEM_PARAM', name: '系统核心参数', description: '修改联盟分成率、锁仓释放阈值以及其他超级风控参数' },
  { code: 'RBAC_CONCLUDE', name: '安全权限管理', description: '管理后台管理员账号的添加、封禁和角色权限绑定修改' }
];

export const INITIAL_ROLES: RolePermission[] = [
  {
    roleName: '超级系统管理员',
    roleCode: 'SUPER_ADMIN',
    permissions: ['USER_MANAGE', 'PLAN_MANAGE', 'ORDER_AUDIT', 'COMMISSION_FINALIZE', 'QUEUE_CALIBRATE', 'FINANCE_SETTLE', 'SYSTEM_PARAM', 'RBAC_CONCLUDE']
  },
  {
    roleName: '财务核销总监',
    roleCode: 'FINANCE_DIR',
    permissions: ['COMMISSION_FINALIZE', 'FINANCE_SETTLE', 'ORDER_AUDIT']
  },
  {
    roleName: '风控制盲审计官',
    roleCode: 'RISK_OFFICER',
    permissions: ['ORDER_AUDIT', 'QUEUE_CALIBRATE']
  },
  {
    roleName: '一般运营专员',
    roleCode: 'OPERATOR',
    permissions: ['USER_MANAGE', 'PLAN_MANAGE']
  }
];

export const INITIAL_ADMIN_USERS: AdminAccount[] = [
  {
    id: 'ACC-001',
    username: 'admin_master',
    nickname: '联盟架构师 (Jack)',
    role: 'SUPER_ADMIN',
    email: 'jack@alliance.system',
    status: 'active',
    lastLoginTime: '2026-06-01 09:30:11',
    lastLoginIp: '162.254.204.18'
  },
  {
    id: 'ACC-002',
    username: 'finance_settler_01',
    nickname: '首席财务官 (Linda)',
    role: 'FINANCE_DIR',
    email: 'linda@alliance.system',
    status: 'active',
    lastLoginTime: '2026-06-01 08:15:22',
    lastLoginIp: '103.45.112.59'
  },
  {
    id: 'ACC-003',
    username: 'risk_auditor_alpha',
    nickname: '高级风控专员 (Garry)',
    role: 'RISK_OFFICER',
    email: 'garry@alliance.system',
    status: 'active',
    lastLoginTime: '2026-05-31 16:45:09',
    lastLoginIp: '198.51.100.22'
  },
  {
    id: 'ACC-004',
    username: 'temp_ops_tester',
    nickname: '临时运营试用 (Tester)',
    role: 'OPERATOR',
    email: 'test@alliance.system',
    status: 'suspended',
    lastLoginTime: '2026-05-20 11:02:44',
    lastLoginIp: '92.122.84.150'
  }
];

export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const normalizeRoleCode = (roleCode: string) => roleCode.toUpperCase().replace(/\s+/g, '_');

export const generatePassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*';
  let autoPwd = '';
  for (let i = 0; i < 15; i++) {
    autoPwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoPwd;
};
