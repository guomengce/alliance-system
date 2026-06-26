import { ArrowLeft } from 'lucide-react';
import type { SummaryHeaderProps } from '../../types';

export function SummaryHeader({ editingUser, formNickname, formStatus, formTier, onBack }: SummaryHeaderProps) {
  return (
    <>
        {/* Back Link Breadcrumb Header */}
        <div className="flex items-center justify-between">
          <button 
            type="button"
            onClick={() => onBack()}
            className="flex items-center gap-2 text-xs font-bold text-[#cfbcff] hover:text-white transition-colors cursor-pointer outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回联盟正式注册代表名册</span>
          </button>

          <span className="text-xs text-[#cbc4d2]/40 font-bold font-mono">
            SECURE CLIENT OVERLAY CONTROL
          </span>
        </div>

        {/* Full-width header of selected user */}
        <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden bg-[#141119] border border-white/5">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#cfbcff]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center gap-6 w-full">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#6750a4] to-[#cfbcff] p-0.5 shrink-0 flex items-center justify-center font-extrabold text-white text-lg">
              {formNickname ? formNickname.charAt(0).toUpperCase() : 'U'}
            </div>

            <div className="space-y-2 flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
                <h1 className="text-lg md:text-xl font-extrabold text-white leading-tight">{formNickname || '未设置昵称'}</h1>
                <span className="bg-[#cfbcff]/10 text-[#cfbcff] text-xs font-black uppercase px-2 py-0.5 rounded border border-[#cfbcff]/20 w-fit mx-auto md:mx-0 tracking-wider">
                  {formTier || '特约合伙代表'}
                </span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-[#cbc4d2]">
                <div className="flex items-center gap-1 opacity-70">
                  <span className="font-semibold text-[#cfbcff] font-mono">UID:</span>
                  <span className="font-mono">{editingUser.uid}</span>
                </div>
                <div className="flex items-center gap-1 opacity-70">
                  <span className="font-semibold text-[#cfbcff] font-mono">状态:</span>
                  <span className={formStatus === 'normal' ? 'text-emerald-400' : 'text-amber-500'}>
                    {formStatus === 'normal' ? '正常活跃' : formStatus === 'frozen' ? '冻结受限' : '禁用封禁'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>


    </>
  );
}
