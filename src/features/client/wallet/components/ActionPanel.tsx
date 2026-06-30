import { Button, Form } from 'antd';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import AlertBanner from '../../../../shared/components/AlertBanner';
import type { ActionPanelProps } from '../types';
import RechargePanel from './RechargePanel';
import RechargeQrPanel from './RechargeQrPanel';
import TransferPanel from './TransferPanel';
import WithdrawPanel from './WithdrawPanel';

const titles = {
  recharge: '安全智能充值系统',
  withdraw: '链上提现申请授权',
  transfer: '站内用户资金划转'
};

export default function ActionPanel({
  activeAction,
  errorMsg,
  onClose,
  onDismissError,
  onSubmit,
  rechargeNetwork,
  withdrawNetwork,
  onRechargeNetworkChange,
  onWithdrawNetworkChange,
  copiedAddress,
  onCopyRechargeAddress,
  amountInput,
  addressInput,
  transferUserId,
  onAmountInputChange,
  onAddressInputChange,
  onTransferUserIdChange,
  usdtBalance
}: ActionPanelProps) {
  return (
    <AnimatePresence>
      {activeAction !== 'none' && (
        <motion.div
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ duration: 0.25 }}
          className="glass-card rounded-2xl p-6 relative overflow-hidden overflow-y-auto"
        >
          <Button
            className="alliance-antd-wallet-panel-close"
            icon={<X className="w-5 h-5" />}
            onClick={onClose}
          />

          <h3 className="text-sm sm:text-base font-bold text-white mb-4 sm:mb-5 uppercase tracking-wider flex items-center gap-2">
            {titles[activeAction]}
          </h3>

          {errorMsg && (
            <div className="mb-5">
              <AlertBanner message={errorMsg} type="error" onClose={onDismissError} />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <Form component="form" onSubmitCapture={onSubmit} className="lg:col-span-2 space-y-5">
              {activeAction === 'recharge' && (
                <RechargePanel
                  rechargeNetwork={rechargeNetwork}
                  onRechargeNetworkChange={onRechargeNetworkChange}
                  copiedAddress={copiedAddress}
                  onCopyRechargeAddress={onCopyRechargeAddress}
                />
              )}

              {activeAction === 'withdraw' && (
                <WithdrawPanel
                  withdrawNetwork={withdrawNetwork}
                  onWithdrawNetworkChange={onWithdrawNetworkChange}
                  addressInput={addressInput}
                  amountInput={amountInput}
                  onAddressInputChange={onAddressInputChange}
                  onAmountInputChange={onAmountInputChange}
                  usdtBalance={usdtBalance}
                />
              )}

              {activeAction === 'transfer' && (
                <TransferPanel
                  transferUserId={transferUserId}
                  amountInput={amountInput}
                  onTransferUserIdChange={onTransferUserIdChange}
                  onAmountInputChange={onAmountInputChange}
                  usdtBalance={usdtBalance}
                />
              )}
            </Form>

            {activeAction === 'recharge' && (
              <RechargeQrPanel rechargeNetwork={rechargeNetwork} />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
