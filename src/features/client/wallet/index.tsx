import type { FormEvent } from 'react';
import PageView from '../../../shared/components/PageView';
import AlertBanner from '../../../shared/components/AlertBanner';
import ActionPanel from './components/ActionPanel';
import ActionTabs from './components/ActionTabs';
import AssetCards from './components/AssetCards';
import TransactionDetailsModal from './components/TransactionDetailsModal';
import TransactionLedger from './components/TransactionLedger';
import { useWalletState } from './hooks/useWalletState';
import type { WalletViewProps } from './types';
import {
  FILTER_BUTTONS,
  buildTransferTransaction,
  buildWithdrawTransaction,
  validateTransfer,
  validateWithdraw
} from './utils';

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
    rechargeNetwork,
    searchVal,
    selectedTxn,
    successMsg,
    transferUserId,
    withdrawNetwork,
    handleCopyRechargeAddress,
    handleCopyTransactionId,
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
  } = useWalletState({ transactions });

  const handleSubmitAction = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const num = parseFloat(amountInput);

    if (activeAction !== 'recharge') {
      if (isNaN(num) || num <= 0) {
        setErrorMsg('请输入有效的金额');
        return;
      }
    }

    if (activeAction === 'recharge') {
      return;
    } else if (activeAction === 'withdraw') {
      const validationError = validateWithdraw(num, usdtBalance, addressInput, withdrawNetwork);
      if (validationError) {
        setErrorMsg(validationError);
        return;
      }
      onUpdateBalances(-num, 0);
      onAddTransaction(buildWithdrawTransaction(num, withdrawNetwork, addressInput));
      setSuccessMsg(`已成功提交提现申请 ${num} USDT (${withdrawNetwork}网络)，系统正在处理`);
    } else if (activeAction === 'transfer') {
      const validationError = validateTransfer(num, usdtBalance, transferUserId);
      if (validationError) {
        setErrorMsg(validationError);
        return;
      }
      onUpdateBalances(-num, 0);
      onAddTransaction(buildTransferTransaction(num, transferUserId));
      setSuccessMsg(`划转成功！您已成功向平台用户 ${transferUserId} 口岸划转 ${num} USDT`);
    }

    setAmountInput('');
    setAddressInput('');
    setTransferUserId('');
    setActiveAction('none');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

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
