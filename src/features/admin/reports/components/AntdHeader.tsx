import { Button } from 'antd';
import { BarChart2, Download } from 'lucide-react';

import type { HeaderProps } from '../types';

const TEXT = {
  title: '\u8054\u76df\u6536\u76ca\u7cbe\u7b97\u62a5\u8868\u4e0e\u8d8b\u52bf\u5ba1\u8ba1\u5206\u6790 (Report Center)',
  desc:
    '\u5168\u7f51D+1\u5206\u6da6\u6838\u7b97\u5bf9\u8d26\u3001\u8d28\u62bc\u5957\u9910\u7533\u8d2d\u5360\u6bd4\u4ee5\u53ca\u5404\u5c42\u6536\u76ca\u7a7f\u900f\u62a5\u8868\uff0c\u652f\u6301\u5373\u65f6\u5feb\u7167\u5206\u6790\u6216CSV\u5bfc\u51fa',
  export: '\u5bfc\u51fa\u5168\u5c40\u65e5\u7ed3\u7b97\u62a5\u8868 (CSV)',
};

export function AntdHeader({ onExportCSV }: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-[#cfbcff]" />
          {TEXT.title}
        </h3>
        <p className="text-xs text-[#cbc4d2]/60 mt-0.5">{TEXT.desc}</p>
      </div>
      <Button className="alliance-antd-admin-gradient-button alliance-antd-report-export-button" icon={<Download className="w-4 h-4" />} onClick={onExportCSV}>
        {TEXT.export}
      </Button>
    </div>
  );
}
