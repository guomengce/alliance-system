import React from 'react';
import { Edit } from 'lucide-react';
import { DownlineMember } from '../types';

interface DesktopTableProps {
  users: DownlineMember[];
  onStartEditing: (user: DownlineMember) => void;
  onKycAudit: (uid: string, accept: boolean) => void;
}

export default function DesktopTable({
  users,
  onStartEditing,
  onKycAudit,
}: DesktopTableProps) {
  return (
    <>
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
              {users.map(d => (
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
                              onClick={() => onKycAudit(d.uid, true)}
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
                          onClick={() => onStartEditing(d)}
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
    </>
  );
}
