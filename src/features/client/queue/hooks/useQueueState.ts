import { useEffect, useState, type Dispatch, type SetStateAction, type UIEvent } from 'react';
import { getClientQueueOrders, getClientReleaseLogs } from '../../../../api/client/queue';
import type { OrderStatusFilter, QueueOrderItem, ReleaseLogItem } from '../types';
import { filterOrders, getNextVisibleCount, getProgressPercent } from '../utils';

interface UseQueueStateParams {
  originalLocked: number;
  releasedAmount: number;
}

export const useQueueState = ({
  originalLocked,
  releasedAmount
}: UseQueueStateParams) => {
  const [orders, setOrders] = useState<QueueOrderItem[]>([]);
  const [releaseLogs, setReleaseLogs] = useState<ReleaseLogItem[]>([]);
  const [alertSuccess, setAlertSuccess] = useState<{
    show: boolean;
    unlockedSum: number;
    uid: string;
  }>({ show: false, unlockedSum: 0, uid: '' });

  const [infoMessage, setInfoMessage] = useState('');
  const [visibleOrdersCount, setVisibleOrdersCount] = useState(10);
  const [visibleLogsCount, setVisibleLogsCount] = useState(10);
  const [loadingMoreOrders, setLoadingMoreOrders] = useState(false);
  const [loadingMoreLogs, setLoadingMoreLogs] = useState(false);
  const [selectedDetailOrder, setSelectedDetailOrder] = useState<QueueOrderItem | null>(null);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<OrderStatusFilter>('all');

  useEffect(() => {
    let mounted = true;

    void Promise.all([
      getClientQueueOrders(),
      getClientReleaseLogs()
    ]).then(([nextOrders, nextReleaseLogs]) => {
      if (!mounted) return;
      setOrders(nextOrders);
      setReleaseLogs(nextReleaseLogs);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const resetOrdersVisibility = () => {
    setVisibleOrdersCount(10);
  };

  const createScrollLoader = (
    loading: boolean,
    setLoading: (val: boolean) => void,
    setVisibleCount: Dispatch<SetStateAction<number>>,
    totalLength: number
  ) => {
    return (e: UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 30;
      if (isAtBottom && !loading && totalLength > 0) {
        setLoading(true);
        setTimeout(() => {
          setVisibleCount(prev => getNextVisibleCount(prev, totalLength));
          setLoading(false);
        }, 500);
      }
    };
  };

  const filteredOrders = filterOrders(orders, orderSearchQuery, orderStatusFilter);

  const handleOrdersScroll = createScrollLoader(
    loadingMoreOrders,
    setLoadingMoreOrders,
    setVisibleOrdersCount,
    filteredOrders.length
  );

  const handleLogsScroll = createScrollLoader(
    loadingMoreLogs,
    setLoadingMoreLogs,
    setVisibleLogsCount,
    releaseLogs.length
  );

  const overallProgressPercent = getProgressPercent(releasedAmount, originalLocked);

  const handleAddNewMockOrder = () => {
    setInfoMessage('请使用“认购中心”模块下的方案订购，所生成的订单将自动上链广播并进入智能队列！');
  };

  const handleOrderSearchChange = (value: string) => {
    setOrderSearchQuery(value);
    resetOrdersVisibility();
  };

  const handleClearOrderSearch = () => {
    setOrderSearchQuery('');
    resetOrdersVisibility();
  };

  const handleOrderStatusFilterChange = (status: OrderStatusFilter) => {
    setOrderStatusFilter(status);
    resetOrdersVisibility();
  };

  const handleLoadMoreOrders = () => {
    setLoadingMoreOrders(true);
    setTimeout(() => {
      setVisibleOrdersCount(prev => getNextVisibleCount(prev, filteredOrders.length));
      setLoadingMoreOrders(false);
    }, 450);
  };

  const handleLoadMoreLogs = () => {
    setLoadingMoreLogs(true);
    setTimeout(() => {
      setVisibleLogsCount(prev => getNextVisibleCount(prev, releaseLogs.length));
      setLoadingMoreLogs(false);
    }, 450);
  };

  return {
    alertSuccess,
    filteredOrders,
    handleAddNewMockOrder,
    handleClearOrderSearch,
    handleLoadMoreLogs,
    handleLoadMoreOrders,
    handleLogsScroll,
    handleOrderSearchChange,
    handleOrderStatusFilterChange,
    handleOrdersScroll,
    infoMessage,
    loadingMoreLogs,
    loadingMoreOrders,
    orderSearchQuery,
    orderStatusFilter,
    overallProgressPercent,
    releaseLogs,
    selectedDetailOrder,
    setAlertSuccess,
    setInfoMessage,
    setSelectedDetailOrder,
    visibleLogsCount,
    visibleOrdersCount
  };
};
