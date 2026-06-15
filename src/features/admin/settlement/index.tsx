import { Workspace } from './components/Workspace';
import { useSettlementState } from './hooks/useSettlementState';
import type { AdminSettlementViewProps, SettlementItem } from './types';
import { createSettleLog } from './utils';

export default function AdminSettlementView({ onUpdateBalances }: AdminSettlementViewProps) {
  const {
    manualSettleLoading,
    selectedTx,
    setManualSettleLoading,
    setSelectedTx,
    setSettlementLogs,
    setSettlementTransactions,
    settlementTransactions
  } = useSettlementState();

  // D+1 manual retry / override stalled nodes
  const handleResolveException = (txId: string) => {
    setSettlementTransactions(prev => prev.map(tx => {
      if (tx.id === txId) {
        return {
          ...tx,
          remainingPoolCapacity: 10000, // Refill capacity virtually
          actualSettledAmount: tx.expectedCommissions,
          spilloverClipped: 0,
          status: 'fully_settled'
        };
      }
      return tx;
    }));
    alert(`【结算异常数据修复成功】\n已成功人工重刷结算节点 SREC-104：\n强制校正该上线代理额度上限并补足其佣金！应发拨付 ${800} USDT 已全部交割入其可用资产。`);
    setSelectedTx(null);
  };

  // Push Urgent UI Alert notifying account they are running dry on commission capacity limits
  const handleNotifyInsufficientCapacity = (tx: SettlementItem) => {
    setSettlementTransactions(prev => prev.map(item => {
      if (item.id === tx.id) {
        return { ...item, status: 'low_capacity_notified' };
      }
      return item;
    }));

    // Simulate real alert push
    alert(`【🔔 全系统警告邮件与推送已广播】\n\n发送目标: UID "${tx.memberUid}" (${tx.nickname})\n绑定邮箱: ${tx.contactEmail}\n通知标题: "【警报】佣金额度极度匮乏提示"\n消息详情: "您好，系统检测到您所得下代会员佣金已产生触发溢漏！您的可用佣金额度仅剩 ${tx.remainingPoolCapacity} USDT，该等级下线将无法再为您增加推荐收益。请即刻通过在会员面板买入新理财套餐 A-E 等级包以倍数释放扩展解锁您的累积提现额度。"`);
    setSelectedTx(null);
  };

  // Run Manual D+1 Settlement Rollup
  const triggerManualSettlement = () => {
    setManualSettleLoading(true);
    setTimeout(() => {
      const newLog = createSettleLog();

      setSettlementLogs(prev => [newLog, ...prev]);
      onUpdateBalances(1500, 0);
      alert('手动触发 D+1 04:00 全同盟多节点自动结算成功！历史累计总库已同步审计完毕。');
      setManualSettleLoading(false);
    }, 1200);
  };

  return (
    <Workspace
      settlementTransactions={settlementTransactions}
      manualSettleLoading={manualSettleLoading}
      selectedTx={selectedTx}
      setSelectedTx={setSelectedTx}
      handleResolveException={handleResolveException}
      handleNotifyInsufficientCapacity={handleNotifyInsufficientCapacity}
      triggerManualSettlement={triggerManualSettlement}
    />
  );
}
