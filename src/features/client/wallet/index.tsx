import type { FormEvent } from 'react';
import PageView from '../../../components/PageView';
import AlertBanner from '../../../components/AlertBanner';
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

    const formattedTime = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const generatedId = 'TXN-' + Math.floor(1000000000 + Math.random() * 9000000000);

    if (activeAction === 'recharge') {
      return;
    } else if (activeAction === 'withdraw') {
      const minWithdraw = withdrawNetwork === 'ETH' ? 40 : 20;
      if (num < minWithdraw) {
        setErrorMsg(`提现金额不可低于最小提现要求: ${minWithdraw} USDT`);
        return;
      }
      if (num > usdtBalance) {
        setErrorMsg('您的可用余额不足！');
        return;
      }
      if (!addressInput.trim()) {
        setErrorMsg('请输入收款钱包地址');
        return;
      }
      onUpdateBalances(-num, 0);
      onAddTransaction({
        id: generatedId,
        type: 'withdraw',
        typeLabel: '提现申请',
        desc: `提现至外部钱包 (${withdrawNetwork} 网络: ${addressInput})`,
        amount: -num,
        currency: 'USDT',
        time: formattedTime,
        status: 'pending',
        statusLabel: '处理中'
      });
      setSuccessMsg(`已成功提交提现申请 ${num} USDT (${withdrawNetwork}网络)，系统正在处理`);
    } else if (activeAction === 'transfer') {
      const minTransfer = 10;
      if (num < minTransfer) {
        setErrorMsg(`站内划转金额不可低于最小划转限制: ${minTransfer} USDT`);
        return;
      }
      if (!transferUserId.trim()) {
        setErrorMsg('请输入接收方的平台用户ID (UID)');
        return;
      }
      if (num > usdtBalance) {
        setErrorMsg('您的可用余额不足！');
        return;
      }
      onUpdateBalances(-num, 0);
      onAddTransaction({
        id: generatedId,
        type: 'transfer',
        typeLabel: '平台划转',
        desc: `站内资金划转至用户 UID: ${transferUserId}`,
        amount: -num,
        currency: 'USDT',
        time: formattedTime,
        status: 'success',
        statusLabel: '成功'
      });
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
