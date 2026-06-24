import type { DetailsViewProps } from '../types';
import { AntdCalibrationGuidePanel } from './components/AntdCalibrationGuidePanel';
import { AntdDetailHeader } from './components/AntdDetailHeader';
import { AntdDetailMainPanel } from './components/AntdDetailMainPanel';

export function AntdDetailsView({
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
  onSaveDataCalibration,
}: DetailsViewProps) {
  return (
    <div id="queue_roster_detail_page" className="space-y-6 animate-fadeIn select-none font-sans flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <AntdDetailHeader onBack={onBack} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
        <AntdDetailMainPanel
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

        <AntdCalibrationGuidePanel />
      </div>
    </div>
  );
}
