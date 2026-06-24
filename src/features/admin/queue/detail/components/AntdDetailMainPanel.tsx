import { Button, Empty, Input, InputNumber, Table, Tag, type TableColumnsType } from 'antd';
import { Activity, AlertTriangle, CheckCircle2, PenTool, Search, X } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

import type { QueueRoster, QueueTrigger } from '../../types';

interface AntdDetailMainPanelProps {
  selectedRoster: QueueRoster;
  filteredHistory: QueueTrigger[];
  isEditingData: boolean;
  calibOriginal: number;
  calibCurrent: number;
  calibUnlocked: number;
  searchQuery: string;
  setIsEditingData: Dispatch<SetStateAction<boolean>>;
  setCalibOriginal: Dispatch<SetStateAction<number>>;
  setCalibCurrent: Dispatch<SetStateAction<number>>;
  setCalibUnlocked: Dispatch<SetStateAction<number>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  onSaveDataCalibration: () => void;
}

const TEXT = {
  title: '\u6392\u961f\u5b58\u8bc1\u53ca\u76f4\u63a8\u89e6\u53d1\u7ec6\u8282\u5ba1\u6838\u7c3f',
  owner: 'OWNER UID',
  name: 'Name',
  editOff: '\u9000\u51fa\u4fee\u6b63\u6a21\u5f0f',
  editOn: '\u542f\u52a8\u6570\u636e\u4eba\u5de5\u4fee\u6b63',
  original: '\u539f\u59cb\u9501\u4ed3\u57fa\u7840\u672c\u91d1',
  current: '\u4ecd\u9501\u4ed3\u9501\u5b9a\u6392\u961f\u4e2d',
  unlocked: '\u5df2\u5b8c\u6210\u51fa\u6c34\u8f6c\u6295\u53ef\u7528',
  manualTitle: '\u6570\u636e\u4eba\u5de5\u6821\u5bf9\u53ca\u786c\u6539\u5b58\u8bc1 (Manual Override Ledger)',
  originalInput: '\u521d\u59cb\u9501\u4ed3\u672c\u91d1 (U)',
  currentInput: '\u4ecd\u6392\u961f\u9501\u5b9a\u91d1 (U)',
  unlockedInput: '\u5df2\u89e3\u9501\u91d1\u989d (U)',
  cancel: '\u53d6\u6d88\u4fee\u6539',
  save: '\u786e\u8ba4\u5bf9\u8d26\u6821\u51c6\u91cd\u5199',
  logTitle: '\u76f4\u5c5e\u4e0b\u7ebf\u8d2d\u4e70\u5957\u9910\u89e6\u53d1\u6392\u961f\u89e3\u9501\u65e5\u5fd7\u8bb0\u5f55 (Triggers List)',
  searchPlaceholder: '\u8f93\u5165UID\u3001\u6635\u79f0\u3001\u8ba2\u5355\u6216\u89e6\u53d1ID\u67e5\u627e...',
  noData: '\u672a\u68c0\u7d22\u5230\u7b26\u5408\u6761\u4ef6\u7684\u89e3\u9501\u89e6\u53d1\u65e5\u5fd7\u8bb0\u5f55',
  idColumn: '\u5355\u53f7/\u5bf9\u8d26\u6807\u8bc6',
  downlineColumn: '\u4e00\u4ee3\u76f4\u63a8\u4e0b\u5c5e',
  orderAmountColumn: '\u4e0b\u76f4\u5c5e\u8ba4\u8d2d\u603b\u989d',
  unlockedColumn: '\u6838\u7b97\u91ca\u653e (10%)',
  timeColumn: '\u4ea4\u5272\u65f6\u95f4\u8f74',
  manual: '\u5bf9\u8d26\u6821\u51c6',
};

function StatCard({ label, value, tone }: { label: string; value: number; tone: 'white' | 'warning' | 'success' }) {
  const valueClass = tone === 'success' ? 'text-emerald-400' : tone === 'warning' ? 'text-amber-400' : 'text-white';
  const labelClass = tone === 'success' ? 'text-emerald-400' : tone === 'warning' ? 'text-amber-400' : 'text-[#cbc4d2]/40';

  return (
    <div className="bg-[#110e16] p-4 rounded-2xl border border-white/5 text-center space-y-1">
      <span className={`text-[10px] ${labelClass} font-sans block`}>{label}</span>
      <span className={`text-sm font-black ${valueClass} leading-none`}>USDT {value.toLocaleString()}</span>
    </div>
  );
}

