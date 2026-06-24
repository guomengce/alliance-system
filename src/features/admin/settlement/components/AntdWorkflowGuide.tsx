import { AntdCard } from '@/src/shared/antd/AntdCard';

const TEXT = {
  title: 'D+1 \u8f6c\u8d26\u65f6\u5e8f\u89c4\u5219\u53ca\u9632\u900f\u5e72\u9884 (Workflow Guide)',
  step1Title: '1. D+1 \u65e5\u5e38\u8f6e\u5faa\u5bf9\u8d26',
  step1Desc: '\u4ee5 24 \u70b9\u65e5\u5207\u3001\u6b21\u65e5 04:00 \u70b9\u8d77\u606f\u6d3e\u53d1\u3002\u5c06\u524d\u65e5\u201c\u5f85\u6838\u7b97\u4f63\u91d1\u201d\u6263\u9664\u6ea2\u6d41\u90e8\u5206\u62e8\u5165\u53ef\u7528\u4f59\u989d\u94b1\u5305\u3002',
  step2Title: '2. \u989d\u5ea6\u532e\u4e4f\u62e6\u622a (\u6ea2\u6d41)',
  step2Desc: '\u5f53\u9884\u671f\u6d3e\u53d1\u989d\u9ad8\u4e8e\u201c\u4ecd\u53ef\u7528\u989d\u5ea6\u201d\u65f6\uff0c\u8d85\u989d\u90e8\u5206\u81ea\u52a8\u5f3a\u884c\u5f52\u96c6\u7f5a\u6ca1\u81f3\u5e73\u53f0 Reserve \u5e93\u4e2d\u3002',
  step3Title: '3. \u624b\u52a8\u98ce\u63a7\u5e72\u9884',
  step3Desc: '\u652f\u6301\u7ba1\u7406\u5c42\u4e00\u952e\u4eba\u5de5\u8865\u53d1\u62e8\u4ed8\u3001\u4e0b\u53d1\u5c3e\u7aef\u90ae\u4ef6\u5e76\u8c03\u6574\u591a\u8282\u70b9\u5f02\u5e38\u6302\u8d26\u3002',
  auditTitle: '\u5927\u76d8\u7ed3\u7b97\u5b9e\u65f6\u5ba1\u8ba1 (AUDIT)',
  total: '\u6d89\u53ca\u9884\u62e8\u603b\u4f63\u91d1',
  clipped: '\u56e0\u6c60\u4e0d\u8db3\u603b\u62e6\u622a',
  note: '* \u94fe\u4e0a\u6e05\u7ed3\u7b97\u98ce\u63a7\u63d0\u793a\uff1a\u7cfb\u7edf\u6bcf\u65e5\u6839\u636e\u5f53\u524d\u8054\u76df\u5145\u503c\u91ca\u653e\u500d\u7387\u7cbe\u786e\u5bf9\u7b97\uff0c\u624b\u5de5\u8c03\u8d26\u66f4\u6b63\u4f1a\u5b58\u5165\u673a\u5bc6\u5ba1\u8ba1\u3002',
};

export default function AntdWorkflowGuide() {
  return (
    <AntdCard className="alliance-antd-settlement-guide-card">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-left animate-fadeIn">
        <div className="md:col-span-8 space-y-3">
          <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#cfbcff] font-sans border-b border-white/5 pb-2">
            {TEXT.title}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="relative pl-4 border-l border-white/10 space-y-1">
              <p className="font-extrabold text-white">{TEXT.step1Title}</p>
              <p className="text-[#cbc4d2]/60 text-[10px] leading-relaxed">{TEXT.step1Desc}</p>
            </div>

            <div className="relative pl-4 border-l border-white/10 space-y-1">
              <p className="font-extrabold text-[#e7c365]">{TEXT.step2Title}</p>
              <p className="text-[#cbc4d2]/60 text-[10px] leading-relaxed">{TEXT.step2Desc}</p>
            </div>

            <div className="relative pl-4 border-l border-white/10 space-y-1">
              <p className="font-extrabold text-emerald-400">{TEXT.step3Title}</p>
              <p className="text-[#cbc4d2]/60 text-[10px] leading-relaxed">{TEXT.step3Desc}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 bg-[#110e16]/60 p-4.5 border border-white/5 rounded-xl flex flex-col justify-between space-y-2">
          <div className="space-y-1.5">
            <p className="text-[10px] font-black uppercase text-[#cbc4d2]/40 tracking-wider">{TEXT.auditTitle}</p>
            <div className="flex justify-between items-center text-[11px] text-[#cbc4d2]/70 font-mono leading-none">
              <span>{TEXT.total}</span>
              <span className="font-black text-white">6,050 U</span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-[#cbc4d2]/70 font-mono leading-none">
              <span>{TEXT.clipped}</span>
              <span className="font-extrabold text-red-400">1,650 U</span>
            </div>
          </div>
          <p className="text-[9px] text-[#cbc4d2]/35 italic leading-tight">
            {TEXT.note}
          </p>
        </div>
      </div>
    </AntdCard>
  );
}
