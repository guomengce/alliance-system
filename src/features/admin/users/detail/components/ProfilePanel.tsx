import { Card, Form, Input, Select, Button, Tag } from 'antd';
import { KeyRound, ShieldCheck, User } from 'lucide-react';
import type { ProfilePanelProps } from '../../types';
import type { UserAccountStatus, KycL1Status, KycL2Status } from '../../types';

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
  const statusOptions: { value: UserAccountStatus; label: string }[] = [
    { value: 'normal', label: '正常活跃 (Active - 收益划拨与所有同盟权限全部放行)' },
    { value: 'frozen', label: '冻结受限 (Frozen - 暂停其收益下发，拦截其质押提取业务)' },
    { value: 'disabled', label: '注销禁用 (Disabled - 禁止登录平台且断开与其下级节点算力分成)' }
  ];

  const kycL1Options: { value: KycL1Status; label: string }[] = [
    { value: 'verified', label: '✅ 已认证 (Verified - 基础信息已锁定)' },
    { value: 'unverified', label: '❌ 未核验 (Unverified - 暂缺必要安全绑定)' }
  ];

  const kycL2Options: { value: KycL2Status; label: string }[] = [
    { value: 'verified', label: '✅ 终审已通过 (Verified - 开启大额认购、授信极速提取)' },
    { value: 'pending', label: '⏳ 待后台审核 (Pending L2 - 用户已上送资质待核销)' },
    { value: 'unverified', label: '❌ 尚未核验 (Unverified - 不满足算力承接深度评定)' }
  ];

  return (
    <Card className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-[#141119] space-y-5 animate-fadeIn" bordered={false}>
      <div className="flex items-center gap-2 pb-3 border-b border-white/5">
        <User className="w-5 h-5 text-[#cfbcff]" />
        <h2 className="text-sm font-bold text-white tracking-wider">用户信息</h2>
      </div>

      <Form layout="vertical" size="small" className="alliance-antd-form alliance-antd-admin-user-detail-form space-y-5 text-sm mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Form.Item label="用户昵称 (Nickname)" className="!mb-0">
            <Input
              value={formNickname}
              onChange={(e) => setFormNickname(e.target.value)}
              placeholder="请输入用户昵称"
            />
          </Form.Item>

          <Form.Item label="邮箱 (Email)" className="!mb-0">
            <Input
              type="email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              placeholder="example@alliance.com"
              className="font-mono"
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Form.Item label="手机号码 (Phone Number)" className="!mb-0">
            <Input
              value={formPhone}
              onChange={(e) => setFormPhone(e.target.value)}
              placeholder="+86 138-0000-0000"
              className="font-mono"
            />
          </Form.Item>

          <Form.Item label="对应推荐人 (Sponsor Referrer)" className="!mb-0">
            <Input
              value={formSponsor}
              onChange={(e) => setFormSponsor(e.target.value)}
              placeholder="Referrer UID (e.g., 999001)"
              className="font-mono text-[#cfbcff]"
            />
          </Form.Item>
        </div>

        <Form.Item label="登录密码重置安全管理 (Set / Reset Password)" className="!mb-0">
          <Card className="bg-[#1c1824] border border-white/5 !p-4 !rounded-xl">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <p className="text-sm text-[#cbc4d2]/70 flex-1 leading-normal font-sans">
                ℹ️ 为了全面保障用户和上级联盟链条的私密安全，管理端已废除管理员强解/写入明文密码的功能。系统只允许通过右侧按钮，引导发送改密指令和安全校验令牌到用户的注册或关联邮箱中，供其自主设置。
              </p>
              <Button
                icon={<KeyRound className="w-3.5 h-3.5" />}
                onClick={onResetPasswordEmail}
                className="bg-gradient-to-r from-[#6750a4] to-[#cfbcff] hover:brightness-110 text-white font-bold p-3 rounded-xl transition-all text-sm flex items-center gap-1.5 shrink-0 !border-0"
              >
                向该邮箱发送密码重置指令
              </Button>
            </div>
          </Card>
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Form.Item label="帐户状态" className="!mb-0">
            <Select
              value={formStatus}
              onChange={(value) => setFormStatus(value)}
              options={statusOptions}
            />
          </Form.Item>

          <Form.Item label="注册激活时间" className="!mb-0">
            <div className="w-full bg-[#1c1824] border border-white/10 text-[#cbc4d2]/60 text-sm font-mono px-3.5 py-3.5 rounded-xl select-none">
              {formRegDate || '暂未激活'}
            </div>
          </Form.Item>
        </div>

        <div className="border-t border-white/5 pt-5 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#cfbcff]" />
            <span>实名身份认证资质核定 (KYC) 与用户提交的认证资料展示</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card className="bg-[#1c1824] border border-white/5 !p-4 !rounded-xl">
              <Form.Item label="L1 基础实名资质 (手机与邮箱信息)" className="!mb-3">
                <Select
                  value={formKycL1}
                  onChange={(value) => setFormKycL1(value)}
                  options={kycL1Options}
                />
              </Form.Item>
              <Card className="bg-[#110e16]/80 border border-white/5 !p-3 !rounded-lg">
                <p className="text-sm text-[#cbc4d2]/80 font-mono">
                  <span className="text-[#cbc4d2]/40">初核姓名:</span> {formNickname ? formNickname.split(' ')[0] : '李'} * 强
                </p>
                <p className="text-sm text-[#cbc4d2]/80 font-mono">
                  <span className="text-[#cbc4d2]/40">证件号码:</span> 110101 ********* 291X
                </p>
                <p className="text-sm text-[#cbc4d2]/80 font-mono">
                  <span className="text-[#cbc4d2]/40">绑手机号:</span> {formPhone || '未绑定'}
                </p>
                <p className="text-sm text-[#cbc4d2]/80 font-mono">
                  <span className="text-[#cbc4d2]/40">绑电子邮:</span> {formEmail || '未绑定'}
                </p>
              </Card>
            </Card>

            <Card className="bg-[#1c1824] border border-white/5 !p-4 !rounded-xl">
              <Form.Item label="L2 深度实名资质 (身份照、通行证与面容自证)" className="!mb-3">
                <Select
                  value={formKycL2}
                  onChange={(value) => setFormKycL2(value)}
                  options={kycL2Options}
                />
              </Form.Item>
              <Card className="bg-[#110e16]/80 border border-white/5 !p-3 !rounded-lg">
                <p className="text-sm text-[#cbc4d2]/80 font-sans">
                  <span className="text-[#cbc4d2]/40 font-mono">上送媒介:</span> 手机端自拍提报
                </p>
                <p className="text-sm text-[#cbc4d2]/80 font-sans">
                  <span className="text-[#cbc4d2]/40 font-mono">国籍/地区:</span> 中华人民共和国 (CN)
                </p>
                <p className="text-sm text-[#cbc4d2]/80 font-sans">
                  <span className="text-[#cbc4d2]/40 font-mono">核验通道:</span> Tencent OCR / FaceId 集成
                </p>
                <p className="text-sm text-[#cbc4d2]/80 font-sans">
                  <span className="text-[#cbc4d2]/40 font-mono">核销比对:</span> 动态活体校验相似比 98.42%
                </p>
              </Card>
            </Card>
          </div>

          <Card className="bg-[#1c1824] border border-white/5 !p-5 !rounded-xl">
            <span className="text-sm text-[#cfbcff] font-extrabold block uppercase tracking-wider mb-4">用户上送资质证明影印原件 (Uploaded ID Card & Handheld Photo Materials)</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-[#110e16] border border-white/10 !p-3 !rounded-xl text-center">
                <span className="text-sm text-[#cbc4d2]/50 block font-bold mb-2">证件正面 (国家机读人像面)</span>
                {formKycL2 === 'unverified' ? (
                  <div className="w-full h-32 bg-[#1c1824] rounded-xl border border-white/5 flex items-center justify-center text-sm text-[#cbc4d2]/20">
                    暂未上送正面物料
                  </div>
                ) : (
                  <Card className="bg-gradient-to-br from-[#1a1128] to-[#110a1b] !p-3 !rounded-xl h-32">
                    <div className="flex justify-between items-start">
                      <div className="w-8 h-8 rounded-full bg-[#cfbcff]/10 flex items-center justify-center border border-white/10 font-bold text-white text-sm">ID</div>
                      <Tag color="green" className="text-sm">OCR PASSED</Tag>
                    </div>
                    <p className="font-mono text-sm text-white font-bold mt-2">CN_PASSPORT_FRONT_{editingUser.uid}.JPG</p>
                    <p className="font-mono text-sm text-[#cbc4d2]/60">MD5: c4ca4238a0b923820dcc509a6f75849b</p>
                    <span className="text-sm text-[#cfbcff] mt-1 font-bold hover:underline cursor-pointer block">👁 放大检查原图</span>
                  </Card>
                )}
              </Card>

              <Card className="bg-[#110e16] border border-white/10 !p-3 !rounded-xl text-center">
                <span className="text-sm text-[#cbc4d2]/50 block font-bold mb-2">证件反面 (带有签证印章/国徽)</span>
                {formKycL2 === 'unverified' ? (
                  <div className="w-full h-32 bg-[#1c1824] rounded-xl border border-white/5 flex items-center justify-center text-sm text-[#cbc4d2]/20">
                    暂未上送反面物料
                  </div>
                ) : (
                  <Card className="bg-gradient-to-br from-[#1a1128] to-[#110a1b] !p-3 !rounded-xl h-32">
                    <div className="flex justify-between items-start">
                      <div className="w-8 h-8 rounded-full bg-[#cfbcff]/10 flex items-center justify-center border border-white/10 font-bold text-white text-sm">ID</div>
                      <Tag color="green" className="text-sm">OCR PASSED</Tag>
                    </div>
                    <p className="font-mono text-sm text-white font-bold mt-2">CN_PASSPORT_BACK_{editingUser.uid}.JPG</p>
                    <p className="font-mono text-sm text-[#cbc4d2]/60">MD5: 28c829188a0b923820dcc509a6faefbf0</p>
                    <span className="text-sm text-[#cfbcff] mt-1 font-bold hover:underline cursor-pointer block">👁 放大检查原图</span>
                  </Card>
                )}
              </Card>

              <Card className="bg-[#110e16] border border-white/10 !p-3 !rounded-xl text-center">
                <span className="text-sm text-[#cbc4d2]/50 block font-bold mb-2">手持证件自拍活体对比照片</span>
                {formKycL2 === 'unverified' ? (
                  <div className="w-full h-32 bg-[#1c1824] rounded-xl border border-white/5 flex items-center justify-center text-sm text-[#cbc4d2]/20">
                    暂未上送自拍照
                  </div>
                ) : (
                  <Card className="bg-gradient-to-br from-[#1a1128] to-[#110a1b] !p-3 !rounded-xl h-32">
                    <div className="flex justify-between items-start">
                      <div className="w-8 h-8 rounded-full bg-[#cfbcff]/10 flex items-center justify-center border border-white/10 font-bold text-white text-sm">LIVE</div>
                      <Tag color="purple" className="text-sm">FACE MATCHED</Tag>
                    </div>
                    <p className="font-mono text-sm text-white font-bold mt-2">HAND_HELD_SELF_ALIGN_{editingUser.uid}.PNG</p>
                    <p className="font-mono text-sm text-[#cbc4d2]/60">Similarity: 98.42% (FaceId API)</p>
                    <span className="text-sm text-[#cfbcff] mt-1 font-bold hover:underline cursor-pointer block">👁 放大检查原图</span>
                  </Card>
                )}
              </Card>
            </div>
          </Card>
        </div>
      </Form>
    </Card>
  );
}
