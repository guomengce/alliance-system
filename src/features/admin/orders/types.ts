import type { Dispatch, SetStateAction } from 'react';

export interface CommissionAllocation {
  level: string;
  targetUid: string;
  nickname: string;
  rate: number;
  amount: number;
  status: 'distributed' | 'failed_insufficient_pool' | 'pending_lock';
}

export interface OrderDetail {
  id: string;
  uid: string;
  planName: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  time: string;
  paymentChannel: string;
  txid: string;
  cashFlowTrack: string;
  stockConversion: {
    buyRatio: number;
    queueRatio: number;
    directStocks: number;
    queueStocks: number;
    giftedStocks: number;
  };
  commissionAllocations: CommissionAllocation[];
}

export interface WorkspaceProps {
  orders: OrderDetail[];
  selectedOrder: OrderDetail | null;
  setSelectedOrder: Dispatch<SetStateAction<OrderDetail | null>>;
  detailSearchQuery: string;
  setDetailSearchQuery: Dispatch<SetStateAction<string>>;
  filteredAllocations: CommissionAllocation[];
  exportMockCSV: () => void;
  onUpdateOrderStatus: (orderId: string, status: OrderDetail['status']) => void;
}
