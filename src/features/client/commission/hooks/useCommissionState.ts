import { useEffect, useState } from 'react';
import {
  getClientCommissionHistory,
  getClientCommissionRatios
} from '../../../../api/client/commission';
import type { Transaction } from '../../../../types';
import type { CommissionHistoryItem, CommissionRatio, HistoryFilter } from '../types';
import {
  buildCommissionWithdrawalTransaction,
  filterCommissionHistory
} from '../utils';

interface UseCommissionStateOptions {
  onAddTransaction: (txn: Transaction) => void;
  onIncreaseLimit?: (amount: number) => void;
  onNavigateToSubscribe?: () => void;
  onWithdrawCommissions: () => void;
  pendingBalance: number;
}

export function useCommissionState({
  onAddTransaction,
  onIncreaseLimit,
  onNavigateToSubscribe,
  onWithdrawCommissions,
  pendingBalance
}: UseCommissionStateOptions) {
  const [successMsg, setSuccessMsg] = useState('');
  const [activeFilter, setActiveFilter] = useState<HistoryFilter>('all');
  const [history, setHistory] = useState<CommissionHistoryItem[]>([]);
  const [ratios, setRatios] = useState<CommissionRatio[]>([]);

  useEffect(() => {
    let mounted = true;

    Promise.all([getClientCommissionHistory(), getClientCommissionRatios()]).then(([nextHistory, nextRatios]) => {
      if (!mounted) return;
      setHistory(nextHistory);
      setRatios(nextRatios);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const filteredHistory = filterCommissionHistory(history, activeFilter);

  const handleWithdrawClick = () => {
    if (pendingBalance <= 0) {
      setSuccessMsg('模拟结算提示：当前没有待处理的代收佣金！等有下线产生新的认购返佣并计入“代收中”后，即可再次点击此按钮模拟本系统D+1日结划转。');
      setTimeout(() => setSuccessMsg(''), 5000);
      return;
    }
    const sum = pendingBalance;
    onWithdrawCommissions();
    onAddTransaction(buildCommissionWithdrawalTransaction(sum));

    setSuccessMsg(`[D+1 日结模拟系统] 已自动触发结算：系统成功汇算代收池，并将 ¥ ${sum.toLocaleString()} 自动划转至您的可用余额 (Wallet Balance)`);
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleExport = () => {
    setSuccessMsg('正在自动读取后台，打包成 xlsx 收益流水文档下载中...');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleIncreaseLimit = () => {
    if (onNavigateToSubscribe) {
      onNavigateToSubscribe();
    } else {
      const amount = 50000;
      if (onIncreaseLimit) {
        onIncreaseLimit(amount);
        setSuccessMsg(`[额度提升成功] 通过专属大额绿色通道，系统已将您的可用佣金信用额度池上限成功提升 ¥ ${amount.toLocaleString()}！数据已自动上链同步。`);
        setTimeout(() => setSuccessMsg(''), 6000);
      } else {
        setSuccessMsg(`[额度提升申请] 系统检测到您的信用评级卓越，已自动为您提交审核，预计测评完成后自动追加额度 ¥ ${amount.toLocaleString()}`);
        setTimeout(() => setSuccessMsg(''), 6000);
      }
    }
  };

  return {
    activeFilter,
    filteredHistory,
    handleExport,
    handleIncreaseLimit,
    handleWithdrawClick,
    ratios,
    setActiveFilter,
    setSuccessMsg,
    successMsg
  };
}
