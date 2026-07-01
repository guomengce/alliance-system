export default function BrandHeader() {
  return (
    <div className="alliance-auth-brand flex flex-col items-center justify-center text-center space-y-2.5">
      <div className="alliance-auth-brand__title-row flex items-center gap-3">
        <div className="alliance-auth-brand__mark w-9 h-9 rounded-xl bg-gradient-to-br from-[#cfbcff] to-[#6750a4] flex items-center justify-center shadow-lg shadow-[#6750a4]/25 border border-white/10 shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] text-white">
            <line x1="12" y1="4" x2="12" y2="20" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="6.34" y1="6.34" x2="17.66" y2="17.66" />
            <line x1="6.34" y1="17.66" x2="17.66" y2="6.34" />
          </svg>
        </div>
        <h1 className="alliance-auth-brand__title text-xl md:text-2xl font-bold text-white tracking-wide uppercase font-sans">
          同盟系统 ALLIANCE SYSTEM
        </h1>
      </div>
      <p className="alliance-auth-brand__subtitle text-xs text-[#cbc4d2]/50 font-medium tracking-[0.25em] pl-1">
        机构级流动性管理平台
      </p>
    </div>
  );
}
