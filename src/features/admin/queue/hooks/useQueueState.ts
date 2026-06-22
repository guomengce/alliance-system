import { useState } from 'react';
import { getInitialAdminQueueRoster } from '../../../../api/admin/queue';
import type { QueueRoster } from '../types';
import { filterTriggerHistory } from '../utils';

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
    setLockedRoster,
    setSearchQuery,
    setSelectedRoster
  };
}
