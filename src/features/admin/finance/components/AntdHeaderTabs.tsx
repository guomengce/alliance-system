import { Segmented } from 'antd';
import { Wallet } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

import type { FinanceTab } from '../types';

interface HeaderTabsProps {
  activeTab: FinanceTab;
  setActiveTab: Dispatch<SetStateAction<FinanceTab>>;
}

const TEXT = {
  title: '\u8d22\u52a1\u5217\u8868',
  desc: '\u6d4f\u89c8\u4e0e\u5ba1\u8ba1\u5e73\u53f0\u516c\u53f8\u8d22\u52a1\u5927\u5e93\u3001\u4f1a\u5458\u4e2a\u4eba\u94b1\u5305\u4f59\u989d\u4ee5\u53ca\u5404\u9879\u51fa\u91d1\u5ba1\u6279\u3002',
  reserves: '\u516c\u53f8\u5927\u5e93 & \u51fa\u91d1\u5ba1\u6279',
  wallets: '\u4f1a\u5458\u4e2a\u4eba\u94b1\u5305\u5b58\u4f59\u666e\u67e5',
  ledger: '\u5b8c\u6574\u6536\u652f\u5bf9\u8d26\u6d41\u6c34\u8d26\u7c3f',
};

const tabs: Array<{ value: FinanceTab; label: string }> = [
  { value: 'reserves', label: TEXT.reserves },
  { value: 'wallets', label: TEXT.wallets },
  { value: 'ledger', label: TEXT.ledger },
];

export default function AntdHeaderTabs({ activeTab, setActiveTab }: HeaderTabsProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
            <Wallet className="w-4 h-4 text-[#cfbcff]" />
            <span>{TEXT.title}</span>
          </h3>
          <p className="text-[13px] text-[#cbc4d2]/50 mt-0.5 leading-tight">
            {TEXT.desc}
          </p>
        </div>
      </div>

      <Segmented<FinanceTab>
        className="alliance-antd-admin-segmented-tabs alliance-antd-admin-finance-segmented"
        options={tabs}
        value={activeTab}
        onChange={setActiveTab}
      />
    </>
  );
}
