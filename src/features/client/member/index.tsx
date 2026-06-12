import { useState } from 'react';
import PageView from '../../../components/PageView';
import CreditPool from './components/CreditPool';
import KycCard from './components/KycCard';
import ProfileCard from './components/ProfileCard';
import TeamOverview from './components/TeamOverview';
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
  const [isEditing, setIsEditing] = useState(false);
  const [tempNickname, setTempNickname] = useState(nickname);
  const [copiedLink, setCopiedLink] = useState(false);

  const kycL1 = 'verified';
  const kycL2 = 'pending';

  const toggleEdit = () => {
    if (isEditing) {
      if (tempNickname.trim()) {
        onUpdateNickname(tempNickname);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleCopyLink = () => {
    setCopiedLink(true);
    navigator.clipboard?.writeText(`https://alliance.institutional/join?ref=${uid}`);
    setTimeout(() => setCopiedLink(false), 2000);
  };

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
