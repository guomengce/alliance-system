import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import PageView from './PageView';
import AlertBanner from './AlertBanner';
import { 
  Settings, 
  ShieldAlert, 
  Lock, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Check, 
  Settings2, 
  Info, 
  Key, 
  Fingerprint,
  RefreshCw,
  LogOut
} from 'lucide-react';

interface SettingsViewProps {
  nickname: string;
  email: string;
  onUpdateNickname: (newVal: string) => void;
  onUpdateEmail: (newVal: string) => void;
  onLogout: () => void;
}

export default function SettingsView({
  nickname,
  email,
  onUpdateNickname,
  onUpdateEmail,
  onLogout
}: SettingsViewProps) {
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [tempNickname, setTempNickname] = useState(nickname);
  const [tempEmail, setTempEmail] = useState(email);
  const [showPassword, setShowPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    
    if (!tempNickname.trim()) {
      setErrorMsg('用户昵称不能为空！');
      return;
    }
    if (!tempEmail.trim()) {
      setErrorMsg('安全收据邮箱不能为空！');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempEmail)) {
      setErrorMsg('请输入有效的邮箱地址！');
      return;
    }

    onUpdateNickname(tempNickname);
    onUpdateEmail(tempEmail);
    setSuccessMsg('个人昵称与安全邮箱资料更新成功！');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleUpdatePasswords = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!oldPassword || !newPassword) {
      setErrorMsg('请输入完整密码！');
      return;
    }
    setSuccessMsg('登录安全密码修改成功！');
    setOldPassword('');
    setNewPassword('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const activeDevices = [
    { name: 'iPhone 15 Pro Max', location: '北京, 中国', ip: '103.45.12.89', time: '当前在线', current: true },
    { name: 'MacBook Pro 16" (M3 Max)', location: '上海, 中国', ip: '210.12.45.109', time: '11 分钟前', current: false }
  ];

  return (
    <PageView>
      <div className="mb-2">
        <p className="text-xs text-[#cbc4d2] opacity-75 font-medium">管理您的个人资料、系统登录安全密码、查看团队客户服务及多端登录会话</p>
      </div>

      <AnimatePresence>
        {successMsg && (
          <div className="mb-2">
            <AlertBanner message={successMsg} type="success" onClose={() => setSuccessMsg('')} />
          </div>
        )}
        {errorMsg && (
          <div className="mb-2">
            <AlertBanner message={errorMsg} type="error" onClose={() => setErrorMsg('')} />
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Profile and Password columns */}
        <div className="lg:col-span-7 space-y-6">
          {/* Profile settings Form */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-[#cfbcff]" /> 基本资料修改
            </h3>

             <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-[#cbc4d2] font-semibold uppercase tracking-wider">用户昵称 (Nickname)</label>
                  <input 
                    type="text" 
                    value={tempNickname}
                    onChange={(e) => setTempNickname(e.target.value)}
                    className="bg-[#211f24] border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#cfbcff] outline-none font-medium"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-[#cbc4d2] font-semibold uppercase tracking-wider">安全收据邮箱 (Secured Email)</label>
                  <input 
                    type="email" 
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    className="bg-[#211f24] border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#cfbcff] outline-none font-medium"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="bg-[#cfbcff] text-[#381e72] px-6 py-2.5 rounded-lg text-xs font-bold hover:brightness-110 active:scale-95 transition-all text-right ml-auto block"
              >
                保存资料修改
              </button>
            </form>
          </div>

          {/* Secure Passwords Form */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
              <Key className="w-5 h-5 text-[#cfbcff]" /> 账号登录安全密码
            </h3>

            <form onSubmit={handleUpdatePasswords} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-[#cbc4d2] font-semibold uppercase tracking-wider">原始登录密码</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="******"
                      className="w-full bg-[#211f24] border border-white/10 text-white rounded-lg pl-4 pr-10 py-2.5 text-sm focus:ring-1 focus:ring-[#cfbcff] outline-none"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-[#cbc4d2] font-semibold uppercase tracking-wider">新设定登录密码</label>
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="请输入新安全密码..."
                    className="bg-[#211f24] border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#cfbcff] outline-none"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="bg-[#cfbcff] text-[#381e72] px-6 py-2.5 rounded-lg text-xs font-bold hover:brightness-110 active:scale-95 transition-all text-right ml-auto block"
              >
                修改登录密码
              </button>
            </form>
          </div>
        </div>

        {/* Support & Device Columns */}
        <div className="lg:col-span-5 space-y-6">
          {/* 客服支持与通道 */}
          <div className="bg-[#cfbcff]/5 border border-[#cfbcff]/20 rounded-2xl p-6 flex flex-col justify-between min-h-[190px]">
            <div>
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-extrabold text-white text-sm flex items-center gap-1.5 uppercase">
                  <span className="text-[#cfbcff] text-base">💬</span> 专属在线客服支持
                </h4>
              </div>

              <p className="text-xs text-[#cbc4d2] opacity-80 leading-relaxed mb-4">
                如果您在佣金归集结算、划转或下线认购管理中有任何疑问，可随时通过安全信道连通我们的 7×24 在线客户经理。
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <a 
                href="https://t.me/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-tr from-[#6750a4] to-[#cfbcff] text-[#110e16] font-black text-xs text-center flex items-center justify-center gap-1.5 hover:brightness-110 shadow-lg active:scale-95 transition-all"
              >
                <span>联系 Telegram 客服</span>
              </a>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('TS-889425001');
                  setSuccessMsg('已自动复制您的专属白金客户工单编号: TS-889425001');
                }}
                className="py-2.5 px-4 rounded-xl border border-white/10 hover:bg-white/5 text-[#cfbcff] font-bold text-xs active:scale-[0.98] transition-all"
              >
                复制客服工单
              </button>
            </div>
          </div>

          {/* Active Devices lists & System Version combined elegantly */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#cbc4d2] flex items-center gap-1.5">
                <Smartphone className="w-4.5 h-4.5 text-[#cfbcff]" /> 当前登录设备监控
              </h4>
              <span className="text-[10px] font-mono font-bold text-[#cfbcff] bg-[#cfbcff]/10 border border-[#cfbcff]/20 px-2.5 py-0.5 rounded-full">
                v1.4.12-Stable
              </span>
            </div>

            <div className="space-y-4">
              {activeDevices.map((dev, idx) => (
                <div key={idx} className="flex justify-between items-center opacity-90 text-xs text-[#cbc4d2] border-b border-white/5 pb-3 last:border-none last:pb-0">
                  <div className="space-y-0.5">
                    <p className="font-bold text-white flex items-center gap-1.5">
                      {dev.name} {dev.current && <span className="text-[9px] font-black text-[#00e676] bg-[#00e676]/10 px-1.5 py-0.5 rounded border border-[#00e676]/25">本机</span>}
                    </p>
                    <p className="opacity-70 text-[11px]">{dev.location} · {dev.ip}</p>
                  </div>
                  <span className="font-mono text-[10px] opacity-75">{dev.time}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={onLogout}
            className="w-full py-3.5 rounded-2xl border border-rose-500/10 hover:bg-rose-500/10 text-[#ffb4ab] font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300"
          >
            <LogOut className="w-4 h-4" /> 安全登出同盟系统
          </button>
        </div>
      </div>
    </PageView>
  );
}
