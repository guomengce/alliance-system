import React from 'react';
import { BarChart2, Download } from 'lucide-react';

export default function AdminReportsView() {
  const exportMockCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "结算日,关联订单量,派发总额(USDT),核对状态\r\n";
    const logs = [
      { date: '2026-05-28', count: 12, total: 48900.00, status: 'completed' },
      { date: '2026-05-27', count: 8, total: 19500.00, status: 'completed' },
      { date: '2026-05-26', count: 15, total: 55000.00, status: 'completed' }
    ];
    logs.forEach(l => {
      csvContent += `${l.date},${l.count},${l.total},${l.status}\r\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `settlement_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="admin_reports_view" className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 animate-fadeIn flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[#cfbcff]" />
            联盟收益精算报表与趋势审计分析 (Report Center)
          </h3>
          <p className="text-xs text-[#cbc4d2]/60 mt-0.5">
            全网D+1分润核算对账、质押套餐申购占比以及各层收益穿透报表，支持即时快照分析或CSV导出
          </p>
        </div>
        <button 
          onClick={exportMockCSV}
          className="bg-gradient-to-r from-[#6750a4] to-[#cfbcff] text-white hover:opacity-90 px-4 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg w-full sm:w-auto justify-center"
        >
          <Download className="w-4 h-4" /> 导出全局日结算报表 (CSV)
        </button>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#1c1824] border border-white/5 p-4 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-[#cbc4d2]/40 tracking-wider font-sans">L1-L5 跨级结算发放率</span>
          <p className="text-xl font-bold font-mono text-emerald-400 mt-1">99.85%</p>
          <p className="text-[10px] text-white/30 mt-1">昨日顺利自动核销完成</p>
        </div>
        <div className="bg-[#1c1824] border border-white/5 p-4 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-[#cbc4d2]/40 tracking-wider font-sans">今日累计风控溢出总量</span>
          <p className="text-xl font-bold font-mono text-orange-400 mt-1">2,400.00 USDT</p>
          <p className="text-[10px] text-white/30 mt-1">已全自动流转归属于公司平衡池</p>
        </div>
        <div className="bg-[#1c1824] border border-white/5 p-4 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-[#cbc4d2]/40 tracking-wider font-sans">TROO股票公摊均线价</span>
          <p className="text-xl font-bold font-mono text-white mt-1">$0.1250 USD</p>
          <p className="text-[10px] text-[#cbc4d2]/40 mt-1">7日内行情波动范围：0.11 - 0.14</p>
        </div>
        <div className="bg-[#1c1824] border border-white/5 p-4 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-[#cbc4d2]/40 tracking-wider font-sans">全网质押总流转池</span>
          <p className="text-xl font-bold font-mono text-teal-300 mt-1">12,854,000 USDT</p>
        </div>
      </div>

      {/* visual elements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1622] rounded-2xl p-5 border border-white/5">
          <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 pb-2 border-b border-white/5 font-sans">套餐大宗认购比例饼图分析</h4>
          <div className="space-y-3">
            {[
              { label: '套餐 C (黄金大包 - $10,000)', val: '45%', barWidth: 'w-[45%]', color: 'bg-[#cfbcff]' },
              { label: '套餐 B (中级大包 - $5,000)', val: '25%', barWidth: 'w-[25%]', color: 'bg-indigo-400' },
              { label: '套餐 D (机构高级 - $30,000)', val: '15%', barWidth: 'w-[15%]', color: 'bg-emerald-400' },
              { label: '套餐 E (超级旗舰级 - $50,000)', val: '10%', barWidth: 'w-[10%]', color: 'bg-amber-400' },
              { label: '套餐 A (体验大包 - $1,000)', val: '5%', barWidth: 'w-[5%]', color: 'bg-rose-400' },
            ].map((item, idx) => (
              <div key={idx} className="text-xs space-y-1 font-sans">
                <div className="flex justify-between font-bold text-[#cbc4d2]/85">
                  <span>{item.label}</span>
                  <span className="font-mono text-white">{item.val}</span>
                </div>
                <div className="w-full bg-[#110e16] h-2.5 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full ${item.barWidth}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1622] rounded-2xl p-5 border border-white/5 space-y-4">
          <h4 className="text-xs font-black text-white uppercase tracking-wider pb-2 border-b border-white/5 font-sans">联盟D+1分润发放记录（最近三期）</h4>
          <div className="space-y-3.5">
            {[
              { period: '2026-05-28 运营报表', count: '12 仓申购份数', total: '48,900.00 USDT', profit: '19,560.00 USDT', status: '审计核对无差额' },
              { period: '2026-05-27 运营报表', count: '8 仓申购份数', total: '19,500.00 USDT', profit: '7,800.00 USDT', status: '审计核对无差额' },
              { period: '2026-05-26 运营报表', count: '15 仓申购份数', total: '55,000.00 USDT', profit: '22,000.00 USDT', status: '审计核对无差额' },
            ].map((log, index) => (
              <div key={index} className="flex justify-between items-center text-xs bg-[#211c2b]/50 p-3 rounded-xl border border-white/2 font-sans">
                <div className="space-y-1">
                  <p className="font-bold text-white">{log.period}</p>
                  <p className="text-[10px] text-[#cbc4d2]/50 font-mono">D+1大盘账面流转量：{log.total} ({log.count})</p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-emerald-400 font-mono">{log.profit}</p>
                  <span className="text-[9px] text-[#cfbcff] font-bold">{log.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
