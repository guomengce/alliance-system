import { DetailsView } from './detail';
import { useQueueState } from './hooks/useQueueState';
import { RosterView } from './list';

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
        onBack={handleBackToRoster}
        onSaveDataCalibration={handleSaveDataCalibration}
      />
    );
  }

  return <RosterView lockedRoster={lockedRoster} onOpenDetails={handleOpenDetails} />;
}
