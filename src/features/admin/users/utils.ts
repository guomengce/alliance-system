import { DownlineMember, KycFilter, TeamMember } from './types';

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


export const TEAM_MEMBERS: TeamMember[] = [
  { uid: '891012', name: '特邀代表 (Alpha)', level: 'L1级 (直推)', nodes: '128人', volume: '12,450.00' },
  { uid: '891503', name: '卓越先锋 (Beta)', level: 'L2级 (间推)', nodes: '45人', volume: '48,900.00' },
  { uid: '892901', name: '资深顾问 (Gamma)', level: 'L3级 (分裂)', nodes: '6人', volume: '1,200.00' },
  { uid: '893452', name: '新晋合伙人 (Delta)', level: 'L1级 (直推)', nodes: '12人', volume: '3,500.00' },
  { uid: '894211', name: '金牌代理 (Epsilon)', level: 'L2级 (间推)', nodes: '89人', volume: '22,100.00' },
  { uid: '890888', name: '终极同盟 (Omega)', level: 'L3级 (分裂)', nodes: '342人', volume: '115,000.00' },
];

export function filterTeamMembers(members: TeamMember[], searchText: string) {
  if (!searchText) return members;

  const query = searchText.toLowerCase();
  return members.filter((member) => (
    member.uid.includes(query) ||
    member.name.toLowerCase().includes(query) ||
    member.level.toLowerCase().includes(query)
  ));
}

