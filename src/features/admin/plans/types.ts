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

export interface PlanDraft {
  name: string;
  price: number;
  giftRatio: number;
  buyRatio: number;
  queueRatio: number;
  commissionLimit: number;
  description: string;
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
  planDraft: PlanDraft;
  setPlanDraft: Dispatch<SetStateAction<PlanDraft>>;
  onClose: () => void;
  onSaveOrUpdatePlan: () => void;
}
