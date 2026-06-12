import type { Dispatch, SetStateAction } from 'react';
import type { DownlineMember } from '../../../types';

export interface TeamViewProps {
  downlines: DownlineMember[];
}

export interface PromoCardProps {
  copiedLink: boolean;
  onCopyInviteLink: () => void;
}

export interface NetworkGraphProps {
  downlines: DownlineMember[];
  levelFilter: string;
  viewMode: 'grid' | 'list';
  setLevelFilter: Dispatch<SetStateAction<string>>;
  setViewMode: Dispatch<SetStateAction<'grid' | 'list'>>;
}

export interface DownlineLedgerProps {
  downlines: DownlineMember[];
  searchQuery: string;
  exporting: boolean;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  onExportData: () => void;
}

export interface DownlineCardProps {
  key?: string;
  member: DownlineMember;
}

export interface DownlineMobileRowProps {
  key?: string;
  member: DownlineMember;
  index: number;
}
