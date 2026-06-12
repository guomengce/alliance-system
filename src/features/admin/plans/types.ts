import type { Dispatch, Key, SetStateAction } from 'react';

export interface Plan {
  id: string;
  name: string;
  price: number;
  giftRatio: number;        // 赠送比例 (e.g., 1.1 = +10% 赠送比例)
  buyRatio: number;         // TROO 股票买入比例 (e.g., 40%)
  queueRatio: number;       // 排队比例 (e.g., 60%)
  commissionLimit: number;  // 佣金额度 (具体数值, e.g., 5000 USDT)
  status: 'enabled' | 'disabled';
  description?: string;     // 套餐具体描述与规则
}

export interface ToolbarProps {
  onOpenCreateModal: () => void;
}

export interface ListProps {
  plans: Plan[];
  onOpenEditModal: (plan: Plan) => void;
  onTogglePlanStatus: (id: string) => void;
}

export interface PlanCardProps {
  key?: Key;
  plan: Plan;
  onOpenEditModal: (plan: Plan) => void;
  onTogglePlanStatus: (id: string) => void;
}

export interface EditorModalProps {
  editingPlan: Plan | null;
  formName: string;
  formPrice: number;
  formGiftRatio: number;
  formBuyRatio: number;
  formQueueRatio: number;
  formCommissionLimit: number;
  formDescription: string;
  setFormName: Dispatch<SetStateAction<string>>;
  setFormPrice: Dispatch<SetStateAction<number>>;
  setFormGiftRatio: Dispatch<SetStateAction<number>>;
  setFormBuyRatio: Dispatch<SetStateAction<number>>;
  setFormQueueRatio: Dispatch<SetStateAction<number>>;
  setFormCommissionLimit: Dispatch<SetStateAction<number>>;
  setFormDescription: Dispatch<SetStateAction<string>>;
  onClose: () => void;
  onSaveOrUpdatePlan: () => void;
}
