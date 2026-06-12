import type { Dispatch, Key, SetStateAction } from 'react';

export interface QueueTrigger {
  id: string;
  time: string;
  downlineUid: string;         // L1 Downline who subscribed to trigger unlock
  downlineNickname: string;
  orderId: string;
  orderAmount: number;         // e.g. 5000 USDT
  unlockedAmount: number;     // 10% = 500 USDT
  status: 'success' | 'calibrated';
}

export interface QueueRoster {
  uid: string;
  nickname: string;
  original: number;            // Original locked deposit (USDT)
  current: number;             // Current locked deposit (USDT)
  unlocked: number;            // Current already unlocked (USDT)
  count: number;               // Trigger times
  triggerHistory: QueueTrigger[];
}

export interface MobileCardProps {
  key?: Key;
  roster: QueueRoster;
  onOpenDetails: (roster: QueueRoster) => void;
}

export interface DesktopTableProps {
  lockedRoster: QueueRoster[];
  onOpenDetails: (roster: QueueRoster) => void;
}

export interface RosterViewProps {
  lockedRoster: QueueRoster[];
  onOpenDetails: (roster: QueueRoster) => void;
}

export interface DetailsViewProps {
  selectedRoster: QueueRoster;
  filteredHistory: QueueTrigger[];
  isEditingData: boolean;
  calibOriginal: number;
  calibCurrent: number;
  calibUnlocked: number;
  searchQuery: string;
  setIsEditingData: Dispatch<SetStateAction<boolean>>;
  setCalibOriginal: Dispatch<SetStateAction<number>>;
  setCalibCurrent: Dispatch<SetStateAction<number>>;
  setCalibUnlocked: Dispatch<SetStateAction<number>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  onBack: () => void;
  onSaveDataCalibration: () => void;
}
