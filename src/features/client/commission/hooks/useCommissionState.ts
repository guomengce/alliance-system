import { useState } from 'react';
import type { HistoryFilter } from '../types';
import { COMMISSION_HISTORY, filterCommissionHistory } from '../utils';

export function useCommissionState() {
  const [successMsg, setSuccessMsg] = useState('');
  const [activeFilter, setActiveFilter] = useState<HistoryFilter>('all');

  const filteredHistory = filterCommissionHistory(COMMISSION_HISTORY, activeFilter);

  return {
    activeFilter,
    filteredHistory,
    setActiveFilter,
    setSuccessMsg,
    successMsg
  };
}
