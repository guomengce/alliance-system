import { Button, Input } from 'antd';
import { Globe } from 'lucide-react';

import { AntdCard } from '../../../../shared/antd/AntdCard';
import type { ApiPanelProps } from '../types';

const { TextArea } = Input;

const TEXT = {
  title: 'TROO\u80a1\u7968\u4ef7 Yahoo API \u53c2\u6570',
  desc: '\u6307\u5b9a\u8c03\u7528\u7684 Yahoo Finance \u8de8\u754c\u80a1\u7968 API \u7aef\u70b9\uff0c\u7cfb\u7edf\u6309 D+1 \u4ea4\u6613\u6536\u76d8\u5747\u4ef7\u81ea\u52a8\u52a0\u70b9\u3002',
  endpoint: 'API Endpoint Query URL',
  feedback: '\u5f53\u524d\u8c03\u8bd5\u53cd\u9988',
  connected: 'HTTP 200 Connected',
  test: '\u5b9e\u65f6\u6293\u53d6\u6d4b\u8bd5',
};

export default function AntdApiPanel({ apiPriceUrl, setApiPriceUrl, onTestApiPrice }: ApiPanelProps) {
  return (
    <AntdCard className="alliance-antd-admin-panel-card">
      <div>
        <h4 className="text-xs font-black text-[#5fc4ff] uppercase tracking-wider pb-2.5 border-b border-white/5 flex items-center gap-1">
          <Globe className="w-4 h-4 text-[#5fc4ff]" />
          {TEXT.title}
        </h4>
        <p className="text-[13px] text-[#cbc4d2]/50 leading-relaxed mt-2">{TEXT.desc}</p>

        <div className="space-y-4 mt-4 text-xs font-mono">
          <label className="flex flex-col gap-1.5">
            <span className="font-semibold text-white text-xs font-sans">{TEXT.endpoint}</span>
            <TextArea
              className="alliance-antd-admin-textarea"
              rows={3}
              value={apiPriceUrl}
              onChange={(event) => setApiPriceUrl(event.target.value)}
            />
          </label>

          <div className="flex justify-between items-center bg-[#110e16] p-2.5 rounded-xl border border-white/5 text-[13px]">
            <span className="text-[#cbc4d2]/50 font-sans">{TEXT.feedback}</span>
            <span className="text-emerald-400 font-bold font-mono">{TEXT.connected}</span>
          </div>
        </div>
      </div>

      <Button className="alliance-antd-admin-cyan-button" onClick={onTestApiPrice}>
        {TEXT.test}
      </Button>
    </AntdCard>
  );
}
