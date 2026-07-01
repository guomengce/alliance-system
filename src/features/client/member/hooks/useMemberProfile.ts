import { useEffect, useState } from 'react';
import {
  getClientMemberProfile,
  updateClientMemberProfile
} from '../../../../api/client/member';
import type { RecentActivity } from '../types';

type UseMemberProfileOptions = {
  nickname: string;
  uid: string;
  onUpdateNickname: (nickname: string) => void;
};

export function useMemberProfile({
  nickname,
  uid,
  onUpdateNickname
}: UseMemberProfileOptions) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempNickname, setTempNickname] = useState(nickname);
  const [copiedLink, setCopiedLink] = useState(false);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);

  useEffect(() => {
    let mounted = true;

    getClientMemberProfile().then((profile) => {
      if (!mounted) return;
      setRecentActivities(profile.recentActivities);
      setTempNickname(profile.nickname);
      onUpdateNickname(profile.nickname);
    });

    return () => {
      mounted = false;
    };
  }, [onUpdateNickname]);

  const kycL1 = 'verified';
  const kycL2 = 'pending';

  const toggleEdit = async () => {
    if (isEditing) {
      if (tempNickname.trim()) {
        const profile = await updateClientMemberProfile({ nickname: tempNickname });
        onUpdateNickname(profile.nickname);
        setRecentActivities(profile.recentActivities);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleCopyLink = () => {
    setCopiedLink(true);
    navigator.clipboard?.writeText(`https://alliance.institutional/join?ref=${uid}`);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return {
    copiedLink,
    handleCopyLink,
    isEditing,
    kycL1,
    kycL2,
    recentActivities,
    tempNickname,
    setTempNickname,
    toggleEdit
  };
}
