import React, { useState } from 'react';
import { Edit, Sliders, Plus, X, Coins, Percent, HelpCircle } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  giftRatio: number;        // 赠送比例 (e.g., 1.1 = +10% 赠送比例)
  buyRatio: number;         // TROO 股票买入比例 (e.g., 40%)
  queueRatio: number;       // 排队比例 (e.g., 60%)
  commissionLimit: number;  // 佣金额度 (具体数值, e.g., 5000 USDT)
  status: 'enabled' | 'disabled';
  description?: string;     // 套餐具体描述与规则
}

export default function AdminPlansView() {
  const [adminPlans, setAdminPlans] = useState<Plan[]>([
    { id: 'plan-a', name: '套餐 A (入门级)', price: 1000, giftRatio: 1.0, buyRatio: 30, queueRatio: 70, commissionLimit: 2000, status: 'enabled', description: '入门级流动性理财增益套餐，提供基础分销推荐提款容量与30% TROO代币活期配额。' },
    { id: 'plan-b', name: '套餐 B (中级)', price: 5000, giftRatio: 1.0, buyRatio: 40, queueRatio: 60, commissionLimit: 25000, status: 'enabled', description: '中等量级流动性认购，大幅解锁L1直推及下代联盟返佣额度配发。' },
    { id: 'plan-c', name: '套餐 C (热门标签)', price: 10000, giftRatio: 1.1, buyRatio: 40, queueRatio: 60, commissionLimit: 55000, status: 'enabled', description: '最具性价比热门主打档，额外加赠10% TROO股票配额，附赠首发优先买券分配权。' },
    { id: 'plan-d', name: '套餐 D (高级)', price: 30000, giftRatio: 1.2, buyRatio: 50, queueRatio: 50, commissionLimit: 180000, status: 'enabled', description: '高阶精英合伙人专项级别，股票配售比高至50%，提供超值十万级推荐额度封池释放。' },
    { id: 'plan-e', name: '套餐 E (旗舰级)', price: 50000, giftRatio: 1.3, buyRatio: 50, queueRatio: 50, commissionLimit: 350000, status: 'enabled', description: '平台首席旗舰级认购方案，加赠30%股票权重，全渠道排队解锁享受VIP最优先特权通道。' }
  ]);

  // Modal open controllers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  // Form parameters
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState<number>(1000);
  const [formGiftRatio, setFormGiftRatio] = useState<number>(1.0);
  const [formBuyRatio, setFormBuyRatio] = useState<number>(40);
  const [formQueueRatio, setFormQueueRatio] = useState<number>(60);
  const [formCommissionLimit, setFormCommissionLimit] = useState<number>(5000);
  const [formDescription, setFormDescription] = useState('');

  const handleOpenCreateModal = () => {
    setEditingPlan(null);
    setFormName('');
    setFormPrice(1000);
    setFormGiftRatio(1.0);
    setFormBuyRatio(40);
    setFormQueueRatio(60);
    setFormCommissionLimit(4000); // Defaults to a specific value
    setFormDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (plan: Plan) => {
    setEditingPlan(plan);
    setFormName(plan.name);
    setFormPrice(plan.price);
    setFormGiftRatio(plan.giftRatio);
    setFormBuyRatio(plan.buyRatio);
    setFormQueueRatio(plan.queueRatio);
    setFormCommissionLimit(plan.commissionLimit);
    setFormDescription(plan.description || '');
    setIsModalOpen(true);
  };

  const handleSaveOrUpdatePlan = () => {
    if (!formName) return alert('请输入套餐名称');
    if (formPrice <= 0) return alert('认购金额必须大于 0');
    if (formCommissionLimit <= 0) return alert('佣金额度具体设定值必须大于 0');

    if (editingPlan) {
      // Edit
      setAdminPlans(prev => prev.map(p => {
        if (p.id === editingPlan.id) {
          return {
            ...p,
            name: formName,
            price: formPrice,
            giftRatio: formGiftRatio,
            buyRatio: formBuyRatio,
            queueRatio: formQueueRatio,
            commissionLimit: formCommissionLimit,
            description: formDescription
          };
        }
        return p;
      }));
      alert(`套餐「${editingPlan.id}」参数已更新成功！`);
    } else {
      // Create new
      const newPlan: Plan = {
        id: `plan-${Math.floor(100 + Math.random() * 900)}`,
        name: formName,
        price: formPrice,
        giftRatio: formGiftRatio,
        buyRatio: formBuyRatio,
        queueRatio: formQueueRatio,
        commissionLimit: formCommissionLimit,
        description: formDescription,
        status: 'enabled'
      };
      setAdminPlans(prev => [...prev, newPlan]);
      alert(`新套餐「${formName}」已配置建档并同步对外启租销售！`);
    }
    setIsModalOpen(false);
  };

  const togglePlanStatus = (id: string) => {
    setAdminPlans(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'enabled' ? 'disabled' : 'enabled' };
      }
      return p;
    }));
  };

  return (
    <div id="admin_plans_view" className="space-y-6 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 flex-grow flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-base font-bold text-white">套餐管理 (Admin Plans Portal)</h3>
          <p className="text-xs text-[#cbc4d2]/60 mt-0.5">
            配置系统各理财档位的本金认购上限、佣金额度配售池具体值、TROO股票买入、排队与额外赠送比率。
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="bg-gradient-to-r from-[#6750a4] to-[#cfbcff] hover:brightness-110 active:scale-95 transition-all text-white font-extrabold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#cfbcff]/5"
        >
          <Plus className="w-4 h-4" />
          <span>创建新理财套餐</span>
        </button>
      </div>

      {/* Visual Package Management Card Grid - High Fidelity Client Style Replica */}
      <div className="grid grid-cols-1 gap-5">
        {adminPlans.map((p) => {
          const isEnabled = p.status === 'enabled';
          return (
            <div
              key={p.id}
              className={`p-5 sm:p-6 md:p-7 rounded-2xl border transition-all duration-300 relative grid grid-cols-12 gap-5 items-center ${
                isEnabled
                  ? 'bg-gradient-to-br from-[#1c1825]/90 to-[#120f18]/95 border-[#cfbcff]/20 hover:border-[#cfbcff]/45 shadow-lg shadow-black/20'
                  : 'bg-[#141119]/80 border-white/5 opacity-70 hover:opacity-100'
              }`}
            >
              {/* Left Segment: Name of package, ID tag, and active status */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h4 className="text-base sm:text-lg font-black text-white tracking-tight">
                    {p.name}
                  </h4>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                    isEnabled ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {isEnabled ? '可售中 (启用)' : '锁仓中 (停用)'}
                  </span>
                </div>
                
                <p className="text-[11px] text-[#cbc4d2]/50 font-mono">
                  套餐标识代码：<span className="text-[#cfbcff] select-all font-bold">{p.id.toUpperCase()}</span>
                </p>

                {/* Optional description based on the package name */}
                <p className="text-xs text-[#cbc4d2]/70 leading-relaxed mt-1 italic">
                  {p.description || '系统管理员限定理财分销等级档。被用户充值认购后，将为其释放高额下级团队佣金提款吞吐容量、配售TROO股票份额以及发放质押队列配额。'}
                </p>
              </div>

              {/* Middle Segment: Specs comparison bento elements */}
              <div className="col-span-12 lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
                
                {/* Stat 1: Minimum buy price */}
                <div className="flex flex-col justify-center bg-white/[0.02] hover:bg-white/[0.04] p-3 rounded-xl border border-white/5 transition-all">
                  <span className="text-[10px] font-bold text-[#cbc4d2]/50 uppercase mb-1 tracking-wider">
                    起购门槛
                  </span>
                  <span className="text-sm font-mono font-black text-white">
                    {p.price.toLocaleString()} <span className="text-[10px] text-zinc-400">U</span>
                  </span>
                </div>

                {/* Stat 2: Commission pool remaining capacity limit */}
                <div className="flex flex-col justify-center bg-emerald-500/[0.03] hover:bg-emerald-500/[0.05] p-3 rounded-xl border border-emerald-500/10 transition-all">
                  <span className="text-[10px] font-bold text-emerald-400/60 uppercase mb-1 tracking-wider">
                    佣金释放限额
                  </span>
                  <span className="text-sm font-mono font-black text-emerald-400">
                    {p.commissionLimit.toLocaleString()} <span className="text-[10px] text-emerald-500/70">U</span>
                  </span>
                </div>

                {/* Stat 3: Troo stock return gift ratio status */}
                <div className="flex flex-col justify-center bg-[#cfbcff]/[0.03] hover:bg-[#cfbcff]/[0.05] p-3 rounded-xl border border-[#cfbcff]/10 transition-all">
                  <span className="text-[10px] font-bold text-[#cfbcff]/60 uppercase mb-1 tracking-wider">
                    充值额外赠送
                  </span>
                  <span className="text-sm font-mono font-black text-[#cfbcff]">
                    {p.giftRatio === 1.0 ? '无额外赠比' : `+${Math.round((p.giftRatio - 1) * 100)}%`}
                  </span>
                </div>

                {/* Stat 4: TROO ratio distribution - buy/queue percentage allocation */}
                <div className="flex flex-col justify-center bg-amber-500/[0.02] hover:bg-amber-500/[0.04] p-3 rounded-xl border border-white/5 transition-all">
                  <span className="text-[10px] font-bold text-amber-400/60 uppercase mb-1 tracking-wider">
                    TROO 变现/排队
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-300">
                    {p.buyRatio}% <span className="text-[9px] text-[#cbc4d2]/40">/</span> {p.queueRatio}%
                  </span>
                </div>

              </div>

              {/* Right Segment: Action buttons for active parameters edit configuration */}
              <div className="col-span-12 lg:col-span-2 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 border-t lg:border-t-0 border-white/10 pt-4 lg:pt-0">
                <button 
                  type="button"
                  onClick={() => handleOpenEditModal(p)}
                  className="w-full sm:w-auto lg:w-full bg-[#cfbcff]/10 hover:bg-[#cfbcff]/20 text-[#cfbcff] px-4 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all outline-none cursor-pointer active:scale-95"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>配置参数</span>
                </button>
                
                <button 
                  type="button"
                  onClick={() => togglePlanStatus(p.id)}
                  className={`w-full sm:w-auto lg:w-full py-2 px-3 rounded-xl text-xs font-black cursor-pointer transition-all active:scale-95 text-center ${
                    isEnabled 
                      ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/10' 
                      : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/10'
                  }`}
                >
                  {isEnabled ? '下架关停' : '启用上架'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-xl border border-[#cfbcff]/10 bg-[#cfbcff]/2 text-[11px] text-[#cbc4d2] space-y-1.5">
        <p className="font-extrabold text-white flex items-center gap-1">
          <HelpCircle className="w-4 h-4 text-[#cfbcff]" />
          <span>理财配置及数值对算关系指南：</span>
        </p>
        <ul className="list-disc pl-4 space-y-1 opacity-80 leading-relaxed font-sans">
          <li><strong>佣金额度 (Commission Limit)</strong>：改变了以前信用乘数形式，采用精确数值填写。该套餐被认购后，用户最大能够核扣获取的下线推广佣金绝对值。</li>
          <li><strong>买入比例与排队比例 (Buy & Queue Ratios)</strong>：用于指导用户认购套餐时支付的本金中购买TROO股票的配售。买入比例（如40%）直接转换为活期股票资产；排队比例（如60%）将投入锁仓排队池排队交割。</li>
          <li><strong>股票赠送比例 (Gifting Bonus)</strong>：针对高净值认购级别给予的特殊贴息比例。</li>
        </ul>
      </div>

      </div>

      {/* Versatile Overlay Selection Modal Component matching the exact Commission details style */}
      {isModalOpen && (
        <div id="modal_overlay_plan" className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4 overflow-y-auto">
          <div className="bg-[#181421] border border-white/10 rounded-3xl max-w-lg w-full p-6 md:p-8 relative shadow-2xl shadow-black animate-slideUp space-y-6">
            
            {/* Absolute close button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
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
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-xs transition-all cursor-pointer"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleSaveOrUpdatePlan}
                className="flex-[2] py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 text-[#110e16] rounded-xl font-black text-xs transition-all cursor-pointer text-center"
              >
                {editingPlan ? '保存并更新配置' : '确认无误，对外创建发布'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

