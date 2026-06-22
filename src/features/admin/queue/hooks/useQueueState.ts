import { useState } from 'react';
import { getInitialAdminQueueRoster } from '../../../../api/admin/queue';
import type { QueueRoster } from '../types';
import { applyQueueCalibration, filterTriggerHistory } from '../utils';

export function useQueueState() {
  const [lockedRoster, setLockedRoster] = useState<QueueRoster[]>(() => getInitialAdminQueueRoster());
  const [selectedRoster, setSelectedRoster] = useState<QueueRoster | null>(null);
  const [calibCurrent, setCalibCurrent] = useState<number>(0);
  const [calibUnlocked, setCalibUnlocked] = useState<number>(0);
  const [calibOriginal, setCalibOriginal] = useState<number>(0);
  const [isEditingData, setIsEditingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredHistory = selectedRoster
    ? filterTriggerHistory(selectedRoster.triggerHistory, searchQuery)
    : [];

  const handleOpenDetails = (roster: QueueRoster) => {
    setSelectedRoster(roster);
    setCalibOriginal(roster.original);
    setCalibCurrent(roster.current);
    setCalibUnlocked(roster.unlocked);
    setSearchQuery('');
    setIsEditingData(false);
  };

  const handleBackToRoster = () => {
    setSelectedRoster(null);
  };

  const handleSaveDataCalibration = () => {
    if (calibCurrent < 0 || calibUnlocked < 0 || calibOriginal < 0) {
      return alert('各项数值不能为负数！');
    }
    if (calibCurrent + calibUnlocked !== calibOriginal) {
      const shouldContinue = confirm(
        '【精算警告】\n“待排队解锁额度”与“已解锁额度”之和不等于“原始初始锁仓额”。此操作会导致财务账本出现非平衡差额，是否仍要强制对账校准？'
      );

      if (!shouldContinue) return;
    }

    if (!selectedRoster) return;

    setLockedRoster(prev => {
      const result = applyQueueCalibration(prev, selectedRoster.uid, {
        original: calibOriginal,
        current: calibCurrent,
        unlocked: calibUnlocked
      });

      if (result.updatedRoster) {
        setSelectedRoster(result.updatedRoster);
      }

      return result.rosters;
    });

    setIsEditingData(false);
    alert(`【人工数据对账校准成功】\n会员 UID: ${selectedRoster.uid} 数据校对生效。\n仍锁仓已修正为 ${calibCurrent} USDT，已解锁修正为 ${calibUnlocked} USDT。`);
  };

  return {
    calibCurrent,
    calibOriginal,
    calibUnlocked,
    filteredHistory,
    isEditingData,
    lockedRoster,
    searchQuery,
    selectedRoster,
    setCalibCurrent,
    setCalibOriginal,
    setCalibUnlocked,
    setIsEditingData,
    setSearchQuery,
    handleBackToRoster,
    handleOpenDetails,
    handleSaveDataCalibration
  };
}
