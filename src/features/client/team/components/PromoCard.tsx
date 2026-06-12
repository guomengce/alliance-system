import { Share2 } from 'lucide-react';
import type { PromoCardProps } from '../types';

export default function PromoCard({
  copiedLink,
  onCopyInviteLink
}: PromoCardProps) {
  return (
    <section className="glass-card p-6 md:p-7 rounded-2xl relative overflow-hidden group border border-white/5 shadow-xl shadow-black/30">
      <div className="absolute top-0 right-0 p-5 z-10 text-white/50 hover:text-white transition-colors cursor-pointer" onClick={onCopyInviteLink}>
        <Share2 className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
      </div>
      
      <div>
        <h3 className="text-sm font-black text-[#cfbcff] uppercase tracking-wider flex items-center gap-2">
          推广中心
        </h3>
        <p className="text-xs text-[#cbc4d2]/60 mt-1">分享链接即可获得 10% 佣金收益</p>
        
        <p className="text-xs text-[#cbc4d2]/50 mt-3 md:max-w-4xl leading-relaxed">
          通过分享专属邀请码或分享链接，推荐好友成为代理团队成员。好友进行充值、代购或流动质押，您都将获得高额收益分成。推荐收益具有长久合法权益。
        </p>
      </div>

      {/* Input box to copy refer code */}
      <div className="mt-5 max-w-full md:max-w-2xl">
        <div className="flex items-center bg-[#17141f] border border-white/5 rounded-xl p-1 px-4 lg:w-4/5">
          <input 
            type="text" 
            readOnly 
            value="8898218-X" 
            className="bg-transparent border-none text-white text-xs font-mono select-all outline-none flex-1 truncate pr-2 h-9 py-2"
          />
          <button 
            onClick={onCopyInviteLink}
            disabled={copiedLink}
            className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              copiedLink 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-[#cfbcff] text-[#200e42] hover:bg-[#ebdfff] active:scale-95'
            }`}
          >
            {copiedLink ? '已复制' : '复制'}
          </button>
        </div>
      </div>
    </section>
  );
}
