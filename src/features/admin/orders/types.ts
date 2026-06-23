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

export type OrderFeedbackVariant = 'full' | 'short';

export interface DetailViewProps {
  selectedOrder: OrderDetail;
  setSelectedOrder: Dispatch<SetStateAction<OrderDetail | null>>;
  detailSearchQuery: string;
  setDetailSearchQuery: Dispatch<SetStateAction<string>>;
  filteredAllocations: CommissionAllocation[];
  onConfirmOrderArrival: (orderId: string, variant?: OrderFeedbackVariant) => void;
  onCancelOrder: (orderId: string, variant?: OrderFeedbackVariant) => void;
}

export interface ListViewProps {
  orders: OrderDetail[];
  setSelectedOrder: Dispatch<SetStateAction<OrderDetail | null>>;
  setDetailSearchQuery: Dispatch<SetStateAction<string>>;
  exportMockCSV: () => void;
  onConfirmOrderArrival: (orderId: string, variant?: OrderFeedbackVariant) => void;
  onCancelOrder: (orderId: string, variant?: OrderFeedbackVariant) => void;
}

export interface OrderHeaderProps {
  onExport: ListViewProps['exportMockCSV'];
}

export interface MobileOrderCardProps {
  order: OrderDetail;
  setSelectedOrder: ListViewProps['setSelectedOrder'];
  setDetailSearchQuery: ListViewProps['setDetailSearchQuery'];
  onConfirmOrderArrival: ListViewProps['onConfirmOrderArrival'];
  onCancelOrder: ListViewProps['onCancelOrder'];
}

export interface OrderRowProps extends MobileOrderCardProps {}
