import { Button, Input, Select } from 'antd';
import { Filter, Search } from 'lucide-react';

import type { WorkspaceProps } from '../types';

type FiltersPanelProps = Pick<
  WorkspaceProps,
  | 'searchQuery'
  | 'setSearchQuery'
  | 'selectedSeverity'
  | 'setSelectedSeverity'
  | 'selectedCategory'
  | 'setSelectedCategory'
>;

const TEXT = {
  searchPlaceholder: '\u641c\u7d22\u64cd\u4f5c\u8be6\u60c5\u3001\u7ba1\u7406\u5458/\u7cfb\u7edf\u3001IP\u5730\u5740\u3001\u6a21\u5757\u540d\u79f0\u3001LOG\u6d41\u6c34\u53f7',
  level: '\u7b49\u7ea7:',
  category: '\u7c7b\u522b:',
  all: '\u5168\u90e8',
  allSeverity: '\u5168\u90e8\u7b49\u7ea7 (All)',
  allCategory: '\u5168\u90e8\u7c7b\u522b',
  security: '\u5b89\u5168\u4e0e\u9632\u62a4',
  finance: '\u8d22\u52a1\u51fa\u8d26',
  operation: '\u8fd0\u8425\u4e8b\u52a1',
  system: '\u6838\u5fc3\u7cfb\u7edf',
};

const severityOptions = [
  { value: 'All', label: TEXT.all },
  { value: 'info', label: 'info' },
  { value: 'warn', label: 'warn' },
  { value: 'error', label: 'error' },
  { value: 'critical', label: 'critical' },
];

const mobileSeverityOptions = [
  { value: 'All', label: TEXT.allSeverity },
  { value: 'info', label: 'Info (\u4fe1\u606f)' },
  { value: 'warn', label: 'Warn (\u8b66\u544a)' },
  { value: 'error', label: 'Error (\u9519\u8bef)' },
  { value: 'critical', label: 'Critical (\u6838\u5fc3\u62e6\u622a)' },
];

const categoryOptions = [
  { value: 'All', label: TEXT.allCategory },
  { value: 'security', label: TEXT.security },
  { value: 'finance', label: TEXT.finance },
  { value: 'operation', label: TEXT.operation },
  { value: 'system', label: TEXT.system },
];

export default function AntdFiltersPanel({
  searchQuery,
  setSearchQuery,
  selectedSeverity,
  setSelectedSeverity,
  selectedCategory,
  setSelectedCategory
}: FiltersPanelProps) {
  return (
    <div className="alliance-antd-logs-filter-panel">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative group flex-grow">
          <Input
            className="alliance-antd-logs-search"
            placeholder={TEXT.searchPlaceholder}
            prefix={<Search className="w-4 h-4 text-[#cbc4d2] opacity-60 group-focus-within:text-[#cfbcff] transition-colors" />}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap w-full md:w-auto justify-start md:justify-end">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-xs text-[#cbc4d2]/50 font-bold uppercase tracking-wider inline-flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3 text-[#cfbcff]" />
              {TEXT.level}
            </span>
            <div className="hidden sm:flex bg-[#201b2a] rounded-xl p-0.5 border border-white/5 shrink-0">
              {severityOptions.map((option) => (
                <Button
                  key={option.value}
                  className={`alliance-antd-logs-filter-button ${selectedSeverity === option.value ? 'is-active' : ''}`}
                  onClick={() => setSelectedSeverity(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>

            <div className="block sm:hidden flex-1">
              <Select
                className="alliance-antd-logs-select w-full"
                dropdownClassName="alliance-antd-admin-select-dropdown"
                options={mobileSeverityOptions}
                value={selectedSeverity}
                onChange={setSelectedSeverity}
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <span className="text-xs text-[#cbc4d2]/50 font-bold uppercase tracking-wider inline-flex items-center gap-1 shrink-0">
              {TEXT.category}
            </span>
            <Select
              className="alliance-antd-logs-select w-full sm:w-auto"
              dropdownClassName="alliance-antd-admin-select-dropdown"
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
