import { Button, Table, Tag, type TableColumnsType } from 'antd';
import { Eye } from 'lucide-react';

import type { DownlineMember } from '@/src/types';
import { getWalletStatusMeta, WALLETS_TEXT } from './AntdWalletsPanel';

interface AntdWalletsDesktopProps {
  members: DownlineMember[];
  handleOpenWalletDetails: (member: DownlineMember) => void;
}

export default function AntdWalletsDesktop({ members, handleOpenWalletDetails }: AntdWalletsDesktopProps) {
  const columns: TableColumnsType<DownlineMember> = [
    {
      title: WALLETS_TEXT.profile,
      dataIndex: 'uid',
      key: 'profile',
      render: (_, member) => (
        <div className="font-sans">
          <p className="font-extrabold text-white text-xs">{member.nickname || WALLETS_TEXT.unnamed}</p>
          <p className="font-mono text-xs text-[#cbc4d2]/40 mt-0.5">UID: {member.uid}</p>
        </div>
      ),
    },
    {
      title: WALLETS_TEXT.usdt,
      dataIndex: 'usdtBalance',
      key: 'usdtBalance',
      render: (value: DownlineMember['usdtBalance']) => <span className="font-mono text-emerald-400 font-extrabold">{value?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'} U</span>,
    },
    {
      title: WALLETS_TEXT.frozen,
      dataIndex: 'frozenBalance',
      key: 'frozenBalance',
      render: (value: DownlineMember['frozenBalance']) => <span className="font-mono text-cyan-400 font-extrabold">{value?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'} U</span>,
    },
    {
      title: WALLETS_TEXT.troo,
      dataIndex: 'trooBalance',
      key: 'trooBalance',
      render: (value: DownlineMember['trooBalance']) => <span className="font-mono text-[#cfbcff] font-extrabold">{value?.toLocaleString(undefined, { minimumFractionDigits: 0 }) || '0'} TROO</span>,
    },
    {
      title: WALLETS_TEXT.pending,
      dataIndex: 'pendingBalance',
      key: 'pendingBalance',
      render: (value: DownlineMember['pendingBalance']) => <span className="font-mono text-amber-500 font-bold">{value?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'} U</span>,
    },
    {
      title: WALLETS_TEXT.total,
      key: 'total',
      render: (_, member) => {
        const totalWealth = (member.usdtBalance || 0) + (member.frozenBalance || 0) + (member.pendingBalance || 0);
        return <span className="font-mono text-white font-black">USDT {totalWealth.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>;
      },
    },
    {
      title: WALLETS_TEXT.status,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: DownlineMember['status']) => {
        const meta = getWalletStatusMeta(status);
        return <Tag className={`alliance-antd-finance-status-tag ${meta.className}`}>{meta.label}</Tag>;
      },
    },
    {
      title: WALLETS_TEXT.action,
      key: 'action',
      align: 'right',
      render: (_, member) => (
        <Button
          className="alliance-antd-finance-action-button"
          icon={<Eye className="w-3.5 h-3.5" />}
          onClick={() => handleOpenWalletDetails(member)}
        >
          {WALLETS_TEXT.audit}
        </Button>
      ),
    },
  ];

  return (
    <div className="hidden md:block overflow-x-auto border border-white/5 bg-[#1d1925]/20 rounded-2xl pr-1">
      <Table<DownlineMember>
        className="alliance-antd-table alliance-antd-finance-table"
        columns={columns}
        dataSource={members}
        pagination={false}
        rowKey="uid"
      />
    </div>
  );
}
