import { Button, Empty, Table, type TableColumnsType } from 'antd';

import type { Transaction } from '@/src/types';
import { RESERVES_TEXT } from './AntdReservesPanel';

interface AntdReservesDesktopProps {
  pendingWithdrawals: Transaction[];
  withdrawalFee: number;
  setSelectedWithdrawal: (withdrawal: Transaction) => void;
  onApproveWithdrawal: (id: string) => void;
  onRejectWithdrawal: (id: string) => void;
}

export default function AntdReservesDesktop({
  pendingWithdrawals,
  withdrawalFee,
  setSelectedWithdrawal,
  onApproveWithdrawal,
  onRejectWithdrawal
}: AntdReservesDesktopProps) {
  const columns: TableColumnsType<Transaction> = [
    {
      title: RESERVES_TEXT.id,
      dataIndex: 'id',
      key: 'id',
      render: (id: Transaction['id']) => <span className="font-mono font-bold text-white">{id}</span>,
    },
    {
      title: RESERVES_TEXT.uid,
      dataIndex: 'id',
      key: 'uid',
      render: (id: Transaction['id']) => <span className="font-mono text-[#cbc4d2]/80 font-bold">UID {id.slice(-6)}</span>,
    },
    {
      title: RESERVES_TEXT.gross,
      dataIndex: 'amount',
      key: 'gross',
      render: (amount: Transaction['amount']) => <span className="font-mono text-[#ffb4ab] font-bold">-{Math.abs(amount).toLocaleString()} U</span>,
    },
    {
      title: RESERVES_TEXT.fee,
      key: 'fee',
      render: () => <span className="font-mono text-[#cbc4d2]/60">{withdrawalFee} USDT</span>,
    },
    {
      title: RESERVES_TEXT.net,
      dataIndex: 'amount',
      key: 'net',
      render: (amount: Transaction['amount']) => <span className="font-mono text-emerald-400 font-extrabold">{(Math.abs(amount) - withdrawalFee).toLocaleString()} USDT</span>,
    },
    {
      title: RESERVES_TEXT.address,
      dataIndex: 'id',
      key: 'address',
      render: (id: Transaction['id']) => (
        <span className="text-[#cbc4d2]/80 font-mono text-[13px] truncate max-w-[200px] block" title="TYX78Hqskm82K1Hshq82Ksh918Ksw">
          TRC20: Tx78HqsmB...{id.slice(-4)}
        </span>
      ),
    },
    {
      title: RESERVES_TEXT.actions,
      key: 'actions',
      align: 'right',
      render: (_, withdrawal) => (
        <div className="flex justify-end gap-1.5 whitespace-nowrap">
          <Button className="alliance-antd-finance-mini-button is-purple" onClick={() => setSelectedWithdrawal(withdrawal)}>
            {RESERVES_TEXT.detail}
          </Button>
          <Button className="alliance-antd-finance-mini-button is-success" onClick={() => onApproveWithdrawal(withdrawal.id)}>
            {RESERVES_TEXT.approve}
          </Button>
          <Button className="alliance-antd-finance-mini-button is-danger" onClick={() => onRejectWithdrawal(withdrawal.id)}>
            {RESERVES_TEXT.reject}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="hidden md:block overflow-x-auto border border-white/5 bg-[#1d1925]/20 rounded-2xl pr-1">
      <Table<Transaction>
        className="alliance-antd-table alliance-antd-finance-table"
        columns={columns}
        dataSource={pendingWithdrawals}
        locale={{ emptyText: <Empty image={null} description={<span className="text-white/30 font-semibold italic text-xs">{RESERVES_TEXT.empty}</span>} /> }}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
}
