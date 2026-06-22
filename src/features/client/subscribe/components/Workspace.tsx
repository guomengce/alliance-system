import { AnimatePresence } from 'motion/react';
import PageView from '../../../../shared/components/PageView';
import AlertBanner from '../../../../shared/components/AlertBanner';
import type { WorkspaceProps } from '../types';
import DetailModal from './DetailModal';
import PlansList from './PlansList';
import PurchaseHistory from './PurchaseHistory';
import SubscriptionForm from './SubscriptionForm';

export default function Workspace({
  usdtBalance,
  commissionPoolLimit,
  commissionPoolRemaining,
  plans,
  selectedPlan,
  amountInput,
  successMsg,
  errorMsg,
  copiedId,
  detailModalItem,
  purchases,
  setSuccessMsg,
  setErrorMsg,
  setAmountInput,
  setDetailModalItem,
  handleSelectPlan,
  handleDropdownChange,
  handleSubscriptionSubmit,
  handleConfirmPurchase,
  handleCopyText
}: WorkspaceProps) {
  void usdtBalance;

  return (
    <PageView>
      <AnimatePresence>
        {successMsg && (
          <AlertBanner 
            message={`认购授权成功 / Subscription Completed: ${successMsg}`} 
            type="success" 
            onClose={() => setSuccessMsg('')} 
          />
        )}
        {errorMsg && (
          <AlertBanner 
            message={errorMsg} 
            type="error" 
            onClose={() => setErrorMsg('')} 
          />
        )}
      </AnimatePresence>

      <PlansList
        plans={plans}
        selectedPlan={selectedPlan}
        handleSelectPlan={handleSelectPlan}
      />

      <SubscriptionForm
        commissionPoolLimit={commissionPoolLimit}
        commissionPoolRemaining={commissionPoolRemaining}
        plans={plans}
        selectedPlan={selectedPlan}
        amountInput={amountInput}
        setAmountInput={setAmountInput}
        handleDropdownChange={handleDropdownChange}
        handleSubscriptionSubmit={handleSubscriptionSubmit}
      />

      <PurchaseHistory
        purchases={purchases}
        copiedId={copiedId}
        setDetailModalItem={setDetailModalItem}
        handleCopyText={handleCopyText}
      />

      <DetailModal
        detailModalItem={detailModalItem}
        copiedId={copiedId}
        setDetailModalItem={setDetailModalItem}
        handleCopyText={handleCopyText}
        handleConfirmPurchase={handleConfirmPurchase}
      />
    </PageView>
  );
}
