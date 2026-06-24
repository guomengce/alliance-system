import { Card } from 'antd';
import { DollarSign, Sliders } from 'lucide-react';

const TEXT = {
  title: '\u667a\u80fd\u6821\u5bf9\u76d1\u63a7\u89c4\u8303',
  desc:
    '\u6392\u961f\u961f\u5217\u7531 10% \u76f4\u63a8\u89e6\u53d1\u673a\u5236\u79d2\u7ea7\u4ea4\u5272\u3002\u5f53\u60a8\u7684\u4e0b\u7ea7\u6210\u5458\u8ba4\u8d2d\u6210\u529f\uff0c\u667a\u80fd\u5408\u7ea6\u5c06\u7acb\u5373\u6267\u884c\u51fa\u6c34\u52a8\u4f5c\uff0c\u5bf9\u51b2\u5e76\u51cf\u514d\u76f8\u5e94\u7684\u6392\u961f\u5f85\u91ca\u653e\u91cf\u3002',
  formulaTitle: '\u672c\u5355\u89e3\u9501\u5b9e\u540d\u5bf9\u8d26\u5f0f',
  formulaDesc:
    '\u82e5\u76f4\u8f96\u4e00\u4ee3\u73a9\u5bb6\u4e0b\u5355\u9000\u6b3e\u6216\u7531\u4e8e\u8d22\u52a1\u7279\u6b8a\u6d41\u8f6c\u9700\u8981\u7ea0\u6b63\uff0c\u53ef\u8fdb\u5165\u4fee\u6539\u6a21\u5f0f\u624b\u5de5\u4fee\u6b63\uff0c\u5269\u4f59\u9501\u4ed3\u4e0e\u89e3\u9501\u989d\u5c06\u5728\u7528\u6237\u5ba2\u6237\u7aef\u65e0\u5ef6\u8fdf\u5237\u65b0\u3002',
  riskTitle: '\u7ed3\u7b97\u98ce\u63a7\u63d0\u793a',
  riskDesc:
    '\u6240\u6709\u7684\u624b\u5de5\u4fee\u6b63\u884c\u4e3a\u5747\u4f1a\u751f\u6210\u72ec\u7279\u7684 TRIG-CAL \u6821\u6b63\u5bf9\u9f50\u6d41\u6c34\u5355\u53f7\u8fdb\u884c\u5f52\u6863\uff0c\u591a\u6838\u8d26\u7c3f\u4fdd\u6301\u7ebf\u4e0a\u7ebf\u4e0b\u903b\u8f91\u4e00\u81f4\u3002',
};

export function AntdCalibrationGuidePanel() {
  return (
    <Card className="alliance-antd-queue-side-card lg:col-span-4">
      <div className="space-y-4">
        <h4 className="text-xs font-black text-[#f1bf50] flex items-center gap-1.5 uppercase tracking-wider font-sans border-b border-white/5 pb-2">
          <Sliders className="w-4 h-4 text-[#f1bf50]" />
          <span>{TEXT.title}</span>
        </h4>
        <div className="text-xs text-[#cbc4d2]/70 space-y-4 leading-relaxed font-sans">
          <p>{TEXT.desc}</p>
          <div className="p-3 bg-[#110e16] rounded-xl border border-white/5 space-y-2">
            <p className="font-extrabold text-white text-[10.5px]">{TEXT.formulaTitle}</p>
            <p className="text-[10px] leading-relaxed text-[#cbc4d2]/60">{TEXT.formulaDesc}</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-[#6750a4]/5 border border-[#6750a4]/10 rounded-xl text-xs text-[#cbc4d2] space-y-1.5 font-sans">
        <p className="font-bold text-[#cfbcff] flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-[#cfbcff]" />
          <span>{TEXT.riskTitle}</span>
        </p>
        <p className="text-[#cbc4d2]/75 leading-relaxed text-[11px]">{TEXT.riskDesc}</p>
      </div>
    </Card>
  );
}
