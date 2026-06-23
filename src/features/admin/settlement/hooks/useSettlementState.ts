import { useState } from 'react';
import {
  getInitialAdminSettlementLogs,
  getInitialAdminSettlementTransactions
} from '../../../../api/admin/settlement';
import { useAppContext } from '../../../../context/AppContext';
import type { SettlementItem, SettleLog } from '../types';
import {
  createSettleLog,
  markLowCapacityNotified,
  resolveSettlementException
} from '../utils';

interface UseSettlementStateParams {
  onUpdateBalances: (usdtDiff: number, trooDiff: number) => void;
}

export function useSettlementState({ onUpdateBalances }: UseSettlementStateParams) {
  const { triggerGlobalAlert } = useAppContext();
  const [settlementLogs, setSettlementLogs] = useState<SettleLog[]>(() => getInitialAdminSettlementLogs());
  const [settlementTransactions, setSettlementTransactions] = useState<SettlementItem[]>(
    () => getInitialAdminSettlementTransactions()
  );
  const [manualSettleLoading, setManualSettleLoading] = useState<boolean>(false);
  const [selectedTx, setSelectedTx] = useState<SettlementItem | null>(null);

  const handleResolveException = (txId: string) => {
    setSettlementTransactions(prev => resolveSettlementException(prev, txId));
    triggerGlobalAlert(`【结算异常数据修复成功】\n已成功人工重刷结算节点 SREC-104。\n强制校正该上线代理额度上限并补足佣金。应发拨付 800 USDT 已全部交割入可用资产。`, 'success');
    setSelectedTx(null);
  };

  const handleNotifyInsufficientCapacity = (tx: SettlementItem) => {
    setSettlementTransactions(prev => markLowCapacityNotified(prev, tx.id));
    triggerGlobalAlert(`【全系统警告邮件与推送已广播】\n\n发送目标 UID "${tx.memberUid}" (${tx.nickname})\n绑定邮箱: ${tx.contactEmail}\n通知标题: "【警报】佣金额度极度匮乏提示"\n消息详情: "系统检测到您的可用佣金额度仅剩 ${tx.remainingPoolCapacity} USDT，请及时扩展额度。"`, 'success');
    setSelectedTx(null);
  };

  const triggerManualSettlement = () => {
    setManualSettleLoading(true);
    setTimeout(() => {
      const newLog = createSettleLog();

      setSettlementLogs(prev => [newLog, ...prev]);
      onUpdateBalances(1500, 0);
      triggerGlobalAlert('手动触发 D+1 04:00 全同盟多节点自动结算成功，历史累计总库已同步审计完毕。', 'success');
      setManualSettleLoading(false);
    }, 1200);
  };

  return {
    manualSettleLoading,
    selectedTx,
    setSelectedTx,
    settlementLogs,
    settlementTransactions,
    handleNotifyInsufficientCapacity,
    handleResolveException,
    triggerManualSettlement
  };
}
