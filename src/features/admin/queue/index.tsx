import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Eye, 
  X, 
  PenTool, 
  AlertTriangle, 
  Activity, 
  Search, 
  ArrowLeft,
  CheckCircle2,
  Sliders,
  DollarSign,
  Lock
} from 'lucide-react';

interface QueueTrigger {
  id: string;
  time: string;
  downlineUid: string;         // L1 Downline who subscribed to trigger unlock
  downlineNickname: string;
  orderId: string;
  orderAmount: number;         // e.g. 5000 USDT
  unlockedAmount: number;     // 10% = 500 USDT
  status: 'success' | 'calibrated';
}

interface QueueRoster {
  uid: string;
  nickname: string;
  original: number;            // Original locked deposit (USDT)
  current: number;             // Current locked deposit (USDT)
  unlocked: number;            // Current already unlocked (USDT)
  count: number;               // Trigger times
  triggerHistory: QueueTrigger[];
}

export default function AdminQueueView() {
  const [lockedRoster, setLockedRoster] = useState<QueueRoster[]>([
    { 
      uid: '889421', 
      nickname: '飞跃极客 (Jack)',
      original: 10000, 
      current: 3100, 
      unlocked: 6900, 
      count: 3,
      triggerHistory: [
        { id: 'TRIG-1002', time: '2026-05-29 08:12:00', downlineUid: '889425', downlineNickname: '星空行者 (Amanda)', orderId: 'ORD-2026052901', orderAmount: 5000, unlockedAmount: 500, status: 'success' },
        { id: 'TRIG-1003', time: '2026-05-29 11:20:45', downlineUid: '890112', downlineNickname: '赛博信徒 (Sky)', orderId: 'ORD-2026052902', orderAmount: 10000, unlockedAmount: 1000, status: 'success' },
        { id: 'TRIG-1004', time: '2026-05-28 14:02:11', downlineUid: '891044', downlineNickname: '数字游民 (Dan)', orderId: 'ORD-2026052809', orderAmount: 30000, unlockedAmount: 3000, status: 'success' }
      ]
    },
    { 
      uid: '889425', 
      nickname: '星空行者 (Amanda)',
      original: 25000, 
      current: 12500, 
      unlocked: 12500, 
      count: 2,
      triggerHistory: [
        { id: 'TRIG-2011', time: '2026-05-28 10:05:00', downlineUid: '890112', downlineNickname: '赛博信徒 (Sky)', orderId: 'ORD-2026052712', orderAmount: 5000, unlockedAmount: 500, status: 'success' },
        { id: 'TRIG-2012', time: '2026-05-27 16:30:00', downlineUid: '892019', downlineNickname: '极光猎人 (Ray)', orderId: 'ORD-2026052511', orderAmount: 120000, unlockedAmount: 12000, status: 'success' }
      ]
    },
    { 
      uid: '890112', 
      nickname: '赛博信徒 (Sky)',
      original: 5000, 
      current: 1500, 
      unlocked: 3500, 
      count: 1,
      triggerHistory: [
        { id: 'TRIG-3001', time: '2026-05-29 09:14:22', downlineUid: '892019', downlineNickname: '极光猎人 (Ray)', orderId: 'ORD-2026052902', orderAmount: 35000, unlockedAmount: 3500, status: 'success' }
      ]
    }
  ]);

  const [selectedRoster, setSelectedRoster] = useState<QueueRoster | null>(null);

  // States for manual calibration form
  const [calibCurrent, setCalibCurrent] = useState<number>(0);
  const [calibUnlocked, setCalibUnlocked] = useState<number>(0);
  const [calibOriginal, setCalibOriginal] = useState<number>(0);
  const [isEditingData, setIsEditingData] = useState(false);

  // Search filter for unlock triggers records detail
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleOpenDetails = (roster: QueueRoster) => {
    setSelectedRoster(roster);
    setCalibOriginal(roster.original);
    setCalibCurrent(roster.current);
    setCalibUnlocked(roster.unlocked);
    setSearchQuery('');
    setIsEditingData(false);
  };

  // Submit calibration changes
  const handleSaveDataCalibration = () => {
    if (calibCurrent < 0 || calibUnlocked < 0 || calibOriginal < 0) {
      return alert('各项数值不能为负值！');
    }
    if (calibCurrent + calibUnlocked !== calibOriginal) {
      if (!confirm('【精算警告】\n「待排队解锁额度」与「已解锁额度」之和不等于「原始初始锁仓额」。此操作会导致财务账本出现非平摊亏空损差，是否仍要强制对账校准？')) {
        return;
      }
    }

    setLockedRoster(prev => prev.map(r => {
      if (r.uid === selectedRoster?.uid) {
        // Append a manual correction log item to trigger history
        const newTriggerLog: QueueTrigger = {
          id: `TRIG-CAL-${Math.floor(1000 + Math.random() * 9000)}`,
          time: new Date().toISOString().replace('T', ' ').substring(0, 19),
          downlineUid: 'ADMIN-SYS',
          downlineNickname: '系统管理员人工校正',
          orderId: 'MANUAL-ADJUST',
          orderAmount: 0,
          unlockedAmount: calibUnlocked - r.unlocked, // compute diff
          status: 'calibrated'
        };

        const updatedRoster = {
          ...r,
          original: calibOriginal,
          current: calibCurrent,
          unlocked: calibUnlocked,
          count: r.count + 1,
          triggerHistory: [newTriggerLog, ...r.triggerHistory]
        };

        // Instantly update selected roster to keep screen synchronized
        setSelectedRoster(updatedRoster);
        return updatedRoster;
      }
      return r;
    }));

    setIsEditingData(false);
    alert(`【人工数据对账校准成功】\n会员 UID: ${selectedRoster?.uid} 数据校对生效！\n仍锁仓已修正为 ${calibCurrent} USDT，已解锁修正为 ${calibUnlocked} USDT。`);
  };

  // Filter history based on local search input
  const filteredHistory = selectedRoster
    ? selectedRoster.triggerHistory.filter(trig => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return true;
        return (
          trig.id.toLowerCase().includes(query) ||
          trig.orderId.toLowerCase().includes(query) ||
          trig.downlineUid.toLowerCase().includes(query) ||
          trig.downlineNickname.toLowerCase().includes(query)
        );
      })
    : [];

  // RENDER DEDICATED INDEPENDENT DETAILS VIEW FOR THE SELECTED SUITE
  if (selectedRoster) {
    return (
      <div id="queue_roster_detail_page" className="space-y-6 animate-fadeIn select-none font-sans flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
        
        {/* Back header navigation bar */}
        <div className="glass-card p-4 rounded-2xl border border-white/5 bg-[#141119] flex flex-wrap justify-between items-center gap-4">
          <button
            onClick={() => setSelectedRoster(null)}
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
                    onClick={handleSaveDataCalibration}
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

  // PORTAL MAIN PAGE FOR ROSTER VIEW LISTING
  return (
    <div id="admin_queue_view" className="space-y-6 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 flex-grow flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-2 border-b border-white/5 text-left">
          <div>
            <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#cfbcff]" />
              <span>排队列表</span>
            </h3>
            <p className="text-[11px] text-[#cbc4d2]/50 mt-0.5 leading-tight">
              浏览与检索所有会员锁仓排队资金明细、直属下线认购解锁明细以及账额手动校正存证。
            </p>
          </div>
        </div>

        {/* Top-aligned Explanation Window (moved from right side to top of list module) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#1a1622]/40 p-5 rounded-2xl border border-white/5 text-left animate-fadeIn">
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#f1bf50] flex items-center gap-1.5 uppercase tracking-wider font-sans border-b border-white/5 pb-2">
              <ShieldCheck className="w-4 h-4 text-[#f1bf50]" />
              <span>排队与交割核心机制指南</span>
            </h4>
            <div className="text-xs text-[#cbc4d2]/70 space-y-2.5 leading-relaxed font-sans">
              <p className="font-extrabold text-white text-[11px]">💡 触发机制对算公式</p>
              <p className="leading-relaxed text-[11px]">
                当且仅当该上级会员的一代直推 (L1 下属) 划转认购理财套餐时，会立刻激发该条排队账单。
              </p>
              <div className="p-2 py-1.5 bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 rounded font-mono text-[10px] font-bold text-center w-full max-w-xs">
                解锁释放 USDT = L1 实付认购额 * 10%
              </div>
              <p className="text-[10px] text-[#cbc4d2]/40">同时，用户客户端将按解锁额的 <strong>10 倍</strong> 比例获得分配的 TROO 股权现货交让发放。</p>
            </div>
          </div>

          <div className="space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-black text-[#cfbcff] flex items-center gap-1.5 uppercase tracking-wider font-sans border-b border-white/5 pb-2">
                <Activity className="w-4 h-4 text-[#cfbcff]" />
                <span>智能校对账务监控</span>
              </h4>
              <p className="text-[#cbc4d2]/75 leading-relaxed text-[11px] font-sans mt-2">
                如果由于特殊业务调整退订，导致下线订单锁仓数据失衡，管理员可通过点击 “记录详情”，切换至纠偏编辑状态重写剩余排队金额。
              </p>
            </div>
            <div className="p-3 bg-[#cfbcff]/5 border border-[#cfbcff]/10 rounded-xl text-[10px] text-[#cbc4d2]/70 leading-normal font-sans">
              所有的手工修正行为均会生成独特的 `TRIG-CAL` 校正对齐流水单号进行归档，多核账簿保持链上线下逻辑全一致。
            </div>
          </div>
        </div>

        {/* List module covering full width */}
        <div className="text-left space-y-4 flex-grow">
          
          {/* Mobile-first card list */}
          <div className="block md:hidden space-y-3">
            {lockedRoster.map(r => (
              <div key={r.uid} className="bg-[#1d1925]/40 border border-white/5 p-4 rounded-2xl space-y-3 font-sans">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse animate-duration-1000"></div>
                    <div>
                      <p className="text-white leading-none font-bold text-xs">{r.uid}</p>
                      <p className="text-[10px] text-[#cbc4d2]/40 font-normal mt-1">{r.nickname}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-black text-white bg-white/5 px-2 py-0.5 rounded-full border border-white/10 font-mono">
                    {r.count} 次触发
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 text-[11px] border-t border-b border-white/5 py-2.5 font-mono text-center">
                  <div>
                    <span className="text-[#cbc4d2]/40 text-[9px] block font-sans text-left">初始锁定</span>
                    <p className="text-[#cbc4d2]/80 mt-0.5 text-left truncate">USDT {r.original.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">锁定余额</span>
                    <p className="text-amber-300 font-extrabold mt-0.5 truncate">USDT {r.current.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-[#cbc4d2]/40 text-[9px] block font-sans text-right">已释出</span>
                    <p className="text-emerald-400 font-extrabold mt-0.5 text-right truncate">USDT {r.unlocked.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => handleOpenDetails(r)}
                    className="bg-white/5 hover:bg-[#cfbcff]/15 text-[#cbc4d2] hover:text-[#cfbcff] px-3 py-1.5 rounded-xl font-bold font-sans active:scale-95 transition-all text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>查看记录详情</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop density table */}
          <div className="hidden md:block overflow-x-auto border border-white/5 bg-[#1d1925]/20 rounded-2xl p-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-[#cbc4d2]/50 font-black bg-white/[0.01]">
                  <th className="py-4 px-4">锁仓归属代表 UID</th>
                  <th className="py-4 px-4 text-right">初始总锁定 (U)</th>
                  <th className="py-4 px-4 text-amber-400 text-right">仍排队锁定金 (U)</th>
                  <th className="py-4 px-4 text-emerald-400 text-right">已自动解锁 (U)</th>
                  <th className="py-4 px-4 text-center">累计触发次数</th>
                  <th className="py-4 px-4 text-center">穿透详情记录</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {lockedRoster.map(r => (
                  <tr key={r.uid} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-sans font-bold text-white text-left">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                        <div>
                          <p className="text-white leading-none font-bold text-xs">{r.uid}</p>
                          <p className="text-[10px] text-[#cbc4d2]/40 font-normal mt-1">{r.nickname}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#cbc4d2]/80 text-right">USDT {r.original.toLocaleString()}</td>
                    <td className="py-4 px-4 font-extrabold text-amber-300 text-right">USDT {r.current.toLocaleString()}</td>
                    <td className="py-4 px-4 font-extrabold text-emerald-400 text-right">USDT {r.unlocked.toLocaleString()}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-[10px] font-black text-white bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                        {r.count} 次触发
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleOpenDetails(r)}
                        className="mx-auto bg-white/5 hover:bg-[#cfbcff]/15 text-[#cbc4d2] hover:text-[#cfbcff] px-3.5 py-1.5 rounded-xl font-bold font-sans active:scale-95 transition-all text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>记录详情</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

