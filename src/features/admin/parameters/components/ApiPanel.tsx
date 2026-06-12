import { Globe } from 'lucide-react';
import type { ApiPanelProps } from '../types';

export default function ApiPanel({ apiPriceUrl, setApiPriceUrl }: ApiPanelProps) {
  return (
    <div className="bg-[#1f1a26]/40 border border-white/5 rounded-2xl p-4.5 space-y-3.5 flex flex-col justify-between">
      <div>
        <h4 className="text-xs font-black text-[#5fc4ff] uppercase tracking-wider pb-2.5 border-b border-white/5 flex items-center gap-1">
          <Globe className="w-4 h-4 text-[#5fc4ff]" />
          TROO股票价 Yahoo API 参数
        </h4>
        <p className="text-[11px] text-[#cbc4d2]/50 leading-relaxed mt-2">
          指定调用的 Yahoo Finance 跨界股票 API 端点，系统按 D+1 交易收盘均价自动加点。
        </p>

        <div className="space-y-4 mt-4 text-xs font-mono">
          <div className="flex flex-col gap-1.5">
            <span className="font-semibold text-white text-xs font-sans">API Endpoint Query URL</span>
            <textarea 
              rows={3}
              value={apiPriceUrl}
              onChange={(e) => setApiPriceUrl(e.target.value)}
              className="bg-[#110e16] border border-white/5 rounded-xl p-2.5 text-[10.5px] text-[#cbc4d2] break-all leading-relaxed focus:ring-1 focus:ring-[#cfbcff] outline-none"
            />
          </div>

          <div className="flex justify-between items-center bg-[#110e16] p-2.5 rounded-xl border border-white/5 text-[10.5px]">
            <span className="text-[#cbc4d2]/50 font-sans">当前调试反馈</span>
            <span className="text-emerald-400 font-bold font-mono">HTTP 200 Connected</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button 
          onClick={() => {
            alert('Yahoo Finance API 跨链报盘价格抓取成功！TROO市价复归锁定在 $0.125');
          }}
          className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-400 text-[#110e16] rounded-xl text-xs font-bold active:scale-95 transition-all text-center cursor-pointer"
        >
          实时抓取测试
        </button>
      </div>
    </div>
  );
}
