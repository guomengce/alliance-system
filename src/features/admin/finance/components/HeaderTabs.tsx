import type { Dispatch, SetStateAction } from 'react';
import { Wallet } from 'lucide-react';
import type { FinanceTab } from '../types';

interface HeaderTabsProps {
  activeTab: FinanceTab;
  setActiveTab: Dispatch<SetStateAction<FinanceTab>>;
}

export default function HeaderTabs({ activeTab, setActiveTab }: HeaderTabsProps) {
  return (
    <>
      {/* Top operational brief info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
            <Wallet className="w-4 h-4 text-[#cfbcff]" />
            <span>财务列表</span>
          </h3>
          <p className="text-[13px] text-[#cbc4d2]/50 mt-0.5 leading-tight">
            浏览与审计平台公司财务大库、会员个人钱包余额以及各项出金审批。
          </p>
        </div>
      </div>

      {/* Tabs Menu Selection */}
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none border-b border-white/5 pb-1 gap-5 md:gap-6 text-xs font-bold font-sans">
        <button
          type="button"
          onClick={() => setActiveTab('reserves')}
          className={`pb-2.5 border-b-2 hover:text-[#cfbcff] transition-all cursor-pointer shrink-0 ${activeTab === 'reserves' ? 'text-[#cfbcff] border-[#cfbcff]' : 'text-[#cbc4d2]/40 border-transparent'}`}
        >
          公司大库 & 出金审批
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('wallets')}
          className={`pb-2.5 border-b-2 hover:text-[#cfbcff] transition-all cursor-pointer shrink-0 ${activeTab === 'wallets' ? 'text-[#cfbcff] border-[#cfbcff]' : 'text-[#cbc4d2]/40 border-transparent'}`}
        >
          会员个人钱包存余普查
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ledger')}
          className={`pb-2.5 border-b-2 hover:text-[#cfbcff] transition-all cursor-pointer shrink-0 ${activeTab === 'ledger' ? 'text-[#cfbcff] border-[#cfbcff]' : 'text-[#cbc4d2]/40 border-transparent'}`}
        >
          完整收支对账流水账谱
        </button>
      </div>
    </>
  );
}
