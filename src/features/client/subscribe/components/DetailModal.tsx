import { Button, Progress, Tag } from 'antd';
import { AnimatePresence, motion } from 'motion/react';
import { PlayCircle, X } from 'lucide-react';
import type { Purchase, WorkspaceProps } from '../types';

type DetailModalProps = Pick<
  WorkspaceProps,
  | 'detailModalItem'
  | 'copiedId'
  | 'setDetailModalItem'
  | 'handleCopyText'
  | 'handleConfirmPurchase'
>;

const getStatusClass = (purchase: Purchase) => {
  if (purchase.isConfirmation) return 'is-warning';
  if (purchase.statusType === 'success') return 'is-success';
  if (purchase.statusType === 'failed') return 'is-failed';
  return 'is-running';
};

export default function DetailModal({
  detailModalItem,
  copiedId,
  setDetailModalItem,
  handleCopyText,
  handleConfirmPurchase
}: DetailModalProps) {
  return (
    <AnimatePresence>
      {detailModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDetailModalItem(null)}
            className="absolute inset-0 bg-black/65 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg bg-[#211f24] border border-[#cfbcff]/20 rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <Button
              className="alliance-antd-subscribe-modal-close"
              icon={<X className="w-5 h-5" />}
              onClick={() => setDetailModalItem(null)}
            />

            <div className="flex items-center gap-2.5 mb-5 select-none pb-2 border-b border-white/5">
              <PlayCircle className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#cfbcff]" />
              <h3 className="text-sm sm:text-base font-extrabold text-white tracking-wide uppercase">
                {detailModalItem.isConfirmation ? '确认认购详情及协议' : '理财合约订单明细'}
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-xs">
              <div className="bg-[#141218] p-3.5 sm:p-4 rounded-xl border border-white/5 flex justify-between items-center">
                <div>
                  <span className="text-xs sm:text-xs text-[#cbc4d2]/40 font-bold uppercase block">方案名称</span>
                  <span className="text-sm sm:text-base font-black text-white block mt-0.5">{detailModalItem.name} 专属合约</span>
                </div>
                <div className="text-right">
                  <span className="text-xs sm:text-xs text-[#cbc4d2]/40 font-bold uppercase block">当前状态</span>
                  <Tag className={`alliance-antd-subscribe-status-tag mt-1 ${getStatusClass(detailModalItem)}`}>
                    {detailModalItem.isConfirmation ? '待确认签署' : detailModalItem.status}
                  </Tag>
                </div>
              </div>

              <div className="space-y-3 bg-white/3 p-3.5 sm:p-4 rounded-xl border border-white/5 text-xs sm:text-xs">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[#cbc4d2]/70">交易订单识别号 (Order No.)</span>
                  <div className="flex items-center gap-1.5 font-mono text-white font-semibold flex-wrap justify-end">
                    <span className="text-xs sm:text-xs">{detailModalItem.id}</span>
                    <Button className="alliance-antd-subscribe-copy-button" onClick={() => handleCopyText(detailModalItem.id)}>
                      {copiedId === detailModalItem.id ? '已复制' : '复制'}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-[#cbc4d2]/70">认购锁定金额</span>
                  <span className="text-xs sm:text-sm font-bold text-white font-mono">{detailModalItem.amount.toLocaleString()} USDT</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-[#cbc4d2]/70">充值方案赠送比</span>
                  <span className="text-xs sm:text-sm font-bold text-[#cfbcff] font-mono">{detailModalItem.giftRatio}%</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-[#cbc4d2]/70">买入TROO总数 (70%)</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">{detailModalItem.troo.toLocaleString()} TROO</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-[#cbc4d2]/70">预计 31% 排队锁定款</span>
                  <span className="text-xs sm:text-sm font-bold text-[#e7c365] font-mono">{(detailModalItem.amount * 0.31).toLocaleString()} USDT</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-[#cbc4d2]/70">合约签署时间</span>
                  <span className="text-xs sm:text-sm text-white font-mono">{detailModalItem.date}</span>
                </div>
              </div>

              <div className="bg-[#141218]/50 p-3.5 sm:p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-xs">
                  <span className="text-[#cbc4d2]/60 uppercase font-bold">立即买入 TROO 比例</span>
                  <span className="font-bold font-mono text-[#cfbcff]">{detailModalItem.isConfirmation ? '100%' : `${detailModalItem.progress}%`}</span>
                </div>
                <Progress
                  className="alliance-antd-subscribe-progress alliance-antd-subscribe-modal-progress"
                  percent={detailModalItem.isConfirmation ? 100 : detailModalItem.progress}
                  showInfo={false}
                  size="small"
                  strokeColor="#b794f6"
                  trailColor="rgba(54, 52, 58, 0.72)"
                />
                <p className="text-xs sm:text-xs text-[#cbc4d2]/50 italic leading-relaxed">
                  * 该理财参与协议通过系统进行订单买入操作。在30天投资锁定期后，全部收益与分红可随时提取。
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              {detailModalItem.isConfirmation ? (
                <div className="flex gap-3 w-full">
                  <Button className="alliance-antd-subscribe-modal-secondary" onClick={() => setDetailModalItem(null)}>
                    取消返回
                  </Button>
                  <Button className="alliance-antd-subscribe-modal-primary" onClick={handleConfirmPurchase}>
                    确认支付并认购
                  </Button>
                </div>
              ) : (
                <Button className="alliance-antd-subscribe-modal-close-button" onClick={() => setDetailModalItem(null)}>
                  关闭窗口
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
