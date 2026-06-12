import { Sliders, X } from 'lucide-react';
import type { EditorModalProps } from '../types';

export function EditorModal({
  editingPlan,
  formName,
  formPrice,
  formGiftRatio,
  formBuyRatio,
  formQueueRatio,
  formCommissionLimit,
  formDescription,
  setFormName,
  setFormPrice,
  setFormGiftRatio,
  setFormBuyRatio,
  setFormQueueRatio,
  setFormCommissionLimit,
  setFormDescription,
  onClose,
  onSaveOrUpdatePlan
}: EditorModalProps) {
  return (
    <div id="modal_overlay_plan" className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4 overflow-y-auto">
      <div className="bg-[#181421] border border-white/10 rounded-3xl max-w-lg w-full p-6 md:p-8 relative shadow-2xl shadow-black animate-slideUp space-y-6">

        {/* Absolute close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[#cbc4d2]/60 hover:text-white transition-colors cursor-pointer outline-none z-10"
          title="关闭"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Clean Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#cfbcff]/10 flex items-center justify-center border border-[#cfbcff]/20 shrink-0">
              <Sliders className="w-5 h-5 text-[#cfbcff]" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-black text-white">
                {editingPlan ? '修改理财套餐配置参数' : '创建配置全新流动性理财套餐'}
              </h4>
              <p className="text-[10px] text-[#cbc4d2]/40 font-mono mt-0.5">
                请仔细填写各项数值参数，确认提交后系统认购渠道将即时生效更新。
              </p>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="space-y-4 text-xs font-sans">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-[#cbc4d2]/70">套餐标识名称</label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="例如: 套餐 F (尊享至尊版)"
              className="w-full bg-[#110e16] border border-white/10 hover:border-[#cfbcff]/45 rounded-xl px-3.5 py-3 text-xs text-white placeholder-white/30 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-[#cbc4d2]/70">套餐功能描述/规则介绍</label>
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="请输入该理财套餐对会员展示的具体功能描述与收益/锁定解锁规则介绍..."
              rows={3}
              className="w-full bg-[#110e16] border border-white/10 hover:border-[#cfbcff]/45 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#cbc4d2]/30 focus:outline-none resize-none font-sans leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-[#cbc4d2]/70">认购基础理财额 (USDT)</label>
              <input
                type="number"
                value={formPrice}
                onChange={(e) => setFormPrice(Number(e.target.value) || 0)}
                className="w-full bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-white font-mono focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase text-[#cbc4d2]/70">佣金额度绝对数值 (USDT)</label>
              <input
                type="number"
                value={formCommissionLimit}
                onChange={(e) => setFormCommissionLimit(Number(e.target.value) || 0)}
                placeholder="写入佣金极限制数值"
                className="w-full bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-emerald-300 font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 space-y-3">
            <p className="text-[10px] font-black uppercase text-[#cfbcff] tracking-wider">TROO 股票赠送、买入及排队精算设置</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5 bg-[#110e16] p-2.5 rounded-xl border border-white/5">
                <label className="text-[9px] uppercase font-bold text-[#cbc4d2]/50">股票赠送加权</label>
                <select
                  value={formGiftRatio}
                  onChange={(e) => setFormGiftRatio(parseFloat(e.target.value))}
                  className="bg-transparent text-[#cfbcff] font-extrabold text-xs focus:outline-none cursor-pointer mt-1"
                >
                  <option value="1.0">1.00 (不赠送)</option>
                  <option value="1.05">1.05 (+5%)</option>
                  <option value="1.1">1.10 (+10%)</option>
                  <option value="1.15">1.15 (+15%)</option>
                  <option value="1.2">1.20 (+20%)</option>
                  <option value="1.25">1.25 (+25%)</option>
                  <option value="1.3">1.30 (+30%)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 bg-[#110e16] p-2.5 rounded-xl border border-white/5">
                <label className="text-[9px] uppercase font-bold text-[#cbc4d2]/50">股票买入比例 (%)</label>
                <input
                  type="number"
                  max="100"
                  min="0"
                  value={formBuyRatio}
                  onChange={(e) => {
                    const val = Math.min(100, Math.max(0, Number(e.target.value) || 0));
                    setFormBuyRatio(val);
                    setFormQueueRatio(100 - val); // Linkage to sum up to 100%
                  }}
                  className="bg-transparent text-amber-300 font-bold text-xs focus:outline-none mt-1 font-mono"
                />
              </div>

              <div className="flex flex-col gap-1.5 bg-[#110e16] p-2.5 rounded-xl border border-white/5">
                <label className="text-[9px] uppercase font-bold text-[#cbc4d2]/50">股票排队比例 (%)</label>
                <input
                  type="number"
                  max="100"
                  min="0"
                  value={formQueueRatio}
                  onChange={(e) => {
                    const val = Math.min(100, Math.max(0, Number(e.target.value) || 0));
                    setFormQueueRatio(val);
                    setFormBuyRatio(100 - val); // Linkage to sum up to 100%
                  }}
                  className="bg-transparent text-sky-300 font-bold text-xs focus:outline-none mt-1 font-mono"
                />
              </div>
            </div>
            <p className="text-[9px] text-[#cbc4d2]/30 italic leading-normal">
              * 联动精算提示：系统自动保障 [买入比例] 与 [排队比例] 两项权和等于 100% 满仓交割（当前已设定为 {formBuyRatio}% / {formQueueRatio}%）。
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-white/5 flex gap-3 text-xs">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-xs transition-all cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            onClick={onSaveOrUpdatePlan}
            className="flex-[2] py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 text-[#110e16] rounded-xl font-black text-xs transition-all cursor-pointer text-center"
          >
            {editingPlan ? '保存并更新配置' : '确认无误，对外创建发布'}
          </button>
        </div>

      </div>
    </div>
  );
}
