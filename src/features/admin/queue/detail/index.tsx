import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  PenTool,
  Search,
  Sliders,
  X
} from 'lucide-react';
import type { DetailsViewProps } from '../types';

export function DetailsView({
  selectedRoster,
  filteredHistory,
  isEditingData,
  calibOriginal,
  calibCurrent,
  calibUnlocked,
  searchQuery,
  setIsEditingData,
  setCalibOriginal,
  setCalibCurrent,
  setCalibUnlocked,
  setSearchQuery,
  onBack,
  onSaveDataCalibration
}: DetailsViewProps) {
  return (
    <div id="queue_roster_detail_page" className="space-y-6 animate-fadeIn select-none font-sans flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">

      {/* Back header navigation bar */}
      <div className="glass-card p-4 rounded-2xl border border-white/5 bg-[#141119] flex flex-wrap justify-between items-center gap-4">
        <button
          onClick={onBack}
          className="bg-white/5 hover:bg-white/10 text-white font-extrabold text-xs py-2 px-3.5 rounded-xl border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#cbc4d2]" />
          <span>返回排队代表名册</span>
        </button>

        <div className="text-right">
          <span className="text-[9px] font-black uppercase text-[#cfbcff] px-2.5 py-1 bg-[#cfbcff]/10 rounded-full font-sans">
            排队出水穿透账册 (Trace Sheet)
          </span>
        </div>
      </div>

      {/* Master stats layout and manual overwrite form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">

        <div className="lg:col-span-8 glass-card p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4 text-left">
            <div>
              <h4 className="text-base font-black text-white">排队存证及直推触发细节审核簿</h4>
              <p className="text-xs text-[#cbc4d2]/40 font-mono mt-1">OWNER UID: {selectedRoster.uid} / Name: {selectedRoster.nickname}</p>
            </div>

            <button
              type="button"
              onClick={() => setIsEditingData(!isEditingData)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center gap-1 cursor-pointer border ${
                isEditingData
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-white/5 text-[#cbc4d2] border-white/10 hover:bg-white/10'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>{isEditingData ? '🔌 退出修正模式' : '🛠 启动数据人工修正'}</span>
            </button>
          </div>

          {/* Main view vs Calibration form */}
          {!isEditingData ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="bg-[#110e16] p-4 rounded-2xl border border-white/5 text-center space-y-1">
                <span className="text-[10px] text-[#cbc4d2]/40 font-sans block">原始锁仓基础本金</span>
                <span className="text-sm font-bold text-white leading-none">USDT {selectedRoster.original.toLocaleString()}</span>
              </div>
              <div className="bg-[#110e16] p-4 rounded-2xl border border-white/5 text-center space-y-1">
                <span className="text-[10px] text-amber-400 font-sans block">⚠️ 仍锁仓锁定排队中</span>
                <span className="text-sm font-black text-amber-400 leading-none">USDT {selectedRoster.current.toLocaleString()}</span>
              </div>
              <div className="bg-[#110e16] p-4 rounded-2xl border border-white/5 text-center space-y-1">
                <span className="text-[10px] text-emerald-400 font-sans block">✔ 已完成出水转投可用</span>
                <span className="text-sm font-black text-emerald-400 leading-none">USDT {selectedRoster.unlocked.toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <div className="bg-amber-500/[0.02] border border-amber-500/20 p-5 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-xs text-amber-300 pb-2 border-b border-white/5 font-sans">
                <AlertTriangle className="w-4 h-4 shrink-0 animate-bounce" />
                <p className="font-bold text-left">数据人工校对及硬改存证 (Manual Override Ledger)</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-left">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-[#cbc4d2]/50 font-sans font-bold uppercase">初始锁仓本金 (U)</label>
                  <input
                    type="number"
                    value={calibOriginal}
                    onChange={(e) => setCalibOriginal(Number(e.target.value) || 0)}
                    className="bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#cfbcff]/50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-amber-400 font-sans font-bold uppercase">仍排队锁定金 (U)</label>
                  <input
                    type="number"
                    value={calibCurrent}
                    onChange={(e) => setCalibCurrent(Number(e.target.value) || 0)}
                    className="bg-[#110e16] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-amber-300 placeholder-amber-400/30 focus:outline-none focus:border-[#cfbcff]/50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-emerald-500 font-sans font-bold uppercase">已解锁金额 (U)</label>
                  <input
                    type="number"
                    value={calibUnlocked}
                    onChange={(e) => setCalibUnlocked(Number(e.target.value) || 0)}
                    className="bg-[#110e16] border border-[#cfbcff]/20 rounded-xl px-3.5 py-2.5 text-xs text-emerald-400 placeholder-emerald-400/30 focus:outline-none focus:border-[#cfbcff]/50"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3.5 pt-2 text-xs font-sans">
                <button
                  type="button"
                  onClick={() => setIsEditingData(false)}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all cursor-pointer font-bold"
                >
                  取消修改
                </button>
                <button
                  type="button"
                  onClick={onSaveDataCalibration}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-300 hover:brightness-110 text-slate-900 rounded-xl transition-all cursor-pointer font-black flex items-center gap-1 shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>确认对账校准重写</span>
                </button>
              </div>
            </div>
          )}

          {/* Dynamic Search & Live Filter Trigger trace table */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
              <h5 className="text-[11px] font-black uppercase text-[#cfbcff] flex items-center gap-1.5 tracking-wider">
                <Activity className="w-3.5 h-3.5" />
                <span>直属下线购买套餐触发排队解锁日志记录 (Triggers List)</span>
              </h5>

              {/* SEARCH INPUT */}
              <div className="relative max-w-xs w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="w-3.5 h-3.5 text-[#cbc4d2]/40" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="输入UID、昵称、订单或触发ID查找..."
                  className="w-full bg-[#110e16] text-[#cbc4d2] text-xs placeholder-[#cbc4d2]/30 border border-white/5 focus:border-[#cfbcff]/50 rounded-xl pl-9 pr-3.5 py-2 focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#cbc4d2]/40 hover:text-white transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Desktop view: 5-column table */}
            <div className="hidden md:block border border-white/5 rounded-2xl overflow-hidden bg-[#120f1a]/50 text-xs">
              <div className="grid grid-cols-5 bg-white/3 py-2.5 px-3.5 text-[9px] font-black uppercase tracking-wider text-[#cbc4d2]/40 border-b border-white/5 text-left">
                <span>单号/对账标识</span>
                <span>一代直推下属</span>
                <span className="text-right">下直属认购总额</span>
                <span className="text-right text-emerald-400">核算释放 (10%)</span>
                <span className="text-right">交割时间轴</span>
              </div>

              <div className="divide-y divide-white/5 font-mono text-[11px] max-h-[300px] overflow-y-auto">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((trig, idx) => (
                    <div key={idx} className="grid grid-cols-5 py-3.5 px-3.5 items-center hover:bg-white/[0.01] text-left">
                      <div>
                        <p className="text-white font-bold">{trig.id}</p>
                        <p className="text-[8px] text-[#cbc4d2]/30 italic">{trig.orderId}</p>
                      </div>
                      <div>
                        <p className="text-white leading-none font-sans font-extrabold text-xs">{trig.downlineUid}</p>
                        <p className="text-[9px] text-[#cbc4d2]/40 font-sans truncate mt-1">{trig.downlineNickname}</p>
                      </div>
                      <span className="text-right text-[#cbc4d2]/70 font-semibold">USDT {trig.orderAmount.toLocaleString()}</span>
                      <span className="text-right text-emerald-400 font-black">+{trig.unlockedAmount.toLocaleString()} U</span>
                      <span className="text-[10px] text-[#cbc4d2]/45 font-mono text-right">{trig.time}</span>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-xs text-[#cbc4d2]/30 font-sans">
                    🛸 未检索到符合条件的解锁触发日志记录
                  </div>
                )}
              </div>
            </div>

            {/* Mobile view: Stacked details cards */}
            <div className="block md:hidden space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((trig, idx) => {
                  const isManual = trig.orderId === 'MANUAL-ADJUST' || trig.status === 'calibrated';
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border bg-white/[0.01] text-xs font-sans space-y-2.5 transition-all ${
                        isManual
                          ? 'border-amber-500/15 bg-amber-500/[0.01]'
                          : 'border-white/5 bg-white/[0.005]'
                      }`}
                    >
                      {/* Header Row */}
                      <div className="flex justify-between items-start gap-2 pb-2 border-b border-white/5">
                        <div>
                          <span className="text-[#cfbcff] font-extrabold text-[11px] font-mono block">
                            {trig.id}
                          </span>
                          <span className="text-[#cbc4d2]/35 text-[9px] font-mono block mt-0.5 leading-none">
                            {trig.time}
                          </span>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <span className="text-emerald-400 font-extrabold font-mono text-xs">
                            +{trig.unlockedAmount.toLocaleString()} USDT
                          </span>
                          {isManual && (
                            <span className="text-amber-400 text-[8px] bg-amber-400/10 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider mt-1 scale-95 origin-right">
                              🔧 对账校准
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Detail Fields in Grid */}
                      <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px] font-mono">
                        <div>
                          <span className="text-[#cbc4d2]/45 text-[9px] font-sans block leading-none mb-1">直推成员 UID</span>
                          <span className="text-white font-bold text-[11.5px] block">{trig.downlineUid}</span>
                        </div>
                        <div>
                          <span className="text-[#cbc4d2]/45 text-[9px] font-sans block leading-none mb-1">认购实付总额</span>
                          <span className="text-[#cbc4d2]/90 block text-[11px]">USDT {trig.orderAmount.toLocaleString()}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[#cbc4d2]/45 text-[9px] font-sans block leading-none mb-1">成员名称</span>
                          <span className="text-[#cbc4d2]/80 font-sans block truncate text-[11px]" title={trig.downlineNickname}>
                            {trig.downlineNickname}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[#cbc4d2]/45 text-[9px] font-sans block leading-none mb-1">关联对账流水单号</span>
                          <span className="text-white/40 block text-[10px] break-all select-all font-mono">
                            {trig.orderId}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs text-[#cbc4d2]/30 border border-white/5 rounded-2xl bg-[#120f1a]/30">
                  🛸 未检索到符合条件的解锁触发日志记录
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="lg:col-span-4 bg-[#1a1622] rounded-2xl p-5 border border-white/5 flex flex-col justify-between text-left h-fit space-y-6">
          <div className="space-y-4">
            <h4 className="text-xs font-black text-[#f1bf50] flex items-center gap-1.5 uppercase tracking-wider font-sans border-b border-white/5 pb-2">
              <Sliders className="w-4 h-4 text-[#f1bf50]" />
              <span>智能校对监控规范</span>
            </h4>
            <div className="text-xs text-[#cbc4d2]/70 space-y-4 leading-relaxed font-sans">
              <p>
                排队队列由<strong> 10% </strong>直推触发机制秒级交割。当您的下级成员认购成功，智能合约将立即执行出水动作，对冲并减免相应的排队待释放量。
              </p>
              <div className="p-3 bg-[#110e16] rounded-xl border border-white/5 space-y-2">
                <p className="font-extrabold text-white text-[10.5px]">📊 本单解锁实名对账式</p>
                <p className="text-[10px] leading-relaxed text-[#cbc4d2]/60">
                  若直辖一代玩家下单退款或由于财务特殊流转需要纠正，可进入修改模式手工修正，剩余锁仓与解锁额将在用户客户端无延迟刷新。
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#6750a4]/5 border border-[#6750a4]/10 rounded-xl text-xs text-[#cbc4d2] space-y-1.5 font-sans">
            <p className="font-bold text-[#cfbcff] flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-[#cfbcff]" />
              <span>结算风控提示</span>
            </p>
            <p className="text-[#cbc4d2]/75 leading-relaxed text-[11px]">
              所有的手工修正行为均会生成独特的 `TRIG-CAL` 校正对齐流水单号进行归档，多核账簿保持链上线下逻辑全一致。
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
