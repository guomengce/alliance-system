import { Empty, Table, Tag, type TableColumnsType } from 'antd';
import { Database } from 'lucide-react';

import { getCategoryBadge, getSeverityBadge } from '../utils';
import type { AdminLog, WorkspaceProps } from '../types';

type LogsListProps = Pick<
  WorkspaceProps,
  | 'logs'
  | 'filteredLogs'
  | 'setActiveDetailLog'
>;

const TEXT = {
  id: '\u6d41\u6c34ID',
  time: '\u65f6\u95f4\u6233',
  module: '\u5ba1\u8ba1\u6a21\u5757',
  operator: '\u64cd\u4f5c\u4eba (Operator)',
  action: '\u64cd\u4f5c\u4e8b\u9879 (Action Event)',
  severity: '\u72b6\u6001\u5e95\u518c',
  empty: '\u6ca1\u6709\u68c0\u7d22\u5230\u4efb\u4f55\u7b26\u5408\u6761\u4ef6\u7684\u8054\u76df\u5ba1\u8ba1\u65e5\u5fd7\u8bb0\u5f55',
  showing: '\u5c55\u793a',
  filtered: '\u6761\u8fc7\u6ee4\u5ba1\u8ba1\u9879',
  pool: '\u5f53\u524d\u6570\u636e\u5e93\u6c60\u9a7b\u7559',
  events: '\u4e2a\u4e8b\u4ef6',
  operatorLabel: 'Operator:',
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center gap-3 py-16">
    <div className="w-12 h-12 bg-white/2 rounded-2xl border border-white/5 flex items-center justify-center text-[#cbc4d2]/30">
      <Database className="w-6 h-6" />
    </div>
    <p className="text-[#cbc4d2]/40 text-xs font-semibold text-center px-4">
      {TEXT.empty}
    </p>
  </div>
);

const categoryTagClassName = (category: AdminLog['category']) => (
  `alliance-antd-logs-tag px-2 py-0.5 border rounded-lg text-[11px] font-black tracking-wide leading-0 whitespace-nowrap ${getCategoryBadge(category)}`
);

const severityTagClassName = (severity: AdminLog['severity']) => (
  `alliance-antd-logs-severity-tag px-2.5 py-1 text-[9.5px] uppercase font-black tracking-wider rounded-md inline-flex items-center justify-center min-w-[72px] leading-none ${getSeverityBadge(severity)}`
);

export default function AntdLogsList({
  logs,
  filteredLogs,
  setActiveDetailLog
}: LogsListProps) {
  const columns: TableColumnsType<AdminLog> = [
    {
      title: TEXT.id,
      dataIndex: 'id',
      key: 'id',
      width: '14%',
      render: (id: AdminLog['id']) => (
        <span className="select-all font-mono text-xs font-black text-[#cfbcff] truncate block" title={id}>
          {id}
        </span>
      ),
    },
    {
      title: TEXT.time,
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: '16%',
      render: (timestamp: AdminLog['timestamp']) => (
        <span className="font-mono text-xs text-[#cbc4d2]/60 whitespace-nowrap">
          {timestamp.replace(/^\d{4}-/, '')}
        </span>
      ),
    },
    {
      title: TEXT.module,
      dataIndex: 'moduleName',
      key: 'moduleName',
      width: '15%',
      render: (_, log) => (
        <span className={categoryTagClassName(log.category)}>
          {log.moduleName}
        </span>
      ),
    },
    {
      title: TEXT.operator,
      dataIndex: 'operator',
      key: 'operator',
      width: '18%',
      render: (operator: AdminLog['operator']) => (
        <span className="text-xs font-black text-white truncate block" title={operator}>
          {operator}
        </span>
      ),
    },
    {
      title: TEXT.action,
      dataIndex: 'action',
      key: 'action',
      width: '27%',
      render: (action: AdminLog['action']) => (
        <p className="font-extrabold text-white text-[13px] leading-tight truncate transition-colors" title={action}>
          {action}
        </p>
      ),
    },
    {
      title: TEXT.severity,
      dataIndex: 'severity',
      key: 'severity',
      align: 'center',
      width: '10%',
      render: (severity: AdminLog['severity']) => (
        <Tag className={severityTagClassName(severity)}>
          {severity}
        </Tag>
      ),
    },
  ];

  return (
    <div className="bg-[#16121c]/90 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
      <div className="hidden lg:block overflow-x-auto">
        <Table<AdminLog>
          className="alliance-antd-table alliance-antd-logs-table"
          columns={columns}
          dataSource={filteredLogs}
          locale={{ emptyText: <Empty image={null} description={<EmptyState />} /> }}
          onRow={(log) => ({
            onClick: () => setActiveDetailLog(log),
          })}
          pagination={false}
          rowKey="id"
          tableLayout="fixed"
        />
      </div>

      <div className="block lg:hidden divide-y divide-white/5">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-16 px-4">
            <EmptyState />
          </div>
        ) : (
          filteredLogs.map((log) => (
            <button
              key={log.id}
              type="button"
              onClick={() => setActiveDetailLog(log)}
              className="w-full text-left p-4 sm:p-5 hover:bg-white/[0.02] cursor-pointer transition-colors flex flex-col gap-3 group active:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-[#cfbcff]">
                    {log.id}
                  </span>
                  <span className="h-3 w-px bg-white/10" />
                  <span className="text-[10px] text-[#cbc4d2]/45 font-mono">
                    {log.timestamp.replace(/^\d{4}-/, '')}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`px-1.5 py-0.5 border rounded text-[9px] font-black tracking-wide leading-none whitespace-nowrap ${getCategoryBadge(log.category)}`}>
                    {log.moduleName}
                  </span>
                    <span className={`alliance-antd-logs-severity-tag px-1.5 py-0.5 text-[8.5px] uppercase font-black tracking-wider rounded inline-flex leading-none ${getSeverityBadge(log.severity)}`}>
                      {log.severity}
                    </span>
                </div>
              </div>

              <div className="space-y-1 text-left">
                <h4 className="font-extrabold text-white text-[13px] sm:text-sm group-hover:text-[#cfbcff] transition-colors leading-snug truncate">
                  {log.action}
                </h4>
              </div>

              <div className="flex items-center justify-between text-[10.5px] text-[#cbc4d2]/40 font-semibold border-t border-white/5 pt-2 mt-0.5 flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-white/45">{TEXT.operatorLabel}</span>
                  <span className="text-[#cfbcff] font-bold font-mono truncate max-w-[150px] sm:max-w-none">{log.operator}</span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      <div className="p-4 bg-[#201b2a]/20 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#cbc4d2]/40 select-none">
        <div className="font-semibold text-center sm:text-left">
          {TEXT.showing} {filteredLogs.length} {TEXT.filtered} ({TEXT.pool}: {logs.length} {TEXT.events})
        </div>
        <div className="font-mono text-[10px]">
          Node Signature: SECURE_WAF_LOGGER_V3B
        </div>
      </div>
    </div>
  );
}
