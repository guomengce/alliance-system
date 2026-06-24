import { Button, Empty, Input } from 'antd';
import { Coins, X } from 'lucide-react';

import type { ActiveTab, ListProps } from '../types';
import AntdDesktopTable from './AntdDesktopTable';
import AntdMobileCard from './AntdMobileCard';

const LIST_TEXT = {
  title: '\u4f63\u91d1\u5217\u8868',
  description: '\u6d4f\u89c8\u4e0e\u68c0\u7d22\u4f1a\u5458\u4e94\u4ee3\u5206\u9500\u5206\u6210\u660e\u7ec6\uff0c\u5305\u62ec\u6b63\u5e38\u5e94\u7b54\u4e0e\u53d7\u963b\u62e6\u622a\u56de\u7b3c\u516c\u79ef\u5bf9\u8d26\u6761\u76ee\u3002',
  searchPlaceholder: '\u68c0\u7d22\u8fd4\u4f63\u53f7/\u8ba2\u5355\u53f7/\u4f1a\u5458UID/\u4ee3\u7406\u4eba\u6635\u79f0...',
  emptyTitle: '\u6682\u65e0\u7b26\u5408\u5f53\u524d\u8fc7\u6ee4\u6761\u4ef6\u7684\u4f63\u91d1\u5bf9\u8d26\u8bb0\u5f55',
  emptyHint: '\u60a8\u53ef\u4ee5\u5c1d\u8bd5\u6e05\u7a7a\u5173\u952e\u8bcd\u6216\u70b9\u51fb\u5176\u4ed6\u5206\u7c7b\u9009\u9879',
};

const TAB_OPTIONS: Array<{ key: ActiveTab; label: string; className: string }> = [
  { key: 'all', label: '\u5168\u90e8\u660e\u7ec6', className: 'is-all' },
  { key: 'credited', label: '\u5df2\u5165\u6c60\u5212\u8d26', className: 'is-credited' },
  { key: 'blocked', label: '\u989d\u5ea6\u6c60\u963b\u585e', className: 'is-blocked' },
  { key: 'intercepted', label: '\u53d7\u963b\u62e6\u622a\u56de\u7b3c', className: 'is-intercepted' },
];

export default function AntdList({
  filteredCommissions,
  commissionSearch,
  onCommissionSearchChange,
  onClearSearch,
  activeTab,
  onActiveTabChange,
  onSelectCommission,
}: ListProps) {
  return (
    <div className="lg:col-span-12 glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
            <Coins className="w-4 h-4 text-[#cfbcff]" />
            <span>{LIST_TEXT.title}</span>
          </h3>
          <p className="text-[11px] text-[#cbc4d2]/50 mt-0.5 leading-tight">{LIST_TEXT.description}</p>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        <Input
          className="alliance-antd-commission-search"
          value={commissionSearch}
          onChange={(event) => onCommissionSearchChange(event.target.value)}
          placeholder={LIST_TEXT.searchPlaceholder}
          suffix={
            commissionSearch ? (
              <button
                type="button"
                onClick={onClearSearch}
                className="text-[#cbc4d2]/40 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null
          }
        />

        <div className="flex flex-wrap items-center gap-2 select-none border-b border-white/5 pb-2">
          {TAB_OPTIONS.map((tab) => (
            <Button
              key={tab.key}
              className={`alliance-antd-commission-tab ${tab.className} ${activeTab === tab.key ? 'is-active' : ''}`}
              size="small"
              onClick={() => onActiveTabChange(tab.key)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {filteredCommissions.length === 0 ? (
        <div className="text-center py-12 bg-white/[0.01]/10 border border-white/5 rounded-2xl space-y-2 text-xs text-[#cbc4d2]/40 font-sans">
          <Empty
            className="alliance-antd-empty"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div className="space-y-2">
                <p>{LIST_TEXT.emptyTitle}</p>
                <span className="text-[10px]">{LIST_TEXT.emptyHint}</span>
              </div>
            }
          />
        </div>
      ) : (
        <>
          <div className="block md:hidden space-y-3">
            {filteredCommissions.map((p) => (
              <AntdMobileCard key={p.id} payout={p} onSelectCommission={onSelectCommission} />
            ))}
          </div>
          <AntdDesktopTable commissions={filteredCommissions} onSelectCommission={onSelectCommission} />
        </>
      )}
    </div>
  );
}
