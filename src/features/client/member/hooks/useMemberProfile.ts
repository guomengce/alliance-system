import { useState } from 'react';

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

  return {
    copiedLink,
    handleCopyLink,
    isEditing,
    kycL1,
    kycL2,
    tempNickname,
    setTempNickname,
    toggleEdit
  };
}
