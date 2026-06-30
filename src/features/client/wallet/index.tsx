import './antd-overrides.css';
import PageView from '../../../shared/components/PageView';
import AlertBanner from '../../../shared/components/AlertBanner';
import ActionPanel from './components/ActionPanel';
import ActionTabs from './components/ActionTabs';
import AssetCards from './components/AssetCards';
import TransactionDetailsModal from './components/TransactionDetailsModal';
import TransactionLedger from './components/TransactionLedger';
import { useWalletState } from './hooks/useWalletState';
import type { WalletViewProps } from './types';
import { FILTER_BUTTONS } from './utils';

export default function WalletView({
  usdtBalance,
  trooBalance,
  lockedQueueAmount,
  transactions,
  onAddTransaction,
  onUpdateBalances
}: WalletViewProps) {
  const {
    activeAction,
    amountInput,
    addressInput,
    copiedAddress,
    copySuccessId,
    errorMsg,
    filteredTransactions,
    filterType,
    handleCopyRechargeAddress,
    handleCopyTransactionId,
    handleSubmitAction,
    rechargeNetwork,
    searchVal,
    selectedTxn,
    successMsg,
    transferUserId,
    withdrawNetwork,
    setActiveAction,
    setAddressInput,
    setAmountInput,
    setErrorMsg,
    setFilterType,
    setRechargeNetwork,
    setSearchVal,
    setSelectedTxn,
    setSuccessMsg,
    setTransferUserId,
    setWithdrawNetwork
  } = useWalletState({
    onAddTransaction,
    onUpdateBalances,
    transactions,
    usdtBalance
  });

  return (
    <PageView>
      <AssetCards
        usdtBalance={usdtBalance}
        trooBalance={trooBalance}
        lockedQueueAmount={lockedQueueAmount}
      />

      <section className="space-y-4">
        <ActionTabs activeAction={activeAction} onToggleAction={setActiveAction} />

        {successMsg && (
          <AlertBanner message={successMsg} type="success" onClose={() => setSuccessMsg('')} />
        )}

        <ActionPanel
          activeAction={activeAction}
          errorMsg={errorMsg}
          onClose={() => setActiveAction('none')}
          onDismissError={() => setErrorMsg('')}
          onSubmit={handleSubmitAction}
          rechargeNetwork={rechargeNetwork}
          withdrawNetwork={withdrawNetwork}
          onRechargeNetworkChange={setRechargeNetwork}
          onWithdrawNetworkChange={setWithdrawNetwork}
          copiedAddress={copiedAddress}
          onCopyRechargeAddress={handleCopyRechargeAddress}
          amountInput={amountInput}
          addressInput={addressInput}
          transferUserId={transferUserId}
          onAmountInputChange={setAmountInput}
          onAddressInputChange={setAddressInput}
          onTransferUserIdChange={setTransferUserId}
          usdtBalance={usdtBalance}
        />
      </section>

      <TransactionLedger
        filteredTransactions={filteredTransactions}
        filterButtons={FILTER_BUTTONS}
        filterType={filterType}
        searchVal={searchVal}
        copySuccessId={copySuccessId}
        onFilterTypeChange={setFilterType}
        onSearchValChange={setSearchVal}
        onCopyTransactionId={handleCopyTransactionId}
        onSelectTransaction={setSelectedTxn}
      />

      <TransactionDetailsModal
        selectedTxn={selectedTxn}
        copySuccessId={copySuccessId}
        onClose={() => setSelectedTxn(null)}
        onCopyTransactionId={handleCopyTransactionId}
      />
    </PageView>
  );
}
