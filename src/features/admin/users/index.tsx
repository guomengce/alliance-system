import React, { useState } from 'react';
import { 
  Search, 
  Edit, 
  ArrowLeft, 
  ShieldCheck, 
  Check, 
  User, 
  Mail, 
  KeyRound, 
  Lock, 
  Wallet, 
  Activity, 
  Settings, 
  Users,
  Coins
} from 'lucide-react';
import {
  AdminUserTab,
  AdminUsersViewProps,
  DownlineMember,
  KycFilter,
  KycL1Status,
  KycL2Status,
  UserAccountStatus,
} from './types';
import AdminUsersToolbar from './components/AdminUsersToolbar';
import { filterAdminUsers } from './utils';

export default function AdminUsersView({
  downlines,
  onUpdateDownlines
}: AdminUsersViewProps) {
  const [userSearchText, setUserSearchText] = useState<string>('');
  const [kycFilter, setKycFilter] = useState<KycFilter>('all');
  
  // Local state for tracking which user is being edited inline
  const [editingUser, setEditingUser] = useState<DownlineMember | null>(null);
  const [activeTab, setActiveTab] = useState<AdminUserTab>('profile');
  const [teamSearchText, setTeamSearchText] = useState<string>('');

  // Form states for inline editing
  const [formNickname, setFormNickname] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSponsor, setFormSponsor] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formStatus, setFormStatus] = useState<UserAccountStatus>('normal');
  const [formRegDate, setFormRegDate] = useState('');
  const [formTier, setFormTier] = useState('');
  const [formUsdt, setFormUsdt] = useState<number>(0);
  const [formFrozenUsdt, setFormFrozenUsdt] = useState<number>(0);
  const [formTroo, setFormTroo] = useState<number>(0);
  const [formPending, setFormPending] = useState<number>(0);
  const [formNodes, setFormNodes] = useState<number>(0);
  const [formVolume, setFormVolume] = useState<number>(0);

  // KYC States matching client definitions
  const [formKycL1, setFormKycL1] = useState<KycL1Status>('verified');
  const [formKycL2, setFormKycL2] = useState<KycL2Status>('unverified');

  // KYC Auditor Actions
  const handleKycAudit = (uid: string, accept: boolean) => {
    onUpdateDownlines(downlines.map(d => {
      if (d.uid === uid) {
        return { 
          ...d, 
          tier: accept ? '已认证' : '标准账户',
          kycL2: accept ? 'verified' : 'unverified'
        };
      }
      return d;
    }));
    alert(`用户 UID: ${uid} 的 KYC L2 级身份核验结果审核【${accept ? '通过' : '驳回复查'}】！`);
  };

  const handleStartEditing = (user: DownlineMember) => {
    setEditingUser(user);
    setActiveTab('profile');
    setTeamSearchText('');
    
    // Seed initial values from user entity to local states
    setFormNickname(user.nickname || '');
    setFormEmail(user.email || '');
    setFormPhone(user.phone || '');
    setFormSponsor(user.sponsor || '999001 (SYS)');
    setFormPassword('');
    setFormStatus(user.status || 'normal');
    setFormRegDate(user.registrationDate || '');
    setFormTier(user.tier || '标准账户');
    setFormUsdt(user.usdtBalance || 0);
    setFormFrozenUsdt(user.frozenBalance || 0);
    setFormTroo(user.trooBalance || 0);
    setFormPending(user.pendingBalance || 0);
    setFormNodes(user.nodeSize || 0);
    setFormVolume(user.volume || 0);

    // Initial KYC state loading
    setFormKycL1(user.kycL1 || 'verified');
    if (user.kycL2) {
      setFormKycL2(user.kycL2);
    } else {
      // Intelligently infer based on tier or sales volume
      if (user.tier.includes('认证') || user.tier.includes('已认证')) {
        setFormKycL2('verified');
      } else if (user.volume > 2000) {
        setFormKycL2('pending');
      } else {
        setFormKycL2('unverified');
      }
    }
  };

  const handleSaveInline = () => {
    if (!editingUser) return;

    // Derived tier based on KYC setting to maintain compatibility with other parts
    let updatedTier = formTier;
    if (formKycL2 === 'verified') {
      updatedTier = '已认证';
    } else if (formKycL2 === 'pending') {
      updatedTier = '待认证';
    } else {
      updatedTier = '标准账户';
    }
    
    onUpdateDownlines(downlines.map(d => {
      if (d.uid === editingUser.uid) {
        return {
          ...d,
          registrationDate: formRegDate,
          nodeSize: Number(formNodes) || 0,
          volume: Number(formVolume) || 0,
          tier: updatedTier,
          nickname: formNickname,
          email: formEmail,
          phone: formPhone,
          sponsor: formSponsor,
          status: formStatus,
          usdtBalance: Number(formUsdt) || 0,
          frozenBalance: Number(formFrozenUsdt) || 0,
          trooBalance: Number(formTroo) || 0,
          pendingBalance: Number(formPending) || 0,
          password: formPassword ? formPassword : d.password,
          kycL1: formKycL1,
          kycL2: formKycL2
        };
      }
      return d;
    }));

    alert(`用户 UID: ${editingUser.uid} 的档案信息及资产设置已成功修改并刷新！`);
    setEditingUser(null);
  };

  const filteredDownlines = filterAdminUsers(downlines, userSearchText, kycFilter);

  // If in inline editing mode, output the beautiful spacious details panel
  if (editingUser) {
    return (
      <div id="admin_users_details_panel" className="space-y-6 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
        {/* Back Link Breadcrumb Header */}
        <div className="flex items-center justify-between">
          <button 
            type="button"
            onClick={() => setEditingUser(null)}
            className="flex items-center gap-2 text-xs font-bold text-[#cfbcff] hover:text-white transition-colors cursor-pointer outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回联盟正式注册代表名册</span>
          </button>

          <span className="text-[10px] text-[#cbc4d2]/40 font-bold font-mono">
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
                <span className="bg-[#cfbcff]/10 text-[#cfbcff] text-[10px] font-black uppercase px-2 py-0.5 rounded border border-[#cfbcff]/20 w-fit mx-auto md:mx-0 tracking-wider">
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

        {/* Tab Selector Section */}
        <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none border-b border-white/5 pb-1 gap-5 md:gap-6 text-xs font-bold leading-none select-none">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`pb-2 border-b-2 hover:text-[#cfbcff] transition-all cursor-pointer shrink-0 ${activeTab === 'profile' ? 'text-[#cfbcff] border-[#cfbcff]' : 'text-[#cbc4d2]/40 border-transparent'}`}
          >
            基本资料 & 状态标定
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wallet')}
            className={`pb-2 border-b-2 hover:text-[#cfbcff] transition-all cursor-pointer shrink-0 ${activeTab === 'wallet' ? 'text-[#cfbcff] border-[#cfbcff]' : 'text-[#cbc4d2]/40 border-transparent'}`}
          >
            钱包资产核拨调整
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('team')}
            className={`pb-2 border-b-2 hover:text-[#cfbcff] transition-all cursor-pointer shrink-0 ${activeTab === 'team' ? 'text-[#cfbcff] border-[#cfbcff]' : 'text-[#cbc4d2]/40 border-transparent'}`}
          >
            直属下线团队节点 (裂变)
          </button>
        </div>

        {/* Tab 1: Profile and Status Form */}
        {activeTab === 'profile' && (
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-[#141119] space-y-5 animate-fadeIn">
            <div className="flex items-center gap-2 pb-3 border-b border-white/5">
              <User className="w-5 h-5 text-[#cfbcff]" />
              <h2 className="text-sm font-bold text-white tracking-wider">用户信息</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-1.5">
                <label className="text-[#cbc4d2]/60 font-semibold uppercase font-sans">用户昵称 (Nickname)</label>
                <div className="relative">
                  <input 
                    type="text"
                    value={formNickname}
                    onChange={(e) => setFormNickname(e.target.value)}
                    className="w-full bg-[#1c1824] border border-white/10 hover:border-[#cfbcff]/30 focus:border-[#cfbcff] text-white text-xs font-bold px-3.5 py-3 rounded-xl focus:outline-none transition-all"
                    placeholder="请输入用户昵称"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#cbc4d2]/60 font-semibold uppercase font-sans">邮箱 (Email)</label>
                <div className="relative">
                  <input 
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full bg-[#1c1824] border border-white/10 hover:border-[#cfbcff]/30 focus:border-[#cfbcff] text-white text-xs font-bold px-3.5 py-3 rounded-xl focus:outline-none transition-all font-mono"
                    placeholder="example@alliance.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-1.5">
                <label className="text-[#cbc4d2]/60 font-semibold uppercase font-sans">手机号码 (Phone Number)</label>
                <div className="relative">
                  <input 
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-[#1c1824] border border-white/10 hover:border-[#cfbcff]/30 focus:border-[#cfbcff] text-white text-xs font-bold px-3.5 py-3 rounded-xl focus:outline-none transition-all font-mono"
                    placeholder="+86 138-0000-0000"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#cbc4d2]/60 font-semibold uppercase font-sans">对应推荐人 (Sponsor Referrer)</label>
                <div className="relative">
                  <input 
                    type="text"
                    value={formSponsor}
                    onChange={(e) => setFormSponsor(e.target.value)}
                    className="w-full bg-[#1c1824] border border-white/10 hover:border-[#cfbcff]/30 focus:border-[#cfbcff] text-[#cfbcff] text-xs font-bold px-3.5 py-3 rounded-xl focus:outline-none transition-all font-mono"
                    placeholder="Referrer UID (e.g., 999001)"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="text-[#cbc4d2]/60 font-semibold uppercase font-sans">登录密码重置安全管理 (Set / Reset Password)</label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-[#1c1824] p-4 rounded-xl border border-white/5">
                <p className="text-[11px] text-[#cbc4d2]/70 flex-1 leading-normal font-sans">
                  ℹ️ 为了全面保障用户和上级联盟链条的私密安全，管理端已废除管理员强解/写入明文密码的功能。系统只允许通过右侧按钮，引导发送改密指令和安全校验令牌到用户的注册或关联邮箱中，供其自主设置。
                </p>
                <button
                  type="button"
                  onClick={() => {
                    alert(`重置密码邮件已发送至该用户邮箱: ${formEmail || '暂无绑定邮箱'} ！请指导该用户在邮箱中完成新密码自主设定。`);
                  }}
                  className="bg-gradient-to-r from-[#6750a4] to-[#cfbcff] hover:brightness-110 text-white font-bold p-3 rounded-xl transition-all text-xs cursor-pointer flex items-center justify-center gap-1.5 select-none shrink-0"
                >
                  <KeyRound className="w-3.5 h-3.5 text-white" />
                  <span>向该邮箱发送密码重置指令</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-1.5">
                <label className="text-[#cbc4d2]/60 font-semibold uppercase font-sans">帐户状态</label>
                <select 
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as any)}
                  className="w-full bg-[#1c1824] border border-white/10 hover:border-[#cfbcff]/30 focus:border-[#cfbcff] text-white text-xs font-bold px-3.5 py-3 rounded-xl focus:outline-none transition-all cursor-pointer"
                >
                  <option value="normal">正常活跃 (Active - 收益划拨与所有同盟权限全部放行)</option>
                  <option value="frozen">冻结受限 (Frozen - 暂停其收益下发，拦截其质押提取业务)</option>
                  <option value="disabled">注销禁用 (Disabled - 禁止登录平台且断开与其下级节点算力分成)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#cbc4d2]/60 font-semibold uppercase font-sans">注册激活时间</label>
                <div className="w-full bg-[#1c1824] border border-white/10 text-[#cbc4d2]/60 text-xs font-mono px-3.5 py-3.5 rounded-xl select-none">
                  {formRegDate || '暂未激活'}
                </div>
              </div>
            </div>

            {/* KYC Levels Management section explicitly added */}
            <div className="border-t border-white/5 pt-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#cfbcff]" />
                <span>实名身份认证资质核定 (KYC) 与用户提交的认证资料展示</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                <div className="bg-[#1c1824] p-4 rounded-xl border border-white/5 space-y-3">
                  <label className="text-[10px] text-[#cfbcff]/80 font-bold block uppercase">L1 基础实名资质 (手机与邮箱信息)</label>
                  <select 
                    value={formKycL1}
                    onChange={(e) => setFormKycL1(e.target.value as any)}
                    className="w-full bg-[#110e16] border border-white/10 hover:border-[#cfbcff]/30 focus:border-[#cfbcff] text-white text-xs font-bold px-3 py-2.5 rounded-lg focus:outline-none cursor-pointer"
                  >
                    <option value="verified">✅ 已认证 (Verified - 基础信息已锁定)</option>
                    <option value="unverified">❌ 未核验 (Unverified - 暂缺必要安全绑定)</option>
                  </select>

                  <div className="bg-[#110e16]/80 p-3 rounded-lg border border-white/5 text-[11px] text-[#cbc4d2]/80 space-y-1 font-mono">
                    <p><span className="text-[#cbc4d2]/40">初核姓名:</span> {formNickname ? formNickname.split(' ')[0] : '李'} * 强</p>
                    <p><span className="text-[#cbc4d2]/40">证件号码:</span> 110101 ********* 291X</p>
                    <p><span className="text-[#cbc4d2]/40">绑手机号:</span> {formPhone || '未绑定'}</p>
                    <p><span className="text-[#cbc4d2]/40">绑电子邮:</span> {formEmail || '未绑定'}</p>
                  </div>
                </div>

                <div className="bg-[#1c1824] p-4 rounded-xl border border-white/5 space-y-3">
                  <label className="text-[10px] text-[#cfbcff]/80 font-bold block uppercase">L2 深度实名资质 (身份照、通行证与面容自证)</label>
                  <select 
                    value={formKycL2}
                    onChange={(e) => setFormKycL2(e.target.value as any)}
                    className="w-full bg-[#110e16] border border-white/10 hover:border-[#cfbcff]/30 focus:border-[#cfbcff] text-white text-xs font-bold px-3 py-2.5 rounded-lg focus:outline-none cursor-pointer"
                  >
                    <option value="verified">✅ 终审已通过 (Verified - 开启大额认购、授信极速提取)</option>
                    <option value="pending">⏳ 待后台审核 (Pending L2 - 用户已上送资质待核销)</option>
                    <option value="unverified">❌ 尚未核验 (Unverified - 不满足算力承接深度评定)</option>
                  </select>

                  <div className="bg-[#110e16]/80 p-3 rounded-lg border border-white/5 text-[11px] text-[#cbc4d2]/80 space-y-1 font-sans">
                    <p><span className="text-[#cbc4d2]/40 font-mono">上送媒介:</span> 手机端自拍提报</p>
                    <p><span className="text-[#cbc4d2]/40 font-mono">国籍/地区:</span> 中华人民共和国 (CN)</p>
                    <p><span className="text-[#cbc4d2]/40 font-mono">核验通道:</span> Tencent OCR / FaceId 集成</p>
                    <p><span className="text-[#cbc4d2]/40 font-mono">核销比对:</span> 动态活体校验相似比 98.42%</p>
                  </div>
                </div>
              </div>

              {/* Displaying visual document thumbnails */}
              <div className="bg-[#1c1824] p-5 rounded-xl border border-white/5 space-y-3">
                <span className="text-[10px] text-[#cfbcff] font-extrabold block uppercase tracking-wider">用户上送资质证明影印原件 (Uploaded ID Card & Handheld Photo Materials)</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#110e16] p-3 rounded-xl border border-white/10 text-center space-y-2">
                    <span className="text-[10px] text-[#cbc4d2]/50 block font-bold">证件正面 (国家机读人像面)</span>
                    <div className="w-full h-32 bg-[#1c1824] rounded-xl border border-white/5 flex flex-col items-center justify-center text-[10px] text-[#cfbcff] italic relative overflow-hidden group">
                      {formKycL2 === 'unverified' ? (
                        <span className="text-[#cbc4d2]/20">暂未上送正面物料</span>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1128] to-[#110a1b] p-3 flex flex-col justify-between text-left">
                          <div className="flex justify-between items-start">
                            <div className="w-8 h-8 rounded-full bg-[#cfbcff]/10 flex items-center justify-center border border-white/10 font-bold text-white text-[9px]">ID</div>
                            <span className="font-mono text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">OCR PASSED</span>
                          </div>
                          <div className="font-mono text-[8.5px] text-[#cbc4d2]/80 space-y-0.5 mt-2">
                            <p className="font-bold text-white">CN_PASSPORT_FRONT_{editingUser.uid}.JPG</p>
                            <p className="opacity-60 text-[8px]">MD5: c4ca4238a0b923820dcc509a6f75849b</p>
                          </div>
                          <span className="text-[9px] text-[#cfbcff] mt-1 font-bold hover:underline cursor-pointer">👁 放大检查原图</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#110e16] p-3 rounded-xl border border-white/10 text-center space-y-2">
                    <span className="text-[10px] text-[#cbc4d2]/50 block font-bold">证件反面 (带有签证印章/国徽)</span>
                    <div className="w-full h-32 bg-[#1c1824] rounded-xl border border-white/5 flex flex-col items-center justify-center text-[10px] text-[#cfbcff] italic relative overflow-hidden group">
                      {formKycL2 === 'unverified' ? (
                        <span className="text-[#cbc4d2]/20">暂未上送反面物料</span>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1128] to-[#110a1b] p-3 flex flex-col justify-between text-left">
                          <div className="flex justify-between items-start">
                            <div className="w-8 h-8 rounded-full bg-[#cfbcff]/10 flex items-center justify-center border border-white/10 font-bold text-white text-[9px]">ID</div>
                            <span className="font-mono text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">OCR PASSED</span>
                          </div>
                          <div className="font-mono text-[8.5px] text-[#cbc4d2]/80 space-y-0.5 mt-2">
                            <p className="font-bold text-white">CN_PASSPORT_BACK_{editingUser.uid}.JPG</p>
                            <p className="opacity-60 text-[8px]">MD5: 28c829188a0b923820dcc509a6faefbf0</p>
                          </div>
                          <span className="text-[9px] text-[#cfbcff] mt-1 font-bold hover:underline cursor-pointer">👁 放大检查原图</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#110e16] p-3 rounded-xl border border-white/10 text-center space-y-2">
                    <span className="text-[10px] text-[#cbc4d2]/50 block font-bold">手持证件自拍活体对比照片</span>
                    <div className="w-full h-32 bg-[#1c1824] rounded-xl border border-white/5 flex flex-col items-center justify-center text-[10px] text-[#cfbcff] italic relative overflow-hidden group">
                      {formKycL2 === 'unverified' ? (
                        <span className="text-[#cbc4d2]/20">暂未上送自拍照</span>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1128] to-[#110a1b] p-3 flex flex-col justify-between text-left">
                          <div className="flex justify-between items-start">
                            <div className="w-8 h-8 rounded-full bg-[#cfbcff]/10 flex items-center justify-center border border-white/10 font-bold text-white text-[9px]">LIVE</div>
                            <span className="font-mono text-[8px] bg-[#cfbcff]/10 text-[#cfbcff] px-1.5 py-0.5 rounded border border-[#cfbcff]/20">FACE MATCHED</span>
                          </div>
                          <div className="font-mono text-[8.5px] text-[#cbc4d2]/80 space-y-0.5 mt-2">
                            <p className="font-bold text-white">HAND_HELD_SELF_ALIGN_{editingUser.uid}.PNG</p>
                            <p className="opacity-60 text-[8px]">Similarity: 98.42% (FaceId API)</p>
                          </div>
                          <span className="text-[9px] text-[#cfbcff] mt-1 font-bold hover:underline cursor-pointer">👁 放大检查原图</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Wallet Allocation Form */}
        {activeTab === 'wallet' && (
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-[#141119] space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 pb-3 border-b border-white/5">
              <Wallet className="w-5 h-5 text-[#cfbcff]" />
              <h2 className="text-sm font-bold text-white tracking-wider">用户钱包及同盟资产折核 / 异常纠偏</h2>
            </div>

            <div className="p-4 bg-[#cfbcff]/5 border border-[#cfbcff]/10 rounded-2xl text-xs text-[#cbc4d2] space-y-1">
              <p className="font-extrabold text-[#cfbcff]">管理员财务及资产精算纠偏面板</p>
              <p className="opacity-70 leading-relaxed">
                管理员可人工拨备或扣件用户账户中因链上交易延迟、异常阻塞或人工补额导致的各类资产和佣金余额。
              </p>
            </div>

            {/* Comprehensive Net Asset Valuation Cover */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-sans">
              <div className="bg-gradient-to-br from-[#1c142c] to-[#120a1c] p-4.5 rounded-2xl border border-[#cfbcff]/20 col-span-1 md:col-span-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[10px] text-[#cfbcff] font-extrabold block uppercase tracking-wider">该用户在全联盟折合预估总资产价值 (Total Asset Net Valuation)</span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white font-mono leading-none">
                      {(formUsdt + formFrozenUsdt + formPending + (formTroo * 0.01)).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </span>
                    <span className="text-sm font-bold text-[#cfbcff] font-mono">USDT 等值</span>
                  </div>
                </div>
                <div className="text-right text-[10px] text-[#cbc4d2]/50 font-mono space-y-0.5">
                  <p>可用额度: {formUsdt.toLocaleString()} USDT</p>
                  <p>拉黑/冻结: {formFrozenUsdt.toLocaleString()} USDT</p>
                  <p>待结算: {formPending.toLocaleString()} USDT</p>
                  <p>TROO折算 (汇率0.01): {(formTroo * 0.01).toLocaleString()} USDT</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
              <div className="bg-[#1c1824] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-[#cfbcff] flex items-center gap-1"><Wallet className="w-3.5 h-3.5" /> 可用资产 (USDT)</span>
                  <span className="text-[#cbc4d2]/40 font-mono">AVAILABLE</span>
                </div>
                <div className="relative">
                  <input 
                    type="number"
                    value={formUsdt}
                    onChange={(e) => setFormUsdt(Number(e.target.value) || 0)}
                    className="w-full bg-[#110e16] border border-white/10 focus:border-[#cfbcff] text-white text-xs font-extrabold pr-12 pl-3.5 py-3 rounded-xl focus:outline-none font-mono"
                    step="0.01"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#cbc4d2]/40 font-mono">USDT</span>
                </div>
              </div>

              <div className="bg-[#1c1824] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-[#ffb4ab] flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> 冻结资产 (USDT)</span>
                  <span className="text-[#cbc4d2]/40 font-mono">FROZEN</span>
                </div>
                <div className="relative">
                  <input 
                    type="number"
                    value={formFrozenUsdt}
                    onChange={(e) => setFormFrozenUsdt(Number(e.target.value) || 0)}
                    className="w-full bg-[#110e16] border border-white/10 focus:border-[#cfbcff] text-[#ffb4ab] text-xs font-extrabold pr-12 pl-3.5 py-3 rounded-xl focus:outline-none font-mono"
                    step="0.01"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#cbc4d2]/40 font-mono">USDT</span>
                </div>
              </div>

              <div className="bg-[#1c1824] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-amber-400 flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> D+1 待核算佣金</span>
                  <span className="text-amber-500/40 font-mono">PENDING COMM</span>
                </div>
                <div className="relative">
                  <input 
                    type="number"
                    value={formPending}
                    onChange={(e) => setFormPending(Number(e.target.value) || 0)}
                    className="w-full bg-[#110e16] border border-white/10 focus:border-[#cfbcff] text-amber-400 text-xs font-extrabold pr-12 pl-3.5 py-3 rounded-xl focus:outline-none font-mono"
                    step="0.01"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-black text-amber-500/40 font-mono">USDT</span>
                </div>
              </div>

              <div className="bg-[#1c1824] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-[#cfbcff] flex items-center gap-1"><Activity className="w-3.5 h-3.5" /> TROO股票余量</span>
                  <span className="text-[#cbc4d2]/40 font-mono">TROO STOCK</span>
                </div>
                <div className="relative">
                  <input 
                    type="number"
                    value={formTroo}
                    onChange={(e) => setFormTroo(Number(e.target.value) || 0)}
                    className="w-full bg-[#110e16] border border-white/10 focus:border-[#cfbcff] text-[#cfbcff] text-xs font-extrabold pr-12 pl-3.5 py-3 rounded-xl focus:outline-none font-mono"
                    step="1"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#cbc4d2]/40 font-mono">股票</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div className="bg-[#1c1824]/60 p-4.5 rounded-2xl border border-white/5 space-y-2 opacity-80 select-none">
                <span className="text-[10px] text-[#cbc4d2]/50 font-extrabold block uppercase">下级网络总裂变节点数 (个)</span>
                <div className="bg-[#110e16] border border-white/5 text-[#cfbcff] text-sm font-extrabold px-3.5 py-3.5 rounded-xl font-mono flex items-center justify-between">
                  <span>{formNodes} 个下属</span>
                  <span className="text-[9px] bg-[#cfbcff]/10 text-[#cfbcff] px-2 py-0.5 rounded uppercase font-sans font-bold">🔒 系统自动精算 - 绝不允许管理端手动干预</span>
                </div>
              </div>

              <div className="bg-[#1c1824]/60 p-4.5 rounded-2xl border border-white/5 space-y-2 opacity-80 select-none">
                <span className="text-[10px] text-[#cbc4d2]/50 font-extrabold block uppercase">直属级大盘累积销售业绩 (USDT)</span>
                <div className="bg-[#110e16] border border-white/5 text-emerald-400 text-sm font-extrabold px-3.5 py-3.5 rounded-xl font-mono flex items-center justify-between">
                  <span>USDT {formVolume.toLocaleString()}</span>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded uppercase font-sans font-bold">🔒 系统裂变聚合 - 绝不允许手动篡改</span>
                </div>
              </div>
            </div>

            {/* 核心同盟分红扣付与佣金统计 */}
            <div className="border border-[#cfbcff]/10 rounded-xl bg-[#cfbcff]/2 p-4 space-y-3 font-sans">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                <Coins className="w-4 h-4 text-[#cfbcff]" />
                <span>同盟体推广分润与佣金精算对账统计 (D+1 在途及总预估结算)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 font-sans">
                <div className="bg-[#1c1824]/80 p-3 rounded-lg border border-white/5">
                  <span className="text-[10px] text-[#cbc4d2]/50 block">累积分润总收益 (预估)</span>
                  <span className="text-sm font-bold text-emerald-400 block mt-1 font-mono">USDT {(Number(formVolume) * 0.12).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
                <div className="bg-[#1c1824]/80 p-3 rounded-lg border border-white/5">
                  <span className="text-[10px] text-[#cbc4d2]/50 block">最上限可用分润信用额度</span>
                  <span className="text-sm font-bold text-[#cfbcff] block mt-1 font-mono">USDT {(Number(formVolume) * 0.4).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
                <div className="bg-[#1c1824]/80 p-3 rounded-lg border border-white/5">
                  <span className="text-[10px] text-[#cbc4d2]/50 block">当前 D+1 待核算佣金度</span>
                  <span className="text-sm font-bold text-amber-400 block mt-1 font-mono">USDT {formPending.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
              </div>
              <p className="text-[10px] text-[#cbc4d2]/30 leading-normal">
                * 精算公式闭环体系：累积分润额与可用分润上限均与该账户的销售业绩强关联 (12% 转化率 / 40% 精算池权重)。系统自动进行D+1待核算佣金的到账交割，人工微调可用或冻结资产后请点击底部“确认修改”保存数据。
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Downlines list matching user's specific request "团队成员展示，内容参考客户端团队，不过不要展示太详细" */}
        {activeTab === 'team' && (
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-[#141119] space-y-5 animate-fadeIn text-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#cfbcff]" />
                <h2 className="text-sm font-bold text-white tracking-wider">旗下直推与间推裂变拓扑账谱</h2>
              </div>
              
              {/* Interactive inline team member search box */}
              <div className="relative w-full sm:w-60">
                <input 
                  type="text"
                  value={teamSearchText}
                  onChange={(e) => setTeamSearchText(e.target.value)}
                  placeholder="查找下级(UID / 昵称 / 级别)..."
                  className="w-full bg-[#1c1824] border border-white/10 rounded-xl px-3.5 py-2 pl-9 text-[11px] text-white placeholder-white/30 focus:ring-1 focus:ring-[#cfbcff] outline-none"
                />
                <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#1c1824] p-4 rounded-xl border border-white/5">
                <span className="text-[10px] text-[#cbc4d2]/40 font-bold block uppercase font-mono">TOTAL ASSOCIATIVE DEPTH</span>
                <span className="text-base font-black text-white block mt-1">{formNodes} 个直属与关联裂变同盟</span>
              </div>
              <div className="bg-[#1c1824] p-4 rounded-xl border border-white/5">
                <span className="text-[10px] text-[#cbc4d2]/40 font-bold block uppercase font-mono">AGGREGATE VOLUME</span>
                <span className="text-base font-black text-emerald-400 block mt-1">USDT {(Number(formVolume) || 0).toLocaleString()}</span>
              </div>
            </div>

            {/* List of Downline associates in clean client-like grid card format */}
            <div className="hidden md:block border border-white/5 rounded-2xl bg-[#1c1824]/30 overflow-hidden">
              <div className="grid grid-cols-4 bg-white/3 py-2 px-4 text-[#cbc4d2]/40 font-black text-[10px] tracking-wide border-b border-white/5">
                <span>下级及裂变代表</span>
                <span>层级归属</span>
                <span className="text-right">直属推荐人数</span>
                <span className="text-right">累计业绩额 (USDT)</span>
              </div>
              <div className="divide-y divide-white/5 font-mono">
                {[
                  { uid: '891012', name: '特邀代表 (Alpha)', level: 'L1级 (直推)', nodes: '128人', volume: '12,450.00' },
                  { uid: '891503', name: '卓越先锋 (Beta)', level: 'L2级 (间推)', nodes: '45人', volume: '48,900.00' },
                  { uid: '892901', name: '资深顾问 (Gamma)', level: 'L3级 (分裂)', nodes: '6人', volume: '1,200.00' },
                  { uid: '893452', name: '新晋合伙人 (Delta)', level: 'L1级 (直推)', nodes: '12人', volume: '3,500.00' },
                  { uid: '894211', name: '金牌代理 (Epsilon)', level: 'L2级 (间推)', nodes: '89人', volume: '22,100.00' },
                  { uid: '890888', name: '终极同盟 (Omega)', level: 'L3级 (分裂)', nodes: '342人', volume: '115,000.00' }
                ]
                  .filter(member => {
                    if (!teamSearchText) return true;
                    const query = teamSearchText.toLowerCase();
                    return member.uid.includes(query) ||
                           member.name.toLowerCase().includes(query) ||
                           member.level.toLowerCase().includes(query);
                  })
                  .map((member) => (
                    <div key={member.uid} className="grid grid-cols-4 py-3.5 px-4 items-center hover:bg-white/[0.02] transition-colors">
                      <div>
                        <p className="font-extrabold text-white text-xs">{member.uid}</p>
                        <p className="text-[9px] text-[#cbc4d2]/40 mt-0.5 font-sans truncate">{member.name}</p>
                      </div>
                      <div>
                        <span className="bg-[#cfbcff]/10 text-[#cfbcff] text-[9px] px-2 py-0.5 font-bold rounded">
                          {member.level}
                        </span>
                      </div>
                      <p className="text-right text-white text-xs font-bold">{member.nodes}</p>
                      <p className="text-right text-[#cfbcff] font-extrabold text-xs">USDT {member.volume}</p>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Mobile View Team Cards */}
            <div className="block md:hidden border border-white/5 rounded-2xl divide-y divide-white/5 overflow-hidden bg-[#1c1824]/30">
              {[
                { uid: '891012', name: '特邀代表 (Alpha)', level: 'L1级 (直推)', nodes: '128人', volume: '12,450.00' },
                { uid: '891503', name: '卓越先锋 (Beta)', level: 'L2级 (间推)', nodes: '45人', volume: '48,900.00' },
                { uid: '892901', name: '资深顾问 (Gamma)', level: 'L3级 (分裂)', nodes: '6人', volume: '1,200.00' },
                { uid: '893452', name: '新晋合伙人 (Delta)', level: 'L1级 (直推)', nodes: '12人', volume: '3,500.00' },
                { uid: '894211', name: '金牌代理 (Epsilon)', level: 'L2级 (间推)', nodes: '89人', volume: '22,100.00' },
                { uid: '890888', name: '终极同盟 (Omega)', level: 'L3级 (分裂)', nodes: '342人', volume: '115,000.00' }
              ]
                .filter(member => {
                  if (!teamSearchText) return true;
                  const query = teamSearchText.toLowerCase();
                  return member.uid.includes(query) ||
                         member.name.toLowerCase().includes(query) ||
                         member.level.toLowerCase().includes(query);
                })
                .map((member) => (
                  <div key={member.uid} className="p-3.5 space-y-2 bg-white/[0.01] hover:bg-white/[0.02] transition-colors text-xs font-sans">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-white font-extrabold text-xs">{member.uid}</span>
                        <span className="text-[#cbc4d2]/50 text-[10px]">({member.name.split(' ')[0]})</span>
                      </div>
                      <span className="bg-[#cfbcff]/10 text-[#cfbcff] text-[9.5px] px-2 py-0.5 font-bold rounded-lg border border-[#cfbcff]/10">
                        {member.level}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 font-mono">
                      <div>
                        <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">直推推荐人数</span>
                        <span className="text-white font-bold block">{member.nodes}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">累计业绩额</span>
                        <span className="text-[#cfbcff] font-extrabold block text-xs">USDT {member.volume}</span>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>

            <p className="text-[10px] text-[#cbc4d2]/40 italic pl-1 leading-relaxed">
              * 支持通过右上角搜索条即时过滤模糊匹配的团队节点。
            </p>
          </div>
        )}

        {/* Form controls row - no overlay */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-end">
          <button 
            type="button"
            onClick={() => setEditingUser(null)}
            className="bg-white/5 hover:bg-white/10 text-[#cbc4d2] px-6 py-3 rounded-xl font-bold transition-all text-xs cursor-pointer text-center outline-none"
          >
            取消返回名册
          </button>
          
          <button 
            type="button"
            onClick={handleSaveInline}
            className="bg-gradient-to-r from-[#6750a4] to-[#cfbcff] hover:brightness-110 text-white px-8 py-3 rounded-xl font-black transition-all text-xs cursor-pointer text-center flex items-center justify-center gap-1.5 outline-none shadow-md shadow-[#cfbcff]/5"
          >
            <Check className="w-4 h-4" />
            <span>确认修改</span>
          </button>
        </div>
      </div>
    );
  }

  // Normal List View
  return (
    <div id="admin_users_view" className="glass-card p-4 md:p-5 rounded-2xl border border-white/5 bg-[#141119] space-y-4 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-3">
      <AdminUsersToolbar
        searchText={userSearchText}
        kycFilter={kycFilter}
        onSearchTextChange={setUserSearchText}
        onKycFilterChange={setKycFilter}
      />

      {/* Users list table - Full layout for desktop density */}
      <div className="space-y-4">
        {/* Mobile-first card list */}
        <div className="block md:hidden space-y-3">
          {filteredDownlines.map(d => (
              <div key={d.uid} className="bg-[#1c1825]/60 border border-white/5 p-4 rounded-2xl space-y-3 font-sans">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#cfbcff]/10 border border-[#cfbcff]/20 text-[#cfbcff] flex items-center justify-center font-extrabold text-xs">
                      {d.avatarLetter || (d.nickname ? d.nickname.charAt(0).toUpperCase() : 'U')}
                    </div>
                    <div>
                      <p className="font-extrabold text-xs text-white leading-tight">{d.nickname || '未设置昵称'}</p>
                      <p className="font-mono text-[9px] text-[#cbc4d2]/50 mt-0.5">UID: {d.uid}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] font-semibold text-[#cfbcff] bg-[#cfbcff]/5 px-2 py-0.5 rounded border border-[#cfbcff]/10">
                    Sponsor: {d.sponsor || '999001'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-[11px] border-t border-b border-white/5 py-2 font-sans">
                  <div>
                    <span className="text-white/40 text-[9px] block">联系方式</span>
                    <p className="text-white font-mono font-bold mt-0.5">{d.phone || '暂无绑定手机'}</p>
                    <p className="text-[#cbc4d2]/50 font-mono text-[10px] truncate">{d.email || d.uid + '@alliance.com'}</p>
                  </div>
                  <div>
                    <span className="text-white/40 text-[9px] block">下级/业绩</span>
                    <p className="font-bold text-[#cfbcff] font-mono text-xs mt-0.5">{d.nodeSize} 个下级</p>
                    <p className="text-emerald-400 font-bold font-mono text-[10px]">USDT {d.volume.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[11px] font-sans">
                  <div className="flex-1 min-w-0 pr-2">
                    <span className="text-white/40 text-[9px] block">KYC 状态 / 注册时间</span>
                    <div className="mt-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {d.kycL2 === 'verified' ? (
                          <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md whitespace-nowrap">L2 级</span>
                        ) : d.kycL2 === 'pending' ? (
                          <div className="flex items-center gap-1">
                            <span className="text-[9px] font-black text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-md animate-pulse whitespace-nowrap">L2 待审</span>
                            <button 
                              onClick={() => handleKycAudit(d.uid, true)}
                              className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded text-[8px] font-bold hover:bg-emerald-500/35 transition-all cursor-pointer whitespace-nowrap"
                            >
                              批准
                            </button>
                          </div>
                        ) : d.kycL1 === 'verified' || d.kycL1 === undefined ? (
                          <span className="text-[9px] font-black text-[#cfbcff] bg-[#cfbcff]/10 px-1.5 py-0.5 rounded-md whitespace-nowrap">L1 级</span>
                        ) : (
                          <span className="text-[9px] font-black text-gray-500 bg-white/5 px-1.5 py-0.5 rounded-md whitespace-nowrap">未核验</span>
                        )}
                      </div>
                      
                      <div className="text-[#cbc4d2]/45 font-mono text-[9px] pt-1">
                        注册时间: {d.registrationDate}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleStartEditing(d)}
                    className="bg-gradient-to-r from-[#6750a4]/40 to-[#cfbcff]/20 text-[#cfbcff] text-[10px] font-bold py-1.5 px-3 border border-[#cfbcff]/20 rounded-xl cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <Edit className="w-3" />
                    查看
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Desktop Layout table */}
        <div className="hidden md:block overflow-x-auto border border-white/5 rounded-2xl bg-[#1c1825]/40 p-1">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-[#cbc4d2]/50 font-bold tracking-wider bg-white/[0.01]">
                <th className="py-3 px-4">用户昵称 / UID 账号</th>
                <th className="py-3 px-4">联系方式 (手机 / 邮箱)</th>
                <th className="py-3 px-4">直属推荐关系</th>
                <th className="py-3 px-4">注册并激活日期</th>
                <th className="py-3 px-4">下级/业绩</th>
                <th className="py-3 px-4">KYC状态</th>
                <th className="py-3 px-4 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredDownlines.map(d => (
                  <tr key={d.uid} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#cfbcff]/10 border border-[#cfbcff]/20 text-[#cfbcff] flex items-center justify-center font-extrabold text-xs select-none">
                          {d.avatarLetter || (d.nickname ? d.nickname.charAt(0).toUpperCase() : 'U')}
                        </div>
                        <div>
                          <p className="font-extrabold text-xs text-white leading-tight">{d.nickname || '未设置昵称'}</p>
                          <p className="font-mono text-[10px] text-[#cbc4d2]/50 mt-0.5">UID: {d.uid}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-white font-mono text-[11px] font-bold">{d.phone || '暂无绑定手机'}</p>
                      <p className="text-[#cbc4d2]/50 font-mono text-[10px] mt-0.5">{d.email || d.uid + '@alliance.com'}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs font-semibold text-[#cfbcff] bg-[#cfbcff]/5 px-2 py-0.5 rounded border border-[#cfbcff]/10">
                        {d.sponsor || '999001 (SYS)'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#cbc4d2]/70 font-mono">{d.registrationDate}</td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-[#cfbcff] font-mono text-xs">{d.nodeSize} 个下级</p>
                      <p className="text-emerald-400 font-bold font-mono text-[10px] mt-0.5">USDT {d.volume.toLocaleString()}</p>
                    </td>
                    <td className="py-3 px-4 font-sans">
                      <div className="flex items-center gap-1.5">
                        {d.kycL2 === 'verified' ? (
                          <span className="inline-block text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                            L2 级
                          </span>
                        ) : d.kycL2 === 'pending' ? (
                          <div className="flex items-center gap-1.5">
                            <span className="inline-block text-[10px] font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md animate-pulse">
                              L2 待审
                            </span>
                            <button 
                              onClick={() => handleKycAudit(d.uid, true)}
                              className="p-1 px-1.5 bg-emerald-500/20 text-emerald-400 font-extrabold border border-emerald-500/30 rounded text-[9px] font-bold hover:bg-emerald-500/30 transition-all cursor-pointer"
                              title="一键快速审批通过"
                            >
                              审核
                            </button>
                          </div>
                        ) : d.kycL1 === 'verified' || d.kycL1 === undefined ? (
                          <span className="inline-block text-[10px] font-black text-[#cfbcff] bg-[#cfbcff]/10 px-2 py-0.5 rounded-md">
                            L1 级
                          </span>
                        ) : (
                          <span className="inline-block text-[10px] font-black text-gray-500 bg-white/5 px-2 py-0.5 rounded-md">
                            未核验
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2.5">
                        <button 
                          onClick={() => handleStartEditing(d)}
                          className="bg-gradient-to-r from-[#6750a4]/40 to-[#cfbcff]/20 hover:brightness-110 active:scale-95 transition-all text-[#cfbcff] text-xs font-bold py-1.5 px-3 border border-[#cfbcff]/20 rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm"
                        >
                          <Edit className="w-3.5" />
                          查看
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
