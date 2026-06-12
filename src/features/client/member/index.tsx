import React, { useState } from 'react';
import { 
  Check, 
  Clock, 
  Users, 
  ExternalLink, 
  ShieldCheck, 
  QrCode, 
  Copy, 
  UserCheck, 
  AlertCircle,
  TrendingUp,
  UserPlus
} from 'lucide-react';
import PageView from '../../../components/PageView';

interface MemberViewProps {
  uid: string;
  nickname: string;
  joinDate: string;
  onUpdateNickname: (newVal: string) => void;
  onRaiseCredit: () => void;
  remainingCredit: number;
  totalCredit: number;
}

export default function MemberView({
  uid,
  nickname,
  joinDate,
  onUpdateNickname,
  onRaiseCredit,
  remainingCredit,
  totalCredit,
}: MemberViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempNickname, setTempNickname] = useState(nickname);
  const [copiedLink, setCopiedLink] = useState(false);

  const kycL1 = 'verified';
  const kycL2 = 'pending';

  const progressPercent = 65; 
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const toggleEdit = () => {
    if (isEditing) {
      if (tempNickname.trim()) {
        onUpdateNickname(tempNickname);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleCopyLink = () => {
    setCopiedLink(true);
    navigator.clipboard?.writeText(`https://alliance.institutional/join?ref=${uid}`);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const recentActivities = [
    { id: 'U9', uid: 'User_9921', action: '+$500 认购', time: '2 分钟前', highlight: true },
    { id: 'U1', uid: 'User_1245', action: '+$2,100 充值', time: '15 分钟前', highlight: true },
    { id: 'U0', uid: 'User_0083', action: '新推荐成员已注册', time: '1 小时前', highlight: false },
  ];

  return (
    <PageView>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-8 glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#cfbcff]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 w-full">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#6750a4] to-[#cfbcff] p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-[#141218] flex items-center justify-center border border-[#cfbcff]/20">
                  <span className="text-3xl font-black text-[#cfbcff] tracking-tight">
                    {nickname ? nickname.slice(0, 2).toUpperCase() : 'US'}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#cfbcff] text-[#381e72] w-7 h-7 rounded-lg flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
            </div>

            <div className="space-y-3 flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
                {isEditing ? (
                  <input
                    type="text"
                    value={tempNickname}
                    onChange={(e) => setTempNickname(e.target.value)}
                    className="bg-[#211f24] border border-[#cfbcff]/30 text-white rounded-lg px-3 py-1 text-base focus:ring-1 focus:ring-[#cfbcff] outline-none max-w-[180px]"
                  />
                ) : (
                  <h1 className="text-xl md:text-2xl font-black text-white">{nickname}</h1>
                )}
                <span className="bg-[#cfbcff]/10 text-[#cfbcff] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded border border-[#cfbcff]/20 w-fit mx-auto md:mx-0">
                  标准账户
                </span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-[#cbc4d2]">
                <div className="flex items-center gap-1.5 opacity-80">
                  <span className="font-semibold text-[#cfbcff]">ID:</span>
                  <span className="font-mono">{uid}</span>
                </div>
                <div className="flex items-center gap-1.5 opacity-80">
                  <span className="font-semibold text-[#cfbcff]">加入时间:</span>
                  <span className="font-mono">{joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={toggleEdit}
            className="whitespace-nowrap bg-[#6750a4]/30 hover:bg-[#6750a4]/50 border border-[#cfbcff]/20 text-[#cfbcff] px-6 py-2.5 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-95 duration-150"
          >
            {isEditing ? '保存修改' : '修改资料'}
          </button>
        </div>

        {/* KYC Card */}
        <div className="lg:col-span-4 glass-card rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">身份认证 (KYC)</h2>
            <span className="text-[10px] text-[#cbc4d2]/60 font-medium">高级交易权限</span>
          </div>

          <div className="space-y-3">
            {/* L1 basic certificate status */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#211f24] border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e7c365]/10 flex items-center justify-center text-[#e7c365]">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">L1 基础认证</p>
                  <p className="text-[10px] text-[#cbc4d2]/60">手机与邮箱信息</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-[#e7c365] bg-[#e7c365]/10 px-2 py-0.5 rounded border border-[#e7c365]/20">
                已认证
              </span>
            </div>

            {/* L2 deep identity scan */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#211f24] border border-[#cfbcff]/25">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#cfbcff]/10 flex items-center justify-center text-[#cfbcff]">
                  <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">L2 深度认证</p>
                  <p className="text-[10px] text-[#cbc4d2]/60">身份识别 / 面部扫描</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-[#cfbcff] bg-[#cfbcff]/10 px-2 py-0.5 rounded border border-[#cfbcff]/20">
                审核中
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Overview and Commission Pool */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Team Overview section */}
        <div className="lg:col-span-8 glass-card rounded-2xl p-6 md:p-8 flex flex-col gap-6">
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">团队概览</h2>
              <span className="text-[10px] text-[#cbc4d2] opacity-60">Team Overview</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* L1 count & L1-L5 count widgets */}
            <div className="md:col-span-4 grid grid-cols-1 gap-4">
              <div className="bg-[#211f24] p-4 rounded-xl border border-white/5">
                <p className="text-xs text-[#cbc4d2]/70 font-medium mb-1">直接推荐 (L1)</p>
                <p className="text-2xl font-black text-[#cfbcff]">
                  128 <span className="text-xs font-normal text-[#cbc4d2]">人</span>
                </p>
              </div>
              <div className="bg-[#211f24] p-4 rounded-xl border border-white/5">
                <p className="text-xs text-[#cbc4d2]/70 font-medium mb-1">团队总数 (L1-L5)</p>
                <p className="text-2xl font-black text-white">
                  2,490 <span className="text-xs font-normal text-[#cbc4d2]">人</span>
                </p>
              </div>
            </div>

            {/* Simulated circular dynamic depth map */}
            <div className="md:col-span-8 flex flex-col sm:flex-row items-center justify-around bg-[#211f24]/30 rounded-2xl p-6 border border-white/5">
              <div className="relative w-36 h-36">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 144 144" width="144" height="144">
                  <circle className="text-[#36343a]" cx="72" cy="72" fill="transparent" r="58" stroke="currentColor" strokeWidth="10"></circle>
                  <circle className="text-[#cfbcff]" cx="72" cy="72" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="236.8" strokeLinecap="round" strokeWidth="10"></circle>
                  <circle className="text-[#cdc0e9]" cx="72" cy="72" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="310" strokeLinecap="round" strokeWidth="10" style={{ transform: 'rotate(126deg)', transformOrigin: 'center' }}></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-bold text-white">成员分布</span>
                  <span className="text-[9px] text-[#cbc4d2] uppercase">L1-L5 Depth</span>
                </div>
              </div>
              <div className="space-y-3 mt-4 sm:mt-0">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#cfbcff] glow-accent"></span>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#cbc4d2]">直接推荐 L1</span>
                    <span className="text-xs font-bold text-white">35%</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#cdc0e9] glow-accent"></span>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#cbc4d2]">间接推荐 L2-L5</span>
                    <span className="text-xs font-bold text-white">65%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#cbc4d2] mb-1 flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-[#cfbcff]" /> 最近下级动态
            </h3>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <tbody>
                  {recentActivities.map((act) => (
                    <tr key={act.id} className="border-b border-white/5 last:border-none">
                      <td className="py-3 text-sm flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#36343a] flex items-center justify-center text-[10px] font-extrabold text-[#cfbcff]">{act.id}</div>
                        <span className="font-semibold text-white/95">{act.uid}</span>
                      </td>
                      <td className="py-3 text-xs md:text-sm text-[#e7c365] font-semibold">{act.action}</td>
                      <td className="py-3 text-right text-xs text-[#cbc4d2] font-mono opacity-60">{act.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-3 pt-2">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex justify-between items-center bg-white/[0.01] p-3 rounded-lg border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#36343a] flex items-center justify-center text-[10px] font-extrabold text-[#cfbcff]">{act.id}</div>
                    <div>
                      <p className="font-semibold text-white text-xs">{act.uid}</p>
                      <p className="text-[10px] text-[#cbc4d2]/60 font-mono mt-0.5">{act.time}</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#e7c365] font-semibold">{act.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Commission Pool (Visual Ring) */}
        <div className="lg:col-span-4 glass-card rounded-2xl p-6 md:p-8 flex flex-col items-center justify-between">
          <div className="w-full flex justify-between items-center border-b border-white/5 pb-2">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">信用池 (Credit Pool)</h2>
            <AlertCircle className="w-4.5 h-4.5 text-[#cbc4d2] opacity-40" />
          </div>

          <div className="relative w-48 h-48 my-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 192 192" width="192" height="192">
              <circle className="text-[#36343a]" cx="96" cy="96" fill="transparent" r={radius} stroke="currentColor" strokeWidth="12"></circle>
              <circle 
                className="text-[#cfbcff] transition-all duration-1000 ease-out" 
                cx="96" cy="96" fill="transparent" r={radius} 
                stroke="currentColor" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} 
                strokeLinecap="round" strokeWidth="12" 
                style={{ filter: 'drop-shadow(0 0 6px rgba(207, 188, 255, 0.2))' }}
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-white leading-none">
                {progressPercent}<span className="text-lg">%</span>
              </span>
              <span className="text-[10px] text-[#cbc4d2] font-bold uppercase tracking-widest mt-1">已占用</span>
            </div>
          </div>

          <div className="w-full space-y-3">
            <div className="flex justify-between items-center p-3.5 rounded-xl bg-[#211f24] border border-white/5">
              <span className="text-xs text-[#cbc4d2] font-medium">可用额度</span>
              <span className="text-sm font-bold text-[#cfbcff] font-mono">
                {remainingCredit.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} USDT
              </span>
            </div>
            <div className="flex justify-between items-center p-3.5 rounded-xl bg-[#211f24] border border-white/5">
              <span className="text-xs text-[#cbc4d2] font-medium">总信用额度</span>
              <span className="text-sm font-bold text-white font-mono">
                {totalCredit.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} USDT
              </span>
            </div>
          </div>

          <button 
            onClick={onRaiseCredit}
            className="w-full py-3 mt-6 rounded-xl bg-[#cfbcff] text-[#381e72] font-extrabold hover:brightness-110 shadow-lg shadow-[#cfbcff]/10 hover:shadow-[#cfbcff]/20 active:scale-95 transition-all text-sm"
          >
            提升信用额度
          </button>
        </div>
      </div>

    </PageView>
  );
}
