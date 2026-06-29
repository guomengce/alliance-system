import { Avatar, Button, Pagination, Segmented, Table, Tag, type TableColumnsType } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CommissionHistoryItem, HistoryFilter, HistoryLedgerProps } from '../types';

const filterOptions: Array<{ label: string; value: HistoryFilter }> = [
  { label: '全部状态', value: 'all' },
  { label: '待处理', value: 'pending' },
  { label: '已到账', value: 'success' },
];

const getStatusTagClass = (status: string) => {
  if (status === 'success') return 'alliance-antd-commission-status-tag is-success';
  if (status === 'pending') return 'alliance-antd-commission-status-tag is-pending';
  return 'alliance-antd-commission-status-tag is-danger';
};

export default function HistoryLedger({
  filteredHistory,
  activeFilter,
  setActiveFilter
}: HistoryLedgerProps) {
  const columns: TableColumnsType<CommissionHistoryItem> = [
    {
      title: '流水单号',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <span className="font-mono text-xs text-[#cbc4d2]">{id}</span>,
    },
    {
      title: '来源用户',
      dataIndex: 'user',
      key: 'user',
      render: (_: string, item) => (
        <div className="flex items-center gap-2">
          <Avatar className="alliance-antd-commission-avatar" size={24}>
            {item.userLetter}
          </Avatar>
          <span className="font-semibold alliance-antd-table-fontSize text-white/90">{item.user}</span>
        </div>
      ),
    },
    {
      title: '对方订单金额',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (amount: number) => (
        <span className="font-bold alliance-antd-table-fontSize text-white font-mono">
          ¥ {amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
        </span>
      ),
    },
    {
      title: '返佣层级',
      dataIndex: 'level',
      key: 'level',
      align: 'center',
      render: (level: string) => <Tag className="alliance-antd-commission-level-tag">{level}</Tag>,
    },
    {
      title: '您的收益额',
      dataIndex: 'reward',
      key: 'reward',
      align: 'right',
      render: (reward: number) => (
        <span className="font-extrabold alliance-antd-table-fontSize text-[#00e676] font-mono">
          +¥ {reward.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
        </span>
      ),
    },
    {
      title: '结算时间',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      render: (time: string) => <span className="text-xs text-[#cbc4d2]/70 font-mono whitespace-nowrap">{time}</span>,
    },
    {
      title: '状态',
      dataIndex: 'statusLabel',
      key: 'statusLabel',
      align: 'center',
      render: (_: string, item) => (
        <Tag className={getStatusTagClass(item.status)}>
          {item.statusLabel}
        </Tag>
      ),
    },
  ];

  return (
    <section className="glass-card rounded-[24px] overflow-hidden">
      <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h4 className="text-base font-bold text-white uppercase">佣金历史流水</h4>
        <Segmented<HistoryFilter>
          className="alliance-antd-commission-filter"
          options={filterOptions}
          value={activeFilter}
          onChange={setActiveFilter}
        />
      </div>

      <div className="hidden md:block overflow-x-auto scrollbar-hide">
        <Table<CommissionHistoryItem>
          className="alliance-antd-table"
          columns={columns}
          dataSource={filteredHistory}
          pagination={false}
          rowKey="id"
        />
      </div>

      <div className="md:hidden divide-y divide-white/5 space-y-4 p-4 bg-[#1a1722]/30">
        {filteredHistory.map((item, index) => (
          <div key={item.id} className={`space-y-3 ${index > 0 ? 'pt-4' : ''}`}>
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs text-[#cbc4d2] bg-white/5 px-2 py-0.5 rounded border border-white/5">{item.id}</span>
                <div className="flex items-center gap-2 mt-2">
                  <Avatar className="alliance-antd-commission-avatar" size={24}>
                    {item.userLetter}
                  </Avatar>
                  <span className="font-semibold text-white/90 text-xs">{item.user}</span>
                </div>
              </div>
              <Tag className={getStatusTagClass(item.status)}>
                {item.statusLabel}
              </Tag>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <p className="text-[#cbc4d2]/40 text-xs font-semibold font-mono">对方订单 / 层级</p>
                <p className="text-white font-mono mt-0.5">
                  ¥ {item.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                  <Tag className="alliance-antd-commission-level-tag ml-1.5">
                    {item.level}
                  </Tag>
                </p>
              </div>
              <div>
                <p className="text-[#cbc4d2]/40 text-xs font-semibold font-mono text-right">您的收益额</p>
                <p className="text-[#00e676] font-extrabold font-mono text-right mt-0.5">
                  +¥ {item.reward.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-[#cbc4d2]/50 font-mono">
              <span>结算时间</span>
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 px-6 bg-white/2 flex items-center justify-between border-t border-white/5 text-xs text-[#cbc4d2]">
        <span>显示 1-{filteredHistory.length} 条，共 {filteredHistory.length} 条</span>
        <Pagination
          className="hidden sm:block"
          current={1}
          pageSize={filteredHistory.length || 1}
          total={filteredHistory.length}
          showSizeChanger={false}
        />
      </div>
    </section>
  );
}
