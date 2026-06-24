import React from 'react';
import { DownlineMember, KycFilter } from '../types';
import Toolbar from './components/Toolbar';
import MobileCard from './components/MobileCard';
import AntdDesktopTable from './components/AntdDesktopTable';

interface ListProps {
  filteredDownlines: DownlineMember[];
  searchText: string;
  kycFilter: KycFilter;
  onSearchTextChange: (value: string) => void;
  onKycFilterChange: (value: KycFilter) => void;
  onStartEditing: (user: DownlineMember) => void;
  onKycAudit: (uid: string, accept: boolean) => void;
}

export default function List({
  filteredDownlines,
  searchText,
  kycFilter,
  onSearchTextChange,
  onKycFilterChange,
  onStartEditing,
  onKycAudit,
}: ListProps) {
  return (
    <div id="admin_users_view" className="glass-card p-4 md:p-5 rounded-2xl border border-white/5 bg-[#141119] space-y-4 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-3">
      <Toolbar
        searchText={searchText}
        kycFilter={kycFilter}
        onSearchTextChange={onSearchTextChange}
        onKycFilterChange={onKycFilterChange}
      />

      {/* Users list table - Full layout for desktop density */}
      <div className="space-y-4">
        {/* Mobile-first card list */}
        <div className="block md:hidden space-y-3">
          {filteredDownlines.map(user => (
            <MobileCard
              key={user.uid}
              user={user}
              onStartEditing={onStartEditing}
              onKycAudit={onKycAudit}
            />
          ))}
        </div>

        <AntdDesktopTable
          users={filteredDownlines}
          onStartEditing={onStartEditing}
          onKycAudit={onKycAudit}
        />

      </div>
    </div>
  );
}
