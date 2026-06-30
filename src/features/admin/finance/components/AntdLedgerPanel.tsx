import { Button, Select } from 'antd';
import { Download, Sliders } from 'lucide-react';

import type { Transaction } from '@/src/types';
import AntdLedgerDesktop from './AntdLedgerDesktop';
import AntdLedgerMobile from './AntdLedgerMobile';

interface LedgerPanelProps {
  fullLedger: Transaction[];
  ledgerTypeFilter: string;
  setLedgerTypeFilter: (filter: string) => void;
  setSelectedLedgerItem: (item: Transaction) => void;
  exportLedgerCSV: () => void;
}

export const LEDGER_TEXT = {
  title: '\u5145\u503c\u3001\u63d0\u73b0\u3001\u6d3e\u53d1\u4f63\u91d1\u3001\u6392\u961f\u89e3\u9501\u5b8c\u6574\u603b\u6d41\u6c34\u8d26\u7c3f',
  desc: '\u8bb0\u5f55\u6bcf\u4e00\u6b21\u7f8e\u91d1\u548cTROO\u80a1\u4efd\u53d8\u52a8\uff0c\u70b9\u51fb\u5373\u53ef\u62c9\u53d6\u5355\u6761\u8bb0\u8d26\u8bc1\u4e66\u5bf9\u8d26\u3002',
  all: '\u663e\u793a\u5168\u90e8\u6d41\u6c34\u5f62\u6001',
  recharge: '\u4ec5\u663e\u793a \u5145\u503c/\u4e70\u5165\u6d41\u6c34',
  withdraw: '\u4ec5\u663e\u793a \u63d0\u5e01/\u51fa\u91d1\u6d41\u6c34',
  commission: '\u4ec5\u663e\u793a \u4e94\u4ee3\u6d3e\u4f63\u6d41\u6c34',
  lock: '\u4ec5\u663e\u793a \u6392\u961f\u89e3\u9501\u6d41\u6c34',
  export: '\u5907\u5b58\u603b\u6d41\u6c34 (CSV)',
  id: '\u8bb0\u8d26\u6d41\u6c34ID',
  type: '\u6536\u652f\u7c7b\u578b',
  descCol: '\u76df\u53cb\u8d44\u91d1\u4ea4\u5272\u8be6\u60c5\u63cf\u8ff0',
  amount: '\u4ea4\u5272\u91d1\u989d',
  currency: '\u5e01\u79cd',
  time: '\u4ea4\u6613\u5b8c\u6210\u65f6\u5206',
  detail: '\u7ec6\u8282\u8bc1\u4e66',
  voucher: '\u51ed\u8bc1',
  mobileVoucher: '\u67e5\u770b\u51ed\u8bc1',
};

const ledgerOptions = [
  { value: 'all', label: LEDGER_TEXT.all },
  { value: 'recharge', label: LEDGER_TEXT.recharge },
  { value: 'withdraw', label: LEDGER_TEXT.withdraw },
  { value: 'commission', label: LEDGER_TEXT.commission },
  { value: 'lock', label: LEDGER_TEXT.lock },
];

export const filterLedger = (fullLedger: Transaction[], ledgerTypeFilter: string) => (
  fullLedger.filter(item => ledgerTypeFilter === 'all' || item.type === ledgerTypeFilter)
);

export const getLedgerTypeClassName = (type: Transaction['type']) => {
  if (type === 'recharge') return 'is-success';
  if (type === 'withdraw') return 'is-danger';
  if (type === 'commission') return 'is-purple';
  return 'is-warning';
};

export default function AntdLedgerPanel({
  fullLedger,
  ledgerTypeFilter,
  setLedgerTypeFilter,
  setSelectedLedgerItem,
  exportLedgerCSV
}: LedgerPanelProps) {
  const filteredLedger = filterLedger(fullLedger, ledgerTypeFilter);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h4 className="text-xs uppercase tracking-wider text-white font-sans font-bold flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-[#cfbcff]" />
            {LEDGER_TEXT.title}
          </h4>
          <p className="text-xs text-[#cbc4d2]/50 mt-0.5">
            {LEDGER_TEXT.desc}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto text-xs font-sans">
          <Select
            className="alliance-antd-finance-select"
            dropdownClassName="alliance-antd-admin-select-dropdown"
            options={ledgerOptions}
            value={ledgerTypeFilter}
            onChange={setLedgerTypeFilter}
          />

          <Button
            className="alliance-antd-finance-export-button"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={exportLedgerCSV}
          >
            {LEDGER_TEXT.export}
          </Button>
        </div>
      </div>

      <AntdLedgerDesktop ledger={filteredLedger} setSelectedLedgerItem={setSelectedLedgerItem} />
      <AntdLedgerMobile ledger={filteredLedger} setSelectedLedgerItem={setSelectedLedgerItem} />
    </div>
  );
}
