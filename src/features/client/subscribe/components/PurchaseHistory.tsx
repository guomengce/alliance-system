import { Button, Progress, Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import type { Purchase, WorkspaceProps } from '../types';

type PurchaseHistoryProps = Pick<
  WorkspaceProps,
  | 'purchases'
  | 'copiedId'
  | 'setDetailModalItem'
  | 'handleCopyText'
>;

const getStatusClass = (purchase: Purchase) => {
  if (purchase.statusType === 'success') return 'is-success';
  if (purchase.statusType === 'failed') return 'is-failed';
  return 'is-running';
};

export default function PurchaseHistory({
  purchases,
  copiedId,
  setDetailModalItem,
  handleCopyText
}: PurchaseHistoryProps) {
  const columns: TableColumnsType<Purchase> = [
    {
      title: '订单编号',
      dataIndex: 'id',
      render: (id: string) => {
        const isCopied = copiedId === id;
        return (
          <div className="flex items-center gap-1.5">
            <span className="font-mono font-bold table-font-size text-white/90 select-all">{id}</span>
            <Button
              className="alliance-antd-subscribe-copy-button"
              onClick={() => handleCopyText(id)}
              title="复制订单编号"
            >
              {isCopied ? '已复制' : '复制ID'}
            </Button>
          </div>
        );
      }
    },
    {
      title: '方案产品',
      dataIndex: 'name',
      render: (name: string) => <span className="font-bold table-font-size text-white">{name}理财</span>
    },
    {
      title: '金额 (USDT)',
      dataIndex: 'amount',
      align: 'right',
      render: (amount: number) => (
        <span className="font-bold table-font-size text-white font-mono">{amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
      )
    },
    {
      title: '赠送比例',
      dataIndex: 'giftRatio',
      align: 'right',
      render: (giftRatio: number) => <span className="font-medium table-font-size text-[#cfbcff] font-mono">{giftRatio}%</span>
    },
    {
      title: '预计 TROO',
      dataIndex: 'troo',
      align: 'right',
      render: (troo: number) => <span className="font-bold table-font-size text-emerald-400 font-mono">{troo.toLocaleString()}</span>
    },
    {
      title: '日期时间',
      dataIndex: 'date',
      align: 'center',
      render: (date: string) => <span className="text-[#cbc4d2]/75 font-mono text-xs">{date}</span>
    },
    {
      title: '买入进度',
      dataIndex: 'progress',
      align: 'center',
      render: (progress: number) => (
        <div className="flex items-center gap-2 justify-center max-w-[120px] mx-auto">
          <Progress
            className="alliance-antd-subscribe-progress"
            percent={progress}
            showInfo={false}
            size="small"
            strokeColor={progress > 0 ? '#8b5ed7' : '#3a373f'}
            trailColor="rgba(54, 52, 58, 0.72)"
          />
          <span className="text-xs font-mono text-white/70">{progress}%</span>
        </div>
      )
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      align: 'center',
      render: (_: string, purchase) => (
        <Tag className={`alliance-antd-subscribe-status-tag ${getStatusClass(purchase)}`}>
          {purchase.status}
        </Tag>
      )
    },
    {
      title: '管理操作',
      key: 'actions',
      align: 'right',
      render: (_, purchase) => (
        <Button className="alliance-antd-subscribe-detail-button" onClick={() => setDetailModalItem(purchase)}>
          详情
        </Button>
      )
    }
  ];

  return (
    <section className="glass-card rounded-2xl overflow-hidden shadow-xl mt-6">
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-white/5">
        <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">认购记录 (Purchase History)</h4>
        <span className="text-xs text-[#cbc4d2]/50 font-mono bg-white/5 px-2.5 py-1 rounded-lg">
          共 {purchases.length} 个订单
        </span>
      </div>

      <Table<Purchase>
        className="hidden md:block"
        columns={columns}
        dataSource={purchases}
        pagination={false}
        rowKey="id"
      />

      <div className="md:hidden divide-y divide-white/5 space-y-4 p-4 bg-[#1a1722]/30">
        {purchases.map((purchase, index) => (
          <div key={purchase.id} className={`space-y-3.5 ${index > 0 ? 'pt-4' : ''}`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="font-extrabold text-white text-[13px] sm:text-sm">{purchase.name} 认购计划</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs sm:text-xs text-[#cbc4d2]/50 font-mono">#{purchase.id}</span>
                  <Button className="alliance-antd-subscribe-mobile-link-button" onClick={() => handleCopyText(purchase.id)}>
                    {copiedId === purchase.id ? '已复制' : '复制'}
                  </Button>
                </div>
              </div>
              <Tag className={`alliance-antd-subscribe-status-tag is-mobile ${getStatusClass(purchase)}`}>
                {purchase.status}
              </Tag>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-xs bg-[#120f17]/50 rounded-xl p-2.5 sm:p-3 border border-white/5">
              <div>
                <p className="text-[#cbc4d2]/40 text-[8.5px] sm:text-xs font-bold uppercase">认购时间</p>
                <p className="text-white/80 font-mono mt-0.5 text-xs sm:text-xs">{purchase.date}</p>
              </div>
              <div>
                <p className="text-[#cbc4d2]/40 text-[8.5px] sm:text-xs font-bold uppercase text-right">方案金额</p>
                <p className="text-[#cfbcff] font-bold font-mono text-right mt-0.5 text-xs sm:text-xs">{purchase.amount.toLocaleString()} USDT</p>
              </div>
              <div>
                <p className="text-[#cbc4d2]/40 text-[8.5px] sm:text-xs font-bold uppercase">获赠比例</p>
                <p className="text-white/80 font-mono mt-0.5 text-xs sm:text-xs">{purchase.giftRatio}%</p>
              </div>
              <div>
                <p className="text-[#cbc4d2]/40 text-[8.5px] sm:text-xs font-bold uppercase text-right">预计 TROO</p>
                <p className="text-emerald-400 font-bold font-mono text-right mt-0.5 text-xs sm:text-xs">+{purchase.troo.toLocaleString()} TROO</p>
              </div>
              <div className="col-span-2 pt-1.5 border-t border-white/5 flex items-center justify-between">
                <span className="text-[#cbc4d2]/40 text-[8.5px] sm:text-xs font-bold uppercase">买入进度</span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Progress
                    className="alliance-antd-subscribe-progress w-16 sm:w-20"
                    percent={purchase.progress}
                    showInfo={false}
                    size="small"
                    strokeColor={purchase.progress > 0 ? '#8b5ed7' : '#3a373f'}
                    trailColor="rgba(54, 52, 58, 0.72)"
                  />
                  <span className="text-xs sm:text-xs font-mono font-bold text-white/90">{purchase.progress}%</span>
                </div>
              </div>
            </div>

            <div className="text-right pt-2 border-t border-white/5">
              <Button className="alliance-antd-subscribe-detail-button is-mobile" onClick={() => setDetailModalItem(purchase)}>
                查看订单详情
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
