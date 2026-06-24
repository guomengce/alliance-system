import { Button, Tooltip } from 'antd';
import { Download, Plus, Terminal, Trash2 } from 'lucide-react';

import type { WorkspaceProps } from '../types';

type HeaderActionsProps = Pick<
  WorkspaceProps,
  | 'logs'
  | 'isExporting'
  | 'handleSimulateLog'
  | 'handleClearAllLogs'
  | 'handleExportLogs'
>;

const TEXT = {
  title: '\u64cd\u4f5c\u65e5\u5fd7\u4e0e\u5ba1\u8ba1\u5e95\u518c',
  desc: '\u5b89\u5168\u5b88\u62a4\u7ea7\u5e95\u5c42\u8282\u70b9\u8fd0\u7ef4\u901a\u9053\u3001\u591a\u7ea7\u7ba1\u7406\u5458\u767b\u5f55\u6d3b\u52a8\u3001\u6838\u5fc3\u5206\u6210\u53ca\u51fa\u8d26\u64cd\u4f5c\u5ba1\u8ba1\u5e95\u518c\u8bb0\u5f55',
  simulate: '\u6a21\u62df\u4ea7\u751f\u52a8\u6001\u4e8b\u4ef6',
  exporting: '\u751f\u6210\u52a0\u5bc6\u5305...',
  export: '\u5bfc\u51fa\u5ba1\u8ba1\u5e95\u518c',
  clear: '\u6e05\u7a7a\u5ba1\u8ba1\u65e5\u5fd7',
};

export default function AntdHeaderActions({
  logs,
  isExporting,
  handleSimulateLog,
  handleClearAllLogs,
  handleExportLogs
}: HeaderActionsProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Terminal className="w-6 h-6 text-[#cfbcff]" />
          {TEXT.title}
        </h2>
        <p className="text-xs text-[#cbc4d2]/60 mt-1 font-semibold">
          {TEXT.desc}
        </p>
      </div>

      <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
        <Button
          className="alliance-antd-logs-simulate-button"
          icon={<Plus className="w-3.5 h-3.5" />}
          onClick={handleSimulateLog}
        >
          {TEXT.simulate}
        </Button>

        <Button
          className="alliance-antd-logs-export-button"
          disabled={isExporting || logs.length === 0}
          icon={<Download className="w-3.5 h-3.5" />}
          onClick={handleExportLogs}
        >
          {isExporting ? TEXT.exporting : TEXT.export}
        </Button>

        <Tooltip title={TEXT.clear}>
          <Button
            aria-label={TEXT.clear}
            className="alliance-antd-logs-clear-button"
            disabled={logs.length === 0}
            icon={<Trash2 className="w-4 h-4" />}
            onClick={handleClearAllLogs}
          />
        </Tooltip>
      </div>
    </div>
  );
}
