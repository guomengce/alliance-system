import type { TabSelectorProps } from '../../types';

export function TabSelector({ activeTab, setActiveTab }: TabSelectorProps) {
  return (
    <>
        {/* Tab Selector Section */}
        <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none border-b border-white/5 pb-1 gap-5 md:gap-6 text-xs font-bold leading-none select-none">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`pb-2 border-b-2 hover:text-[#cfbcff] transition-all cursor-pointer shrink-0 ${activeTab === 'profile' ? 'text-[#cfbcff] border-[#cfbcff]' : 'text-[#cbc4d2]/40 border-transparent'}`}
          >
            基本资料 & 状态标定
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wallet')}
            className={`pb-2 border-b-2 hover:text-[#cfbcff] transition-all cursor-pointer shrink-0 ${activeTab === 'wallet' ? 'text-[#cfbcff] border-[#cfbcff]' : 'text-[#cbc4d2]/40 border-transparent'}`}
          >
            钱包资产核拨调整
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('team')}
            className={`pb-2 border-b-2 hover:text-[#cfbcff] transition-all cursor-pointer shrink-0 ${activeTab === 'team' ? 'text-[#cfbcff] border-[#cfbcff]' : 'text-[#cbc4d2]/40 border-transparent'}`}
          >
            直属下线团队节点 (裂变)
          </button>
        </div>


    </>
  );
}
