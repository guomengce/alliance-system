import { KeyRound, ShieldCheck, User } from 'lucide-react';
import type { ProfilePanelProps } from '../../types';

export function ProfilePanel({
  editingUser,
  formNickname,
  setFormNickname,
  formEmail,
  setFormEmail,
  formPhone,
  setFormPhone,
  formSponsor,
  setFormSponsor,
  formStatus,
  setFormStatus,
  formRegDate,
  formKycL1,
  setFormKycL1,
  formKycL2,
  setFormKycL2,
  onResetPasswordEmail,
}: ProfilePanelProps) {
  return (
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
                <p className="text-[13px] text-[#cbc4d2]/70 flex-1 leading-normal font-sans">
                  ℹ️ 为了全面保障用户和上级联盟链条的私密安全，管理端已废除管理员强解/写入明文密码的功能。系统只允许通过右侧按钮，引导发送改密指令和安全校验令牌到用户的注册或关联邮箱中，供其自主设置。
                </p>
                <button
                  type="button"
                  onClick={onResetPasswordEmail}
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
                  <label className="text-xs text-[#cfbcff]/80 font-bold block uppercase">L1 基础实名资质 (手机与邮箱信息)</label>
                  <select 
                    value={formKycL1}
                    onChange={(e) => setFormKycL1(e.target.value as any)}
                    className="w-full bg-[#110e16] border border-white/10 hover:border-[#cfbcff]/30 focus:border-[#cfbcff] text-white text-xs font-bold px-3 py-2.5 rounded-lg focus:outline-none cursor-pointer"
                  >
                    <option value="verified">✅ 已认证 (Verified - 基础信息已锁定)</option>
                    <option value="unverified">❌ 未核验 (Unverified - 暂缺必要安全绑定)</option>
                  </select>

                  <div className="bg-[#110e16]/80 p-3 rounded-lg border border-white/5 text-[13px] text-[#cbc4d2]/80 space-y-1 font-mono">
                    <p><span className="text-[#cbc4d2]/40">初核姓名:</span> {formNickname ? formNickname.split(' ')[0] : '李'} * 强</p>
                    <p><span className="text-[#cbc4d2]/40">证件号码:</span> 110101 ********* 291X</p>
                    <p><span className="text-[#cbc4d2]/40">绑手机号:</span> {formPhone || '未绑定'}</p>
                    <p><span className="text-[#cbc4d2]/40">绑电子邮:</span> {formEmail || '未绑定'}</p>
                  </div>
                </div>

                <div className="bg-[#1c1824] p-4 rounded-xl border border-white/5 space-y-3">
                  <label className="text-xs text-[#cfbcff]/80 font-bold block uppercase">L2 深度实名资质 (身份照、通行证与面容自证)</label>
                  <select 
                    value={formKycL2}
                    onChange={(e) => setFormKycL2(e.target.value as any)}
                    className="w-full bg-[#110e16] border border-white/10 hover:border-[#cfbcff]/30 focus:border-[#cfbcff] text-white text-xs font-bold px-3 py-2.5 rounded-lg focus:outline-none cursor-pointer"
                  >
                    <option value="verified">✅ 终审已通过 (Verified - 开启大额认购、授信极速提取)</option>
                    <option value="pending">⏳ 待后台审核 (Pending L2 - 用户已上送资质待核销)</option>
                    <option value="unverified">❌ 尚未核验 (Unverified - 不满足算力承接深度评定)</option>
                  </select>

                  <div className="bg-[#110e16]/80 p-3 rounded-lg border border-white/5 text-[13px] text-[#cbc4d2]/80 space-y-1 font-sans">
                    <p><span className="text-[#cbc4d2]/40 font-mono">上送媒介:</span> 手机端自拍提报</p>
                    <p><span className="text-[#cbc4d2]/40 font-mono">国籍/地区:</span> 中华人民共和国 (CN)</p>
                    <p><span className="text-[#cbc4d2]/40 font-mono">核验通道:</span> Tencent OCR / FaceId 集成</p>
                    <p><span className="text-[#cbc4d2]/40 font-mono">核销比对:</span> 动态活体校验相似比 98.42%</p>
                  </div>
                </div>
              </div>

              {/* Displaying visual document thumbnails */}
              <div className="bg-[#1c1824] p-5 rounded-xl border border-white/5 space-y-3">
                <span className="text-xs text-[#cfbcff] font-extrabold block uppercase tracking-wider">用户上送资质证明影印原件 (Uploaded ID Card & Handheld Photo Materials)</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#110e16] p-3 rounded-xl border border-white/10 text-center space-y-2">
                    <span className="text-xs text-[#cbc4d2]/50 block font-bold">证件正面 (国家机读人像面)</span>
                    <div className="w-full h-32 bg-[#1c1824] rounded-xl border border-white/5 flex flex-col items-center justify-center text-xs text-[#cfbcff] italic relative overflow-hidden group">
                      {formKycL2 === 'unverified' ? (
                        <span className="text-[#cbc4d2]/20">暂未上送正面物料</span>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1128] to-[#110a1b] p-3 flex flex-col justify-between text-left">
                          <div className="flex justify-between items-start">
                            <div className="w-8 h-8 rounded-full bg-[#cfbcff]/10 flex items-center justify-center border border-white/10 font-bold text-white text-xs">ID</div>
                            <span className="font-mono text-xs bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">OCR PASSED</span>
                          </div>
                          <div className="font-mono text-[8.5px] text-[#cbc4d2]/80 space-y-0.5 mt-2">
                            <p className="font-bold text-white">CN_PASSPORT_FRONT_{editingUser.uid}.JPG</p>
                            <p className="opacity-60 text-xs">MD5: c4ca4238a0b923820dcc509a6f75849b</p>
                          </div>
                          <span className="text-xs text-[#cfbcff] mt-1 font-bold hover:underline cursor-pointer">👁 放大检查原图</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#110e16] p-3 rounded-xl border border-white/10 text-center space-y-2">
                    <span className="text-xs text-[#cbc4d2]/50 block font-bold">证件反面 (带有签证印章/国徽)</span>
                    <div className="w-full h-32 bg-[#1c1824] rounded-xl border border-white/5 flex flex-col items-center justify-center text-xs text-[#cfbcff] italic relative overflow-hidden group">
                      {formKycL2 === 'unverified' ? (
                        <span className="text-[#cbc4d2]/20">暂未上送反面物料</span>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1128] to-[#110a1b] p-3 flex flex-col justify-between text-left">
                          <div className="flex justify-between items-start">
                            <div className="w-8 h-8 rounded-full bg-[#cfbcff]/10 flex items-center justify-center border border-white/10 font-bold text-white text-xs">ID</div>
                            <span className="font-mono text-xs bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">OCR PASSED</span>
                          </div>
                          <div className="font-mono text-[8.5px] text-[#cbc4d2]/80 space-y-0.5 mt-2">
                            <p className="font-bold text-white">CN_PASSPORT_BACK_{editingUser.uid}.JPG</p>
                            <p className="opacity-60 text-xs">MD5: 28c829188a0b923820dcc509a6faefbf0</p>
                          </div>
                          <span className="text-xs text-[#cfbcff] mt-1 font-bold hover:underline cursor-pointer">👁 放大检查原图</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#110e16] p-3 rounded-xl border border-white/10 text-center space-y-2">
                    <span className="text-xs text-[#cbc4d2]/50 block font-bold">手持证件自拍活体对比照片</span>
                    <div className="w-full h-32 bg-[#1c1824] rounded-xl border border-white/5 flex flex-col items-center justify-center text-xs text-[#cfbcff] italic relative overflow-hidden group">
                      {formKycL2 === 'unverified' ? (
                        <span className="text-[#cbc4d2]/20">暂未上送自拍照</span>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1128] to-[#110a1b] p-3 flex flex-col justify-between text-left">
                          <div className="flex justify-between items-start">
                            <div className="w-8 h-8 rounded-full bg-[#cfbcff]/10 flex items-center justify-center border border-white/10 font-bold text-white text-xs">LIVE</div>
                            <span className="font-mono text-xs bg-[#cfbcff]/10 text-[#cfbcff] px-1.5 py-0.5 rounded border border-[#cfbcff]/20">FACE MATCHED</span>
                          </div>
                          <div className="font-mono text-[8.5px] text-[#cbc4d2]/80 space-y-0.5 mt-2">
                            <p className="font-bold text-white">HAND_HELD_SELF_ALIGN_{editingUser.uid}.PNG</p>
                            <p className="opacity-60 text-xs">Similarity: 98.42% (FaceId API)</p>
                          </div>
                          <span className="text-xs text-[#cfbcff] mt-1 font-bold hover:underline cursor-pointer">👁 放大检查原图</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}
