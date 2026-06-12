import { AlertTriangle, RefreshCcw } from 'lucide-react';
import type { TransferPanelProps } from '../types';

export default function TransferPanel({
  transferUserId,
  amountInput,
  onTransferUserIdChange,
  onAmountInputChange,
  usdtBalance
}: TransferPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-[9px] sm:text-[10px] text-[#cbc4d2] font-semibold uppercase tracking-widest text-[#cfbcff]">平台目标用户 ID (UID)</label>
        <input
          type="text"
          placeholder="请输入资金接收方的系统注册 UID, 示例: 5049382"
          value={transferUserId}
          onChange={(e) => onTransferUserIdChange(e.target.value)}
          required
          className="bg-[#141218] border border-white/10 text-white rounded-lg px-4 py-2.5 text-xs sm:text-sm focus:ring-1 focus:ring-[#cfbcff] outline-none"
        />
        <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/40">此属性为目标伙伴资产界面顶部的 8 位纯数字协议识别符</span>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[9px] sm:text-[10px] text-[#cbc4d2] font-semibold uppercase">划转数量 / Transfer Amount (USDT)</label>
        <div className="relative">
          <input
            type="number"
            placeholder="0.00"
            value={amountInput}
            onChange={(e) => onAmountInputChange(e.target.value)}
            required
            min="10"
            className="w-full bg-[#141218] border border-white/10 text-white rounded-lg px-4 py-2.5 text-xs sm:text-sm font-bold focus:ring-1 focus:ring-[#cfbcff] outline-none pr-16"
          />
          <button
            type="button"
            onClick={() => onAmountInputChange(usdtBalance.toString())}
            className="absolute right-3 top-2.5 sm:top-3 text-[9px] sm:text-[10px] font-black text-[#cfbcff] uppercase hover:underline cursor-pointer"
          >
            全部
          </button>
        </div>
        <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/50">您当前可用协议余额：{usdtBalance.toLocaleString('zh-CN')} USDT</span>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full md:w-auto bg-[#cfbcff] text-[#381e72] py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl font-bold hover:brightness-110 active:scale-[0.98] transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-black/35"
        >
          <RefreshCcw className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          <span>确认授权站内划转</span>
        </button>
      </div>

      <div className="bg-amber-500/5 rounded-2xl p-4 border border-amber-500/10 space-y-2 text-[#cbc4d2]/90">
        <div className="flex items-center gap-2 text-[#e7c365]">
          <AlertTriangle className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">站内极速划转须知 (Transfer Precautions)</span>
        </div>
        <ul className="list-disc pl-4 space-y-1.5 text-[10px] sm:text-[11px] font-medium leading-relaxed">
          <li>
            站内互转起拨限额：单笔仅限 <strong className="text-white">10 USDT</strong> 级以上交易允许通过结算。
          </li>
          <li>
            站内转移免手续：由于隶属协议内部极速信道，不加收任何网络广播传输费，实现秒级扣款 and 写入接收方钱包。
          </li>
          <li>
            由于此操作不经过链上二次漫游确认，划转提交直接在底层原子更新，因此<span className="text-rose-400 font-bold">一旦签字成交概不具备撤回、追讨或冲正的余地</span>。
          </li>
          <li>
            请务必与接收方多次核对 <strong className="text-white">系统 8 位 UID 识别号</strong>。转错 UID 损失需自行负单向责任。
          </li>
        </ul>
      </div>
    </div>
  );
}