export function AntdDetailMainPanel({
  selectedRoster,
  filteredHistory,
  isEditingData,
  calibOriginal,
  calibCurrent,
  calibUnlocked,
  searchQuery,
  setIsEditingData,
  setCalibOriginal,
  setCalibCurrent,
  setCalibUnlocked,
  setSearchQuery,
  onSaveDataCalibration,
}: AntdDetailMainPanelProps) {
  const columns: TableColumnsType<QueueTrigger> = [
    {
      title: TEXT.idColumn,
      dataIndex: 'id',
      key: 'id',
      render: (_, trigger) => (
        <div>
          <p className="text-white font-bold">{trigger.id}</p>
          <p className="text-[8px] text-[#cbc4d2]/30 italic">{trigger.orderId}</p>
        </div>
      ),
    },
    {
      title: TEXT.downlineColumn,
      key: 'downline',
      render: (_, trigger) => (
        <div>
          <p className="text-white leading-none font-sans font-extrabold text-xs">{trigger.downlineUid}</p>
          <p className="text-[9px] text-[#cbc4d2]/40 font-sans truncate mt-1">{trigger.downlineNickname}</p>
        </div>
      ),
    },
    {
      title: TEXT.orderAmountColumn,
      dataIndex: 'orderAmount',
      key: 'orderAmount',
      align: 'right',
      render: (orderAmount: QueueTrigger['orderAmount']) => (
        <span className="text-[#cbc4d2]/70 font-semibold">USDT {orderAmount.toLocaleString()}</span>
      ),
    },
    {
      title: TEXT.unlockedColumn,
      dataIndex: 'unlockedAmount',
      key: 'unlockedAmount',
      align: 'right',
      render: (unlockedAmount: QueueTrigger['unlockedAmount']) => (
        <span className="text-emerald-400 font-black">+{unlockedAmount.toLocaleString()} U</span>
      ),
    },
    {
      title: TEXT.timeColumn,
      dataIndex: 'time',
      key: 'time',
      align: 'right',
      render: (time: QueueTrigger['time']) => <span className="text-[10px] text-[#cbc4d2]/45 font-mono">{time}</span>,
    },
  ];

  return (
    <div className="lg:col-span-8 glass-card p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4 text-left">
        <div>
          <h4 className="text-base font-black text-white">{TEXT.title}</h4>
          <p className="text-xs text-[#cbc4d2]/40 font-mono mt-1">
            {TEXT.owner}: {selectedRoster.uid} / {TEXT.name}: {selectedRoster.nickname}
          </p>
        </div>

        <Button
          className={`alliance-antd-queue-edit-button ${isEditingData ? 'is-active' : ''}`}
          icon={<PenTool className="w-3.5 h-3.5" />}
          onClick={() => setIsEditingData(!isEditingData)}
        >
          {isEditingData ? TEXT.editOff : TEXT.editOn}
        </Button>
      </div>

      {!isEditingData ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <StatCard label={TEXT.original} value={selectedRoster.original} tone="white" />
          <StatCard label={TEXT.current} value={selectedRoster.current} tone="warning" />
          <StatCard label={TEXT.unlocked} value={selectedRoster.unlocked} tone="success" />
        </div>
      ) : (
        <div className="bg-amber-500/[0.02] border border-amber-500/20 p-5 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs text-amber-300 pb-2 border-b border-white/5 font-sans">
            <AlertTriangle className="w-4 h-4 shrink-0 animate-bounce" />
            <p className="font-bold text-left">{TEXT.manualTitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-left">
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] text-[#cbc4d2]/50 font-sans font-bold uppercase">{TEXT.originalInput}</span>
              <InputNumber className="alliance-antd-queue-number-input" value={calibOriginal} onChange={(value) => setCalibOriginal(typeof value === 'number' ? value : 0)} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] text-amber-400 font-sans font-bold uppercase">{TEXT.currentInput}</span>
              <InputNumber className="alliance-antd-queue-number-input is-warning" value={calibCurrent} onChange={(value) => setCalibCurrent(typeof value === 'number' ? value : 0)} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] text-emerald-500 font-sans font-bold uppercase">{TEXT.unlockedInput}</span>
              <InputNumber className="alliance-antd-queue-number-input is-success" value={calibUnlocked} onChange={(value) => setCalibUnlocked(typeof value === 'number' ? value : 0)} />
            </label>
          </div>

          <div className="flex justify-end gap-3.5 pt-2 text-xs font-sans">
            <Button className="alliance-antd-queue-cancel-button" onClick={() => setIsEditingData(false)}>
              {TEXT.cancel}
            </Button>
            <Button className="alliance-antd-queue-save-button" icon={<CheckCircle2 className="w-4 h-4" />} onClick={onSaveDataCalibration}>
              {TEXT.save}
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
          <h5 className="text-[11px] font-black uppercase text-[#cfbcff] flex items-center gap-1.5 tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>{TEXT.logTitle}</span>
          </h5>

          <Input
            className="alliance-antd-queue-search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={TEXT.searchPlaceholder}
            prefix={<Search className="w-3.5 h-3.5 text-[#cbc4d2]/40" />}
            suffix={
              searchQuery ? (
                <button type="button" onClick={() => setSearchQuery('')} className="text-[#cbc4d2]/40 hover:text-white transition-colors">
                  <X className="w-3 h-3" />
                </button>
              ) : null
            }
          />
        </div>

        <div className="hidden md:block border border-white/5 rounded-2xl overflow-hidden bg-[#120f1a]/50 text-xs">
          <Table<QueueTrigger>
            className="alliance-antd-table alliance-antd-queue-history-table"
            columns={columns}
            dataSource={filteredHistory}
            pagination={false}
            rowKey="id"
            locale={{
              emptyText: (
                <Empty className="alliance-antd-empty" image={Empty.PRESENTED_IMAGE_SIMPLE} description={TEXT.noData} />
              ),
            }}
            scroll={{ y: 300 }}
          />
        </div>

        <div className="block md:hidden space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((trigger) => {
              const isManual = trigger.orderId === 'MANUAL-ADJUST' || trigger.status === 'calibrated';
              return (
                <div
                  key={trigger.id}
                  className={`p-3.5 rounded-2xl border bg-white/[0.01] text-xs font-sans space-y-2.5 transition-all ${
                    isManual ? 'border-amber-500/15 bg-amber-500/[0.01]' : 'border-white/5 bg-white/[0.005]'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 pb-2 border-b border-white/5">
                    <div>
                      <span className="text-[#cfbcff] font-extrabold text-[11px] font-mono block">{trigger.id}</span>
                      <span className="text-[#cbc4d2]/35 text-[9px] font-mono block mt-0.5 leading-none">{trigger.time}</span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-emerald-400 font-extrabold font-mono text-xs">+{trigger.unlockedAmount.toLocaleString()} USDT</span>
                      {isManual && <Tag className="alliance-antd-queue-manual-tag">{TEXT.manual}</Tag>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px] font-mono">
                    <div>
                      <span className="text-[#cbc4d2]/45 text-[9px] font-sans block leading-none mb-1">{TEXT.downlineColumn}</span>
                      <span className="text-white font-bold text-[11.5px] block">{trigger.downlineUid}</span>
                    </div>
                    <div>
                      <span className="text-[#cbc4d2]/45 text-[9px] font-sans block leading-none mb-1">{TEXT.orderAmountColumn}</span>
                      <span className="text-[#cbc4d2]/90 block text-[11px]">USDT {trigger.orderAmount.toLocaleString()}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#cbc4d2]/45 text-[9px] font-sans block leading-none mb-1">Nickname</span>
                      <span className="text-[#cbc4d2]/80 font-sans block truncate text-[11px]" title={trigger.downlineNickname}>
                        {trigger.downlineNickname}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#cbc4d2]/45 text-[9px] font-sans block leading-none mb-1">{TEXT.idColumn}</span>
                      <span className="text-white/40 block text-[10px] break-all select-all font-mono">{trigger.orderId}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-[#cbc4d2]/30 border border-white/5 rounded-2xl bg-[#120f1a]/30">
              {TEXT.noData}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
