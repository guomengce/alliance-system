import { useEffect, useMemo, useState } from 'react';
import type { Transaction } from '../../../../types';
import type { ActionType, NetworkType } from '../types';
import { filterTransactions } from '../utils';

interface UseWalletStateParams {
  transactions: Transaction[];
}

export const useWalletState = ({ transactions }: UseWalletStateParams) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [activeAction, setActiveAction] = useState<ActionType>('none');
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
