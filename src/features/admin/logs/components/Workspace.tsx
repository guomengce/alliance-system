import React from 'react';
import { 
  Activity, 
  AlertCircle, 
  Trash2, 
  RefreshCw, 
  Download, 
  Database, 
  Filter, 
  Clock, 
  ArrowRight, 
  Check, 
  Settings, 
  ShieldCheck, 
  Terminal, 
  X, 
  Search, 
  Plus, 
  Eye, 
  FileText, 
  Lock, 
  Globe 
} from 'lucide-react';

import type { WorkspaceProps } from '../types';

export default function Workspace({
  logs,
  filteredLogs,
  searchQuery,
  setSearchQuery,
  selectedSeverity,
  setSelectedSeverity,
  selectedCategory,
  setSelectedCategory,
  activeDetailLog,
  setActiveDetailLog,
  isExporting,
  handleSimulateLog,
  handleClearAllLogs,
  handleExportLogs
}: WorkspaceProps) {
  // Status badges helpers
  const getSeverityBadge = (sec: string) => {
    switch (sec) {
      case 'critical':
        return 'bg-rose-500/10 text-rose-300 border border-rose-500/30';
      case 'error':
        return 'bg-red-500/10 text-red-400 border border-red-500/20';
      case 'warn':
        return 'bg-amber-500/10 text-amber-300 border border-amber-500/20';
      case 'info':
      default:
        return 'bg-sky-500/10 text-sky-300 border border-sky-500/20';
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'security':
        return 'text-[#cfbcff] border-[#cfbcff]/20 bg-[#cfbcff]/5';
      case 'finance':
        return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      case 'operation':
        return 'text-sky-300 border-sky-500/20 bg-sky-500/5';
      case 'system':
      default:
        return 'text-[#cbc4d2]/70 border-white/5 bg-white/5';
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'security': return '安全与防护';
      case 'finance': return '财务出账';
      case 'operation': return '运营事务';
      case 'system': return '核心系统';
      default: return '通用日志';
    }
  };

  return (
    <div id="admin_logs_view" className="flex flex-col gap-6 animate-fadeIn">
      {/* Top Welcome Title Grid */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Terminal className="w-6 h-6 text-[#cfbcff]" />
            操作日志与审计底册
          </h2>
          <p className="text-xs text-[#cbc4d2]/60 mt-1 font-semibold">
            安全守护级底层节点运维通道、多级管理员登录活动、核心分成及出账操作审计底册记录
          </p>
        </div>

        {/* Floating Quick Stats Indicators */}
        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          <button
            type="button"
            onClick={handleSimulateLog}
            className="px-4 py-2 bg-[#6750a4]/30 text-[#cfbcff] border border-[#cfbcff]/20 hover:bg-[#6750a4]/50 transition-all rounded-xl text-xs font-bold inline-flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            模拟产生动态事件
          </button>

          <button
            type="button"
            onClick={handleExportLogs}
            disabled={isExporting || logs.length === 0}
            className="px-4 py-2 bg-[#cfbcff]/10 text-[#cfbcff] hover:bg-[#cfbcff]/20 border border-[#cfbcff]/20 transition-all rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            {isExporting ? '生成加密包...' : '导出审计底册'}
          </button>

          <button
            type="button"
            onClick={handleClearAllLogs}
            disabled={logs.length === 0}
            className="p-2 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 transition-all rounded-xl border border-rose-500/20 flex items-center justify-center cursor-pointer active:scale-95 disabled:opacity-40 select-none"
            title="清空审计日志"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Central Quick Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#16121c] p-4 rounded-2xl border border-white/5">
          <div className="text-[10px] text-[#cbc4d2]/50 font-black uppercase tracking-wider">当前日志总数</div>
          <div className="text-lg sm:text-2xl font-mono font-black text-white mt-1.5 flex items-center gap-2">
            <Database className="w-5 h-5 text-[#cfbcff]/70" />
            {logs.length} 条
          </div>
        </div>

        <div className="bg-[#16121c] p-4 rounded-2xl border border-white/5">
          <div className="text-[10px] text-[#cbc4d2]/50 font-black uppercase tracking-wider">今日安全拦截</div>
          <div className="text-lg sm:text-2xl font-mono font-black text-amber-400 mt-1.5 flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-500/70 animate-pulse" />
            {logs.filter(l => l.severity === 'critical' || l.category === 'security').length} 次
          </div>
        </div>

        <div className="bg-[#16121c] p-4 rounded-2xl border border-white/5">
          <div className="text-[10px] text-[#cbc4d2]/50 font-black uppercase tracking-wider">异地管理员IP</div>
          <div className="text-lg sm:text-2xl font-mono font-black text-emerald-400 mt-1.5 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-500/70" />
            {new Set(logs.map(l => l.ipAddress)).size} 个
          </div>
        </div>

        <div className="bg-[#16121c] p-4 rounded-2xl border border-white/5">
          <div className="text-[10px] text-[#cbc4d2]/50 font-black uppercase tracking-wider">日志更新心跳</div>
          <div className="text-lg sm:text-2xl font-mono font-black text-sky-400 mt-1.5 flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-500/70" />
            正常 (LIVE)
          </div>
        </div>
      </div>

      {/* Search and Filters Bento Grid Panel */}
      <div className="bg-[#16121c] p-5 rounded-2xl border border-white/5 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Main search input field */}
          <div className="relative group flex-grow">
            <Search className="w-4 h-4 text-[#cbc4d2] opacity-60 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#cfbcff] transition-colors" />
            <input 
              type="text" 
              placeholder="搜索操作详情、管理员/系统、IP地址、模块名称、LOG流水号"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e1927]/90 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#cfbcff]/50 focus:ring-1 focus:ring-[#cfbcff]/20 transition-all font-semibold"
            />
          </div>

          {/* Selector filters split rows */}
          <div className="flex items-center gap-3 flex-wrap w-full md:w-auto justify-start md:justify-end">
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <span className="text-[10px] text-[#cbc4d2]/50 font-bold uppercase tracking-wider inline-flex items-center gap-1 shrink-0">
                <Filter className="w-3 h-3 text-[#cfbcff]" /> 等级:
              </span>
              {/* Desktop Level Filter Button Group */}
              <div className="hidden sm:flex bg-[#201b2a] rounded-xl p-0.5 border border-white/5 shrink-0">
                {['All', 'info', 'warn', 'error', 'critical'].map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setSelectedSeverity(sev)}
                    className={`px-3 py-1 text-[11px] font-black rounded-lg transition-all capitalize select-none cursor-pointer ${
                      selectedSeverity === sev
                        ? 'bg-[#6750a4] text-white'
                        : 'text-[#cbc4d2]/50 hover:text-white'
                    }`}
                  >
                    {sev === 'All' ? '全部' : sev}
                  </button>
                ))}
              </div>
              {/* Mobile Level Filter Dropdown Selector */}
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="flex sm:hidden w-full bg-[#201b2a] border border-white/10 text-xs text-[#cbc4d2] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#cfbcff]/40 cursor-pointer font-semibold"
              >
                <option value="All">全部等级 (All)</option>
                <option value="info">Info (信息)</option>
                <option value="warn">Warn (警告)</option>
                <option value="error">Error (错误)</option>
                <option value="critical">Critical (核心拦截)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <span className="text-[10px] text-[#cbc4d2]/50 font-bold uppercase tracking-wider inline-flex items-center gap-1 shrink-0">
                类别:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#201b2a] border border-white/10 text-xs text-[#cbc4d2] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#cfbcff]/40 cursor-pointer font-semibold w-full sm:w-auto"
              >
                <option value="All">全部类别</option>
                <option value="security">安全与防护</option>
                <option value="finance">财务出账</option>
                <option value="operation">运营事务</option>
                <option value="system">核心系统</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Main Logs Table / Card Grid container */}
      <div className="bg-[#16121c]/90 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        {/* 1. Desktop structured table layout (visible only at screen >= lg) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="border-b border-white/5 bg-[#201b2a]/30 text-[10px] text-[#cbc4d2]/50 uppercase tracking-wider font-extrabold select-none">
                <th className="py-4 px-5 w-[14%]">流水ID</th>
                <th className="py-4 px-4 w-[16%]">时间戳</th>
                <th className="py-4 px-4 w-[15%]">审计模块</th>
                <th className="py-4 px-4 w-[18%]">操作人 (Operator)</th>
                <th className="py-4 px-4 w-[27%]">操作事项 (Action Event)</th>
                <th className="py-4 px-4 w-[10%] text-center">状态底册</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 bg-white/2 rounded-2xl border border-white/5 flex items-center justify-center text-[#cbc4d2]/30">
                        <Database className="w-6 h-6" />
                      </div>
                      <p className="text-[#cbc4d2]/40 text-xs font-semibold">没有检索到任何符合条件的联盟审计日志记录</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr 
                    key={log.id}
                    onClick={() => setActiveDetailLog(log)}
                    className="border-b border-white/2 hover:bg-white/[0.02] cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-5 select-all font-mono text-xs font-black text-[#cfbcff] group-hover:underline truncate" title={log.id}>
                      {log.id}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-[#cbc4d2]/60 whitespace-nowrap">
                      {log.timestamp.replace(/^\d{4}-/, '')}
                    </td>
                    <td className="py-3.5 px-4 truncate">
                      <span className={`px-2 py-0.5 border rounded-lg text-[11px] font-black tracking-wide leading-0 whitespace-nowrap ${getCategoryBadge(log.category)}`}>
                        {log.moduleName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-black text-white truncate" title={log.operator}>
                      {log.operator}
                    </td>
                    <td className="py-3.5 px-4 text-xs">
                      <p className="font-extrabold text-white text-[13px] leading-tight group-hover:text-[#cfbcff] transition-colors truncate" title={log.action}>
                        {log.action}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-[9.5px] uppercase font-black tracking-wider rounded-md inline-flex items-center justify-center min-w-[72px] leading-none ${getSeverityBadge(log.severity)}`}>
                        {log.severity}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 2. Responsive Cards layout stack (visible only on screen < lg) */}
        <div className="block lg:hidden divide-y divide-white/5">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white/2 rounded-2xl border border-white/5 flex items-center justify-center text-[#cbc4d2]/30 animate-pulse">
                  <Database className="w-6 h-6" />
                </div>
                <p className="text-[#cbc4d2]/40 text-xs font-semibold">没有检索到任何符合条件的联盟审计日志记录</p>
              </div>
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div 
                key={log.id}
                onClick={() => setActiveDetailLog(log)}
                className="p-4 sm:p-5 hover:bg-white/[0.02] cursor-pointer transition-colors flex flex-col gap-3 group active:bg-white/[0.04]"
              >
                {/* ID badge and Categories Header Row */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-[#cfbcff] lg:group-hover:underline">
                      {log.id}
                    </span>
                    <span className="h-3 w-px bg-white/10" />
                    <span className="text-[10px] text-[#cbc4d2]/45 font-mono">{log.timestamp.replace(/^\d{4}-/, '')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`px-1.5 py-0.5 border rounded text-[9px] font-black tracking-wide leading-none whitespace-nowrap ${getCategoryBadge(log.category)}`}>
                      {log.moduleName}
                    </span>
                    <span className={`px-1.5 py-0.5 text-[8.5px] uppercase font-black tracking-wider rounded inline-flex leading-none ${getSeverityBadge(log.severity)}`}>
                      {log.severity}
                    </span>
                  </div>
                </div>

                {/* Brief description column */}
                <div className="space-y-1 text-left">
                  <h4 className="font-extrabold text-white text-[13px] sm:text-sm group-hover:text-[#cfbcff] transition-colors leading-snug truncate">
                    {log.action}
                  </h4>
                </div>

                {/* Footer specs metadata */}
                <div className="flex items-center justify-between text-[10.5px] text-[#cbc4d2]/40 font-semibold border-t border-white/5 pt-2 mt-0.5 flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white/45">Operator:</span>
                    <span className="text-[#cfbcff] font-bold font-mono truncate max-w-[150px] sm:max-w-none">{log.operator}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Statistics bottom footer */}
        <div className="p-4 bg-[#201b2a]/20 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#cbc4d2]/40 select-none">
          <div className="font-semibold text-center sm:text-left">
            展示 {filteredLogs.length} 条过滤审计项 （当前数据库池驻留：{logs.length} 个事件）
          </div>
          <div className="font-mono text-[10px]">
            Node Signature: SECURE_WAF_LOGGER_V3B
          </div>
        </div>
      </div>

      {/* Audit Detail Inspector Drawer / Modal */}
      {activeDetailLog && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          {/* Backdrop screen filter lock */}
          <div 
            onClick={() => setActiveDetailLog(null)}
            className="absolute inset-0 bg-black/75 backdrop-blur-md transition-all"
          />
          
          {/* Modal dialog core card content with adaptive heights and custom scrollbars */}
          <div className="bg-[#120f18] rounded-3xl border border-[#cfbcff]/20 max-w-xl w-full p-5 sm:p-7 relative shadow-2xl overflow-hidden animate-scaleUp z-10 flex flex-col gap-4 max-h-[92vh]">
            
            {/* Header: Log Identification Title and Close lock */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#cfbcff]/10 border border-[#cfbcff]/20 flex items-center justify-center text-[#cfbcff]">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight uppercase">
                    审计底册深度透视
                  </h3>
                  <p className="text-[10px] font-mono text-[#cfbcff]/60 font-bold tracking-widest mt-0.5">
                    ID: {activeDetailLog.id}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveDetailLog(null)}
                className="p-1.5 bg-white/5 hover:bg-white/10 transition-colors text-[#cbc4d2] hover:text-white rounded-lg cursor-pointer outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable central content wrapper */}
            <div className="flex-grow overflow-y-auto space-y-4 pr-1.5 custom-scrollbar pb-1 text-left">
              {/* Structured Specifications Matrix */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">事件时间戳</span>
                  <span className="font-mono text-white tracking-tight block break-all">{activeDetailLog.timestamp}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">审计级别 / Severity</span>
                  <span className="block mt-0.5">
                    <span className={`px-2 py-0.5 text-[9.5px] uppercase font-black tracking-wider rounded-md leading-none ${getSeverityBadge(activeDetailLog.severity)}`}>
                      {activeDetailLog.severity}
                    </span>
                  </span>
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">操作触发人 (Operator)</span>
                  <span className="font-black text-white tracking-tight block truncate max-w-full" title={activeDetailLog.operator}>
                    {activeDetailLog.operator}
                  </span>
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">发起端 IP 签名</span>
                  <span className="font-mono text-white tracking-tight block">{activeDetailLog.ipAddress}</span>
                </div>
              </div>

              {/* Narrative text fields */}
              <div className="space-y-1">
                <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">操作基本事项</span>
                <p className="text-sm font-black text-white leading-tight">
                  {activeDetailLog.action}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">透视事件详细叙述 (Details)</span>
                <p className="text-xs sm:text-[13px] text-[#cbc4d2]/85 leading-relaxed font-semibold whitespace-pre-wrap break-all">
                  {activeDetailLog.details}
                </p>
              </div>

              {/* Code Block Container for Event Payload Packet */}
              {activeDetailLog.payload && (
                <div className="space-y-1.5 animate-fadeIn">
                  <span className="text-[10px] text-[#cbc4d2]/45 font-bold uppercase tracking-wider block">底层节点 JSON 加密报文主体</span>
                  <div className="bg-[#0b080f] rounded-xl border border-white/5 p-3.5 font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-44 custom-scrollbar relative leading-relaxed tab-size-2">
                    <pre className="whitespace-pre text-left">{activeDetailLog.payload}</pre>
                    <span className="absolute top-2 right-2 text-[9px] font-bold text-white/20 select-none">SECURE_BLOCK_DATA</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer triggers */}
            <div className="flex gap-3 justify-end pt-3 border-t border-white/5 mt-0.5 shrink-0 select-none">
              <button
                type="button"
                onClick={() => setActiveDetailLog(null)}
                className="px-5 py-2 bg-[#cfbcff] text-[#24134c] hover:bg-[#ebdfff] active:scale-95 transition-all text-xs font-extrabold rounded-xl cursor-pointer"
              >
                我知道了
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
