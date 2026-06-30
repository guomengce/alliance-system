import '../../shared/antd/queue-overrides.css';
import { AntdDetailsView } from './detail/AntdDetailsView';
import { useQueueState } from './hooks/useQueueState';
import { AntdRosterView } from './list/AntdRosterView';

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
    setSearchQuery,
    handleBackToRoster,
    handleOpenDetails,
    handleSaveDataCalibration
  } = useQueueState();

  if (selectedRoster) {
    return (
      <AntdDetailsView
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
        onBack={handleBackToRoster}
        onSaveDataCalibration={handleSaveDataCalibration}
      />
    );
  }

  return <AntdRosterView lockedRoster={lockedRoster} onOpenDetails={handleOpenDetails} />;
}
