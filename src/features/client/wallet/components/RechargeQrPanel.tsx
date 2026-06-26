import type { NetworkType } from '../types';

interface RechargeQrPanelProps {
  rechargeNetwork: NetworkType;
}

export default function RechargeQrPanel({ rechargeNetwork }: RechargeQrPanelProps) {
  return (
    <div className="flex flex-col items-center justify-center p-5 bg-[#14111a]/85 rounded-3xl border border-white/5 relative overflow-hidden group min-h-[220px] self-stretch select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207,188,255,0.06)_0%,transparent_75%)] pointer-events-none" />

      <div className="relative p-3.5 bg-white rounded-2xl shadow-xl shadow-black/50 overflow-hidden mb-4 border border-white/10 transition-transform duration-300 group-hover:scale-105">
        <svg className="w-32 h-32 text-[#110e16]" viewBox="0 0 29 29" fill="currentColor">
          <path d="M0 0h7v7H0zm1 1v5h5V1zm1 1h3v3H2z" />
          <path d="M22 0h7v7h-7zm1 1v5h5V1zm1 1h3v3H24z" />
          <path d="M0 22h7v7H0zm1 1v5h5v-5zm1 1h3v3H2z" />
          <path d="M22 22h5v5h-5zm1 1v3h3v-3z" />
          {rechargeNetwork === 'TRX' ? (
            <>
              <path d="M9 1h1v1H9zm2 0h2v1h-2zm3 0h1v2h-1zm2 0h2v1h-2zm3 0h1v1h-1zM9 3h2v1H9zm3 0h1v1h-1zm2 0h3v1h-3zm4 0h1v1h-1zM9 5h1v1H9zm2 0h1v1h-1zm3 0h2v1h-2zm3 0h2v1h-2zm1 0h1v1h-1z" />
              <path d="M1 9h2v1H1zm3 0h1v1H4zm3 0h1v1H7zm2 0h1v2H9zm2 0h3v1h-3zm4 0h1v1h-1zm2 0h2v1h-2zm3 0h1v2h-1zm2 0h1v1h-1zM1 11h1v1H1zm3 0h2v1H4zm3 0h1v1H7zm1 1h1v1H8zm3-1h1v1h-1zm3 0h2v1h-2zm5 0h1v1h-1zm2 0h2v1h-2z" />
              <path d="M10 13h1v1h-1zm2-1h1v2h-1zm4 1h3v1h-3zm4 0h1v1h-1zm2 0h3v1h-3zm3 0h1v1h-1zM1 15h3v1H1zm5 0h1v1H6zm4 0h1v2h-1zm2 0h2v1h-2zm3 0h2v1h-2zm5 0h1v1h-1zm2 0h2v1h-2zm2 0h2v1h-2z" />
              <path d="M9 17h1v1H9zm2 0h2v1h-2zm3 0h1v1h-1zm2 0h2v1h-2zm3 0h1v2h-1zm3-1h1v1h-1zm2 1h1v1h-1zM1 19h1v1H1zm3 0h2v1H4zm3 0h1v1H7zm2 0h3v1h-3zm4 0h1v1h-1zm3 0h2v1h-2zm4 0h3v1h-3z" />
            </>
          ) : (
            <>
              <path d="M9 2h1v1H9zm2 0h2v1h-2zm5 0h1v2h-1zm1 0h2v1h-2zm2 0h1v1h-1zM9 4h2v1H9zm3 0h1v1h-1zm2 0h3v1h-3zm4 0h1v1h-1zM9 6h1v1H9zm2 0h1v1h-1zm2 0h2v1h-2zm2 0h2v1h-2zm1 0h1v1h-1z" />
              <path d="M1 8h2v1H1zm3 0h1v1H4zm3 0h1v1H7zm2 0h1v2H9zm2 0h3v1h-3zm4 0h1v1h-1zm2 0h2v1h-2zm3 0h1v2h-1zm1 0h1v1h-1zM1 10h1v1H1zm3 0h2v1H4zm3 0h1v1H7zm1 1h1v1H8zm3-1h1v1h-1zm3 0h2v1h-2zm5 0h1v1h-1zm1 0h2v1h-2z" />
              <path d="M11 12h1v1h-1zm2-1h1v2h-1zm2 1h3v1h-3zm4 0h1v1h-1zm2 0h3v1h-3zm2 0h1v1h-1zM1 14h3v1H1zm5 0h1v1H6zm4 0h1v2h-1zm2 0h2v1h-2zm3 0h2v1h-2zm2 0h1v1h-1zm2 0h2v1h-2zm2 0h2v1h-2z" />
              <path d="M10 16h1v1h-1zm2 0h2v1h-2zm3 0h1v1H1zm1 0h2v1h-2zm3 0h1v2h-1zm1-1h1v1h-1zm2 1h1v1h-1zM1 18h1v1H1zm3 0h2v1H4zm3 0h1v1H7zm2 0h3v1h-3zm4 0h1v1h-1zm2 0h2v1h-2zm3 0h3v1h-3z" />
            </>
          )}
        </svg>
        <div className="absolute inset-0 border-2 border-[#cfbcff]/0 group-hover:border-[#cfbcff]/20 transition-all rounded-2xl" />
      </div>

      <span className="text-xs text-white/90 font-black tracking-widest text-center">
        数字二维码安全扫码
      </span>
      <span className="text-xs text-[#cfbcff] font-bold text-center mt-1.5 uppercase font-[#cfbcff]/10 px-2.5 py-0.5 rounded-full border border-[#cfbcff]/15">
        USDT - {rechargeNetwork} 专用
      </span>
    </div>
  );
}
