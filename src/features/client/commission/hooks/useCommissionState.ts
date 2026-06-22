import { useState } from 'react';
import { getInitialClientCommissionData } from '../../../../mock/client/commission';
import type { HistoryFilter } from '../types';
import { filterCommissionHistory } from '../utils';

export function useCommissionState() {
  const [successMsg, setSuccessMsg] = useState('');
  const [activeFilter, setActiveFilter] = useState<HistoryFilter>('all');
  const { history } = getInitialClientCommissionData();

  const filteredHistory = filterCommissionHistory(history, activeFilter);

  return {
    activeFilter,
    filteredHistory,
    setActiveFilter,
    setSuccessMsg,
    successMsg
  };
}
