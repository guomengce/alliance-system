import { ChevronRight } from 'lucide-react';
import type { OrdersTableProps } from '../types';

export default function OrdersTable({
  orders,
  onNavigateToTab,
  onQuickAction
}: OrdersTableProps) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden shadow-xl">
      <div className="px-6 py-4 flex items-center justify-between border-b border-white/5">
        <h4 className="text-base font-bold text-white uppercase tracking-wider">我的订单 (My Orders)</h4>
        <button 
          onClick={() => onQuickAction('orders')}
          className="text-xs text-[#cfbcff] font-semibold hover:underline flex items-center gap-1"
        >
          查看全部 <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="hidden md:block overflow-x-auto scrollbar-hide">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/3 text-[#cbc4d2]/80 text-[11px] font-bold uppercase tracking-widest border-b border-white/5">
            <tr>
              <th className="px-6 py-4">订单编号</th>
              <th className="px-4 py-4">产品名称</th>
              <th className="px-4 py-4 text-right">金额 (USDT)</th>
              <th className="px-4 py-4 text-center">日期</th>
              <th className="px-4 py-4 text-center">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/3 transition-colors group">
                <td className="px-6 py-4 font-mono font-medium text-white/90">{order.id}</td>
                <td className="px-4 py-4 text-white font-semibold">{order.name}</td>
                <td className="px-4 py-4 text-right font-bold text-white font-mono">{order.amount}</td>
                <td className="px-4 py-4 text-center text-[#cbc4d2]/75 font-mono text-xs">{order.date}</td>
                <td className="px-4 py-4 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                    order.statusType === 'pending' 
                      ? 'bg-[#6750a4]/30 text-[#cfbcff] border border-[#cfbcff]/20' 
                      : 'bg-[#e7c365]/20 text-[#e7c365] border border-[#e7c365]/20'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onNavigateToTab('subscribe')}
                    className="text-xs text-[#cfbcff] font-bold hover:underline"
                  >
                    详情
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View with Cards */}
      <div className="md:hidden divide-y divide-white/5 space-y-4 p-4 bg-[#1a1722]/30">
        {orders.map((order, index) => (
          <div key={order.id} className={`space-y-3 ${index > 0 ? 'pt-4' : ''}`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-white text-sm">{order.name}</div>
                <div className="text-[10px] text-[#cbc4d2]/50 font-mono">#{order.id}</div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                order.statusType === 'pending' 
                  ? 'bg-[#6750a4]/30 text-[#cfbcff] border border-[#cfbcff]/20' 
                  : 'bg-[#e7c365]/20 text-[#e7c365] border border-[#e7c365]/20'
              }`}>
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-[#cbc4d2]/40 text-[10px] font-semibold font-mono">购买时间</p>
                <p className="text-white/80 font-mono mt-0.5">{order.date}</p>
              </div>
              <div>
                <p className="text-[#cbc4d2]/40 text-[10px] font-semibold font-mono text-right font-sans">方案金额</p>
                <p className="text-[#cfbcff] font-bold font-mono text-right mt-0.5">{order.amount}</p>
              </div>
            </div>

            <div className="text-right pt-2 border-t border-white/5">
              <button 
                onClick={() => onNavigateToTab('subscribe')}
                className="text-xs text-[#cfbcff] font-bold hover:underline"
              >
                详情
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
