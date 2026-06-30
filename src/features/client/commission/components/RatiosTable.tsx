import { Table, Tag, type TableColumnsType } from 'antd';
import { Percent } from 'lucide-react';
import type { CommissionRatio, RatiosTableProps } from '../types';

export default function RatiosTable({ ratios }: RatiosTableProps) {
  const columns: TableColumnsType<CommissionRatio> = [
    {
      title: '代理等级',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span className="font-bold text-[#cfbcff]">{name}</span>,
    },
    {
      title: '返佣计算比例',
      dataIndex: 'ratio',
      key: 'ratio',
      render: (ratio: string) => <span className="font-semibold text-white font-mono">{ratio}</span>,
    },
    {
      title: '结算周期',
      dataIndex: 'cycle',
      key: 'cycle',
      align: 'right',
      render: (cycle: string) => <span className="text-[#cbc4d2]/80 font-mono text-xs">{cycle}</span>,
    },
  ];

  return (
    <section className="glass-card rounded-[24px] overflow-hidden">
      <div className="p-5 px-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Percent className="w-5 h-5 text-[#cfbcff]" />
          <h4 className="text-sm md:text-base font-bold text-white">佣金下线比例说明</h4>
        </div>
        <Tag className="alliance-antd-commission-level-tag">
          当前最高层级 L5
        </Tag>
      </div>

      <div className="hidden md:block overflow-x-auto scrollbar-hide">
        <Table<CommissionRatio>
          columns={columns}
          dataSource={ratios}
          pagination={false}
          rowKey="id"
        />
      </div>

      <div className="md:hidden divide-y divide-white/5 space-y-4 p-4">
        {ratios.map((item, index) => (
          <div key={item.id} className={`space-y-2.5 ${index > 0 ? 'pt-4' : ''}`}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#cfbcff] text-sm">{item.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-[#cbc4d2]/40 text-xs font-bold font-mono">返佣计算比例</p>
                <p className="text-white font-semibold font-mono mt-0.5">{item.ratio}</p>
              </div>
              <div>
                <p className="text-[#cbc4d2]/40 text-xs font-bold font-mono text-right">结算周期</p>
                <p className="text-[#cbc4d2] font-mono mt-0.5 text-right">{item.cycle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
