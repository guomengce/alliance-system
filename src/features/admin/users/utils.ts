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


export function filterTeamMembers(members: TeamMember[], searchText: string) {
  if (!searchText) return members;

  const query = searchText.toLowerCase();
  return members.filter((member) => (
    member.uid.includes(query) ||
    member.name.toLowerCase().includes(query) ||
    member.level.toLowerCase().includes(query)
  ));
}

