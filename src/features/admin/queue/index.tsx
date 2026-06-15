import { DetailsView } from './detail';
import { RosterView } from './list';
import { useQueueState } from './hooks/useQueueState';
import type { QueueRoster } from './types';
import { createCalibrationTrigger } from './utils';

export default function AdminQueueView() {
  const {
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
    setLockedRoster,
    setSearchQuery,
    setSelectedRoster
  } = useQueueState();

  const handleOpenDetails = (roster: QueueRoster) => {
    setSelectedRoster(roster);
    setCalibOriginal(roster.original);
    setCalibCurrent(roster.current);
    setCalibUnlocked(roster.unlocked);
    setSearchQuery('');
    setIsEditingData(false);
  };

  // Submit calibration changes
  const handleSaveDataCalibration = () => {
    if (calibCurrent < 0 || calibUnlocked < 0 || calibOriginal < 0) {
      return alert('各项数值不能为负值！');
    }
    if (calibCurrent + calibUnlocked !== calibOriginal) {
      if (!confirm('【精算警告】\n「待排队解锁额度」与「已解锁额度」之和不等于「原始初始锁仓额」。此操作会导致财务账本出现非平摊亏空损差，是否仍要强制对账校准？')) {
        return;
      }
    }

    setLockedRoster(prev => prev.map(r => {
      if (r.uid === selectedRoster?.uid) {
        // Append a manual correction log item to trigger history
        const newTriggerLog = createCalibrationTrigger(calibUnlocked - r.unlocked);

        const updatedRoster = {
          ...r,
          original: calibOriginal,
          current: calibCurrent,
          unlocked: calibUnlocked,
          count: r.count + 1,
          triggerHistory: [newTriggerLog, ...r.triggerHistory]
        };

        // Instantly update selected roster to keep screen synchronized
        setSelectedRoster(updatedRoster);
        return updatedRoster;
      }
      return r;
    }));

    setIsEditingData(false);
    alert(`【人工数据对账校准成功】\n会员 UID: ${selectedRoster?.uid} 数据校对生效！\n仍锁仓已修正为 ${calibCurrent} USDT，已解锁修正为 ${calibUnlocked} USDT。`);
  };


  // RENDER DEDICATED INDEPENDENT DETAILS VIEW FOR THE SELECTED SUITE
  if (selectedRoster) {
    return (
      <DetailsView
        selectedRoster={selectedRoster}
        filteredHistory={filteredHistory}
        isEditingData={isEditingData}
        calibOriginal={calibOriginal}
        calibCurrent={calibCurrent}
        calibUnlocked={calibUnlocked}
        searchQuery={searchQuery}
        setIsEditingData={setIsEditingData}
        setCalibOriginal={setCalibOriginal}
        setCalibCurrent={setCalibCurrent}
        setCalibUnlocked={setCalibUnlocked}
        setSearchQuery={setSearchQuery}
        onBack={() => setSelectedRoster(null)}
        onSaveDataCalibration={handleSaveDataCalibration}
      />
    );
  }

  // PORTAL MAIN PAGE FOR ROSTER VIEW LISTING
  return <RosterView lockedRoster={lockedRoster} onOpenDetails={handleOpenDetails} />;
}
