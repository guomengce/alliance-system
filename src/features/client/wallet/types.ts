import type { Dispatch, FormEvent, SetStateAction } from 'react';
import type { Transaction } from '../../../types';

export type ActionType = 'none' | 'recharge' | 'withdraw' | 'transfer';
export type NetworkType = 'TRX' | 'ETH';

export interface WalletViewProps {
  usdtBalance: number;
  trooBalance: number;
  lockedQueueAmount: number;
  transactions: Transaction[];
  onAddTransaction: (txn: Transaction) => void;
  onUpdateBalances: (usdtDiff: number, trooDiff: number, lockedDiff?: number) => void;
}

export interface FilterButton {
  id: string;
  label: string;
}

export interface AssetCardsProps {
  usdtBalance: number;
  trooBalance: number;
  lockedQueueAmount: number;
}

export interface ActionTabsProps {
  activeAction: ActionType;
  onToggleAction: (action: ActionType) => void;
}

export interface ActionPanelProps {
  activeAction: Exclude<ActionType, 'none'> | 'none';
  errorMsg: string;
  onClose: () => void;
  onDismissError: () => void;
  onSubmit: (e: FormEvent) => void;
  rechargeNetwork: NetworkType;
  withdrawNetwork: NetworkType;
  onRechargeNetworkChange: Dispatch<SetStateAction<NetworkType>>;
  onWithdrawNetworkChange: Dispatch<SetStateAction<NetworkType>>;
  copiedAddress: boolean;
  onCopyRechargeAddress: () => void;
  amountInput: string;
  addressInput: string;
  transferUserId: string;
  onAmountInputChange: Dispatch<SetStateAction<string>>;
  onAddressInputChange: Dispatch<SetStateAction<string>>;
  onTransferUserIdChange: Dispatch<SetStateAction<string>>;
  usdtBalance: number;
}

export interface RechargePanelProps {
  rechargeNetwork: NetworkType;
  onRechargeNetworkChange: Dispatch<SetStateAction<NetworkType>>;
  copiedAddress: boolean;
  onCopyRechargeAddress: () => void;
}

export interface WithdrawPanelProps {
  withdrawNetwork: NetworkType;
  onWithdrawNetworkChange: Dispatch<SetStateAction<NetworkType>>;
  addressInput: string;
  amountInput: string;
  onAddressInputChange: Dispatch<SetStateAction<string>>;
  onAmountInputChange: Dispatch<SetStateAction<string>>;
  usdtBalance: number;
}

export interface TransferPanelProps {
  transferUserId: string;
  amountInput: string;
  onTransferUserIdChange: Dispatch<SetStateAction<string>>;
  onAmountInputChange: Dispatch<SetStateAction<string>>;
  usdtBalance: number;
}

export interface TransactionLedgerProps {
  filteredTransactions: Transaction[];
  filterButtons: FilterButton[];
  filterType: string;
  searchVal: string;
  copySuccessId: string;
  onFilterTypeChange: Dispatch<SetStateAction<string>>;
  onSearchValChange: Dispatch<SetStateAction<string>>;
  onCopyTransactionId: (id: string, duration?: number) => void;
  onSelectTransaction: Dispatch<SetStateAction<Transaction | null>>;
}

export interface TransactionDetailsModalProps {
  selectedTxn: Transaction | null;
  copySuccessId: string;
  onClose: () => void;
  onCopyTransactionId: (id: string, duration?: number) => void;
}
