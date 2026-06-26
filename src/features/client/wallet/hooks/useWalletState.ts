import { useEffect, useMemo, useState, type FormEvent } from 'react';
import type { Transaction } from '../../../../types';
import type { ActionType, NetworkType } from '../types';
import {
  buildTransferTransaction,
  buildWithdrawTransaction,
  filterTransactions,
  validateTransfer,
  validateWithdraw
} from '../utils';

interface UseWalletStateParams {
  onAddTransaction: (txn: Transaction) => void;
  onUpdateBalances: (usdtDiff: number, trooDiff: number, lockedDiff?: number) => void;
  transactions: Transaction[];
  usdtBalance: number;
}

export const useWalletState = ({
  onAddTransaction,
  onUpdateBalances,
  transactions,
  usdtBalance
}: UseWalletStateParams) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [activeAction, setActiveAction] = useState<ActionType>('recharge');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [searchVal, setSearchVal] = useState<string>('');
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [copySuccessId, setCopySuccessId] = useState<string>('');
  const [copiedAddress, setCopiedAddress] = useState(false);

  const [rechargeNetwork, setRechargeNetwork] = useState<NetworkType>('TRX');
  const [withdrawNetwork, setWithdrawNetwork] = useState<NetworkType>('TRX');

  const [amountInput, setAmountInput] = useState<string>('');
  const [addressInput, setAddressInput] = useState<string>('');
  const [transferUserId, setTransferUserId] = useState<string>('');

  useEffect(() => {
    setAmountInput('');
    setAddressInput('');
    setTransferUserId('');
    setErrorMsg('');
  }, [activeAction]);

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  const filteredTransactions = useMemo(
    () => filterTransactions(transactions, filterType, searchVal),
    [filterType, searchVal, transactions]
  );

  const handleCopyRechargeAddress = () => {
    const addr = rechargeNetwork === 'TRX'
      ? 'TX52b9m8xQ987dY64VbxZ3M98127341'
      : '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
    navigator.clipboard.writeText(addr);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCopyTransactionId = (id: string, duration = 1500) => {
    navigator.clipboard.writeText(id);
    setCopySuccessId(id);
    setTimeout(() => setCopySuccessId(''), duration);
  };

  const handleSubmitAction = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const num = parseFloat(amountInput);

    if (activeAction !== 'recharge') {
      if (Number.isNaN(num) || num <= 0) {
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

  return {
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
    handleSubmitAction,
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
  };
};
