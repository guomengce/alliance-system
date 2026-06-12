import type { SupportCardProps } from '../types';

export default function SupportCard({ setSuccessMsg }: SupportCardProps) {
  return (
    <div className="bg-[#cfbcff]/5 border border-[#cfbcff]/20 rounded-2xl p-6 flex flex-col justify-between min-h-[190px]">
      <div>
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-extrabold text-white text-sm flex items-center gap-1.5 uppercase">
            <span className="text-[#cfbcff] text-base">💬</span> 专属在线客服支持
          </h4>
        </div>

        <p className="text-xs text-[#cbc4d2] opacity-80 leading-relaxed mb-4">
          如果您在佣金归集结算、划转或下线认购管理中有任何疑问，可随时通过安全信道连通我们的 7×24 在线客户经理。
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5">
        <a 
          href="https://t.me/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 py-2.5 rounded-xl bg-gradient-to-tr from-[#6750a4] to-[#cfbcff] text-[#110e16] font-black text-xs text-center flex items-center justify-center gap-1.5 hover:brightness-110 shadow-lg active:scale-95 transition-all"
        >
          <span>联系 Telegram 客服</span>
        </a>
        <button 
          onClick={() => {
            navigator.clipboard.writeText('TS-889425001');
            setSuccessMsg('已自动复制您的专属白金客户工单编号: TS-889425001');
          }}
          className="py-2.5 px-4 rounded-xl border border-white/10 hover:bg-white/5 text-[#cfbcff] font-bold text-xs active:scale-[0.98] transition-all"
        >
          复制客服工单
        </button>
      </div>
    </div>
  );
}
