import {
  AdminUsersApiResponse,
  DownlineMember,
  KycFilter,
  KycL1Status,
  KycL2Status,
  TeamMember,
  UserAccountStatus
} from './types';

const formatAmountText = (value: number) => value.toFixed(2);

export function transformAdminUsersResponse(response: AdminUsersApiResponse) {
  return {
    downlines: response.users.map((user): DownlineMember => ({
      uid: user.uid,
      level: user.level,
      tier: user.tierName,
      registrationDate: user.registeredAt,
      nodeSize: user.team.nodeSize,
      volume: user.team.volume,
      avatarLetter: user.avatarLetter,
      invested: user.investedAmount,
      nickname: user.profile.nickname,
      email: user.profile.email,
      phone: user.profile.phone,
      sponsor: user.profile.sponsor,
      status: user.profile.status,
      usdtBalance: user.wallet.usdtBalance,
      frozenBalance: user.wallet.frozenBalance,
      trooBalance: user.wallet.trooBalance,
      pendingBalance: user.wallet.pendingBalance,
      kycL1: user.kyc.l1,
      kycL2: user.kyc.l2,
    })),
    teamMembers: response.teamMembers.map((member): TeamMember => ({
      uid: member.uid,
      name: member.name,
      level: member.level,
      nodes: `${member.nodes}人`,
      volume: formatAmountText(member.volume),
    })),
  };
}

export interface AdminUserFormValues {
  nickname: string;
  email: string;
  phone: string;
  sponsor: string;
  password: string;
  status: UserAccountStatus;
  registrationDate: string;
  tier: string;
  usdtBalance: number;
  frozenBalance: number;
  trooBalance: number;
  pendingBalance: number;
  nodeSize: number;
  volume: number;
  kycL1: KycL1Status;
  kycL2: KycL2Status;
}

export function filterAdminUsers(
  downlines: DownlineMember[],
  searchText: string,
  kycFilter: KycFilter
) {
  const normalizedSearch = searchText.trim().toLowerCase();

  return downlines
    .filter((member) => {
      if (!normalizedSearch) return true;

      return (
        member.uid.toLowerCase().includes(normalizedSearch) ||
        member.tier.toLowerCase().includes(normalizedSearch) ||
        Boolean(member.nickname?.toLowerCase().includes(normalizedSearch)) ||
        Boolean(member.email?.toLowerCase().includes(normalizedSearch)) ||
        Boolean(member.phone?.toLowerCase().includes(normalizedSearch))
      );
    })
    .filter((member) => {
      if (kycFilter === 'verified') {
        return member.kycL2 === 'verified' || member.tier.includes('认证');
      }
      if (kycFilter === 'pending') {
        return member.kycL2 === 'pending';
      }
      return true;
    });
}


export function filterTeamMembers(members: TeamMember[], searchText: string) {
  if (!searchText) return members;

  const query = searchText.toLowerCase();
  return members.filter((member) => (
    member.uid.includes(query) ||
    member.name.toLowerCase().includes(query) ||
    member.level.toLowerCase().includes(query)
  ));
}

export function applyKycAudit(
  downlines: DownlineMember[],
  uid: string,
  accept: boolean
): DownlineMember[] {
  return downlines.map((member) => {
    if (member.uid !== uid) return member;

    const kycL2: KycL2Status = accept ? 'verified' : 'unverified';

    return {
      ...member,
      tier: accept ? '已认证' : '标准账户',
      kycL2
    };
  });
}

export function inferUserKycL2(user: DownlineMember): KycL2Status {
  if (user.kycL2) return user.kycL2;
  if (user.tier.includes('认证') || user.tier.includes('已认证')) return 'verified';
  if (user.volume > 2000) return 'pending';
  return 'unverified';
}

export function getTierFromKycL2(kycL2: KycL2Status, fallbackTier: string) {
  if (kycL2 === 'verified') return '已认证';
  if (kycL2 === 'pending') return '待认证';
  if (kycL2 === 'unverified') return '标准账户';
  return fallbackTier;
}

export function buildUpdatedUserFromForm(
  user: DownlineMember,
  values: AdminUserFormValues
): DownlineMember {
  return {
    ...user,
    registrationDate: values.registrationDate,
    nodeSize: Number(values.nodeSize) || 0,
    volume: Number(values.volume) || 0,
    tier: getTierFromKycL2(values.kycL2, values.tier),
    nickname: values.nickname,
    email: values.email,
    phone: values.phone,
    sponsor: values.sponsor,
    status: values.status,
    usdtBalance: Number(values.usdtBalance) || 0,
    frozenBalance: Number(values.frozenBalance) || 0,
    trooBalance: Number(values.trooBalance) || 0,
    pendingBalance: Number(values.pendingBalance) || 0,
    password: values.password ? values.password : user.password,
    kycL1: values.kycL1,
    kycL2: values.kycL2
  };
}
