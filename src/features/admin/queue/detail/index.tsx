import type { DetailsViewProps } from '../types';
import { CalibrationGuidePanel } from './components/CalibrationGuidePanel';
import { DetailHeader } from './components/DetailHeader';
import { DetailMainPanel } from './components/DetailMainPanel';

export function DetailsView({
  selectedRoster,
  filteredHistory,
  isEditingData,
  calibOriginal,
  calibCurrent,
  calibUnlocked,
  searchQuery,
  setIsEditingData,
  setCalibOriginal,
  setCalibCurrent,
  setCalibUnlocked,
  setSearchQuery,
  onBack,
  onSaveDataCalibration
}: DetailsViewProps) {
  return (
    <div id="queue_roster_detail_page" className="space-y-6 animate-fadeIn select-none font-sans flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">

      <DetailHeader onBack={onBack} />

      {/* Master stats layout and manual overwrite form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
        <DetailMainPanel
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
          onSaveDataCalibration={onSaveDataCalibration}
        />

        <CalibrationGuidePanel />
      </div>

    </div>
  );
}
