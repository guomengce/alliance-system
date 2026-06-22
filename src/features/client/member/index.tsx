import PageView from '../../../shared/components/PageView';
import CreditPool from './components/CreditPool';
import KycCard from './components/KycCard';
import ProfileCard from './components/ProfileCard';
import TeamOverview from './components/TeamOverview';
import { useMemberProfile } from './hooks/useMemberProfile';
import type { MemberViewProps } from './types';
import { RECENT_ACTIVITIES } from './utils';

export default function MemberView({
  uid,
  nickname,
  joinDate,
  onUpdateNickname,
  onRaiseCredit,
  remainingCredit,
  totalCredit,
}: MemberViewProps) {
  const {
    isEditing,
    tempNickname,
    setTempNickname,
    toggleEdit
  } = useMemberProfile({ nickname, uid, onUpdateNickname });

  return (
    <PageView>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card */}
        <ProfileCard
          uid={uid}
          nickname={nickname}
          joinDate={joinDate}
          isEditing={isEditing}
          tempNickname={tempNickname}
          setTempNickname={setTempNickname}
          onToggleEdit={toggleEdit}
        />

        {/* KYC Card */}
        <KycCard />
      </div>

      {/* Team Overview and Commission Pool */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Team Overview section */}
        <TeamOverview recentActivities={RECENT_ACTIVITIES} />

        {/* Commission Pool (Visual Ring) */}
        <CreditPool
          remainingCredit={remainingCredit}
          totalCredit={totalCredit}
          onRaiseCredit={onRaiseCredit}
        />
      </div>

    </PageView>
  );
}
