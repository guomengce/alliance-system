import { Button, Input, Segmented, Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import { Copy, Search, X } from 'lucide-react';
import type { Transaction } from '../../../../types';
import type { TransactionLedgerProps } from '../types';
import { getNormalizedTypeLabel } from '../utils';

const getTypeDotClass = (type: Transaction['type']) => {
  if (type === 'recharge' || type === 'commission') return 'bg-[#00e676]';
  if (type === 'transfer') return 'bg-[#cfbcff]';
  return 'bg-[#ffb4ab]';
};

const getStatusClass = (status: Transaction['status']) => {
  if (status === 'success') return 'is-success';
  if (status === 'pending') return 'is-pending';
  if (status === 'locked') return 'is-locked';
  return 'is-failed';
};

export default function TransactionLedger({
  filteredTransactions,
  filterButtons,
  filterType,
  searchVal,
  copySuccessId,
  onFilterTypeChange,
  onSearchValChange,
  onCopyTransactionId,
  onSelectTransaction
}: TransactionLedgerProps) {
  const columns: TableColumnsType<Transaction> = [
    {
      title: '订单编号',
      dataIndex: 'id',
      render: (id: string) => {
        const isCopied = copySuccessId === id;
        return (
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-[#cfbcff] bg-[#cfbcff]/5 px-2 py-1 rounded border border-[#cfbcff]/10">
              {id}
            </span>
            <Button
              className="alliance-antd-wallet-icon-button"
              icon={<Copy className={`w-3 h-3 ${isCopied ? 'text-emerald-400' : ''}`} />}
              onClick={(e) => {
                e.stopPropagation();
                onCopyTransactionId(id);
              }}
              title="复制订单编号"
            />
            {isCopied && (
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.5 rounded">
                已复制
              </span>
            )}
          </div>
        );
      }
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (_: Transaction['type'], txn) => (
        <div className="flex items-center gap-3">
          <span className={`w-2.5 h-2.5 rounded-full ${getTypeDotClass(txn.type)}`} />
          <span className="font-semibold table-font-size text-white/90">{getNormalizedTypeLabel(txn.type, txn.typeLabel)}</span>
        </div>
      )
    },
    {
      title: '描述',
      dataIndex: 'desc',
      render: (desc: string) => <span className="alliance-antd-wallet-description-cell table-font-size font-bold text-white">{desc}</span>
    },
    {
      title: '金额',
      dataIndex: 'amount',
      align: 'right',
      render: (amount: number, txn) => {
        const isPositive = amount > 0;
        return (
          <span className={`font-mono font-bold table-font-size ${isPositive ? 'text-[#00e676]' : 'text-[#ffb4ab]'}`}>
            {isPositive ? '+' : ''} {amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} {txn.currency}
          </span>
        );
      }
    },
    {
      title: '时间',
      dataIndex: 'time',
      align: 'center',
      render: (time: string) => (
        <span className="text-xs text-[#cbc4d2]/70 font-mono whitespace-nowrap">{time}</span>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (status: Transaction['status'], txn) => (
        <Tag className={`alliance-antd-wallet-status-tag ${getStatusClass(status)}`}>
          {txn.statusLabel || status}
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'actions',
      align: 'right',
      render: (_, txn) => (
        <Button className="alliance-antd-link-button" onClick={() => onSelectTransaction(txn)}>
          详情
        </Button>
      )
    }
  ];

  return (
    <section className="glass-card rounded-2xl overflow-hidden shadow-xl">
      <div className="p-4 sm:p-6 border-b border-white/5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold tracking-tight text-white text-sm sm:text-base uppercase">交易历史 (Historical Ledger)</h3>
          <p className="text-xs sm:text-xs text-[#cbc4d2]/50">查找并筛选所有的资金账单往来记录</p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <Input
            allowClear={{ clearIcon: <X className="w-3.5 h-3.5" /> }}
            className="alliance-antd-wallet-search"
            onChange={(e) => onSearchValChange(e.target.value)}
            placeholder="搜索交易 ID 或描述..."
            prefix={<Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#cbc4d2] opacity-60" />}
            value={searchVal}
          />

          <Segmented
            className="alliance-antd-wallet-filter"
            options={filterButtons.map((btn) => ({ label: btn.label, value: btn.id }))}
            onChange={(value) => onFilterTypeChange(String(value))}
            value={filterType}
          />
        </div>
      </div>

      <Table<Transaction>
        className="alliance-antd-wallet-ledger-table hidden md:block"
        columns={columns}
        dataSource={filteredTransactions}
        locale={{
          emptyText: <span className="text-xs text-[#cbc4d2]/50 font-medium">没有找到符合条件的交易记录</span>
        }}
        pagination={false}
        rowKey="id"
      />

      <div className="md:hidden space-y-4 p-4 divide-y divide-white/5 bg-[#1a1722]/30">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((txn, index) => {
            const isPositive = txn.amount > 0;
            const isCopied = copySuccessId === txn.id;
            return (
              <div key={txn.id} className={`pt-4 ${index === 0 ? 'pt-0' : ''} space-y-3`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-semibold text-[#cfbcff] bg-[#cfbcff]/5 px-1.5 py-0.5 rounded border border-[#cfbcff]/10">
                      {txn.id}
                    </span>
                    <Button
                      className="alliance-antd-wallet-icon-button"
                      icon={<Copy className={`w-3 h-3 ${isCopied ? 'text-emerald-400' : ''}`} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopyTransactionId(txn.id);
                      }}
                    />
                    {isCopied && (
                      <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.5 rounded">
                        已复制
                      </span>
                    )}
                  </div>
                  <Tag className={`alliance-antd-wallet-status-tag is-mobile ${getStatusClass(txn.status)}`}>
                    {txn.statusLabel || txn.status}
                  </Tag>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getTypeDotClass(txn.type)}`} />
                      <span className="font-semibold text-white/90">{getNormalizedTypeLabel(txn.type, txn.typeLabel)}</span>
                    </div>
                    <p className="font-bold text-white text-[12px] sm:text-xs">{txn.desc}</p>
                    <p className="text-xs text-[#cbc4d2]/70 font-mono">{txn.time}</p>
                  </div>

                  <div className="text-right shrink-0 ml-3">
                    <span className={`font-mono font-bold block text-xs sm:text-sm ${isPositive ? 'text-[#00e676]' : 'text-[#ffb4ab]'}`}>
                      {isPositive ? '+' : ''} {txn.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} {txn.currency}
                    </span>
                    <Button className="alliance-antd-link-button mt-1" onClick={() => onSelectTransaction(txn)}>
                      详情
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 text-xs text-[#cbc4d2]/50 font-medium">
            没有找到符合条件的交易记录
          </div>
        )}
      </div>
      <div className="p-4 px-6 bg-white/2 flex items-center justify-between text-xs sm:text-xs text-[#cbc4d2]">
        <span>显示 1-{filteredTransactions.length} 条，共 {filteredTransactions.length} 条</span>
      </div>
    </section>
  );
}
