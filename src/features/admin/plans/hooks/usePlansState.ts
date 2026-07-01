import { useState } from 'react';
import { getInitialAdminPlans } from '../../../../api/admin/plans';
import { useAppContext } from '../../../../context/AppContext';
import type { Plan, PlanDraft } from '../types';
import {
  createPlanDraft,
  createPlanFromForm,
  createPlansResponse,
  getPlansFromResponse,
  savePlanDraftToResponse,
  togglePlanStatus
} from '../utils';

export function usePlansState() {
  const { triggerGlobalAlert } = useAppContext();
  const [plansResponse, setPlansResponse] = useState(() => createPlansResponse(getInitialAdminPlans()));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [planDraft, setPlanDraft] = useState<PlanDraft>(() => createPlanDraft());
  const adminPlans = getPlansFromResponse(plansResponse);
  const notifySuccess = (message: string) => triggerGlobalAlert(message, 'success');
  const notifyError = (message: string) => triggerGlobalAlert(message, 'error');

  const handleOpenCreateModal = () => {
    setEditingPlan(null);
    setPlanDraft(createPlanDraft());
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (plan: Plan) => {
    setEditingPlan(plan);
    setPlanDraft(createPlanDraft(plan));
    setIsModalOpen(true);
  };

  const handleSaveOrUpdatePlan = () => {
    if (!planDraft.name) return notifyError('请输入套餐名称');
    if (planDraft.price <= 0) return notifyError('认购金额必须大于 0');
    if (planDraft.commissionLimit <= 0) return notifyError('佣金额度必须大于 0');

    if (editingPlan) {
      setPlansResponse(prev => savePlanDraftToResponse(prev, editingPlan.id, planDraft));
      notifySuccess(`套餐 ${editingPlan.id} 参数已更新`);
    } else {
      setPlansResponse(prev => ({
        ...prev,
        data: {
          ...prev.data,
          plans: [...prev.data.plans, createPlanFromForm(planDraft)]
        }
      }));
      notifySuccess(`新套餐 ${planDraft.name} 已创建`);
    }

    setIsModalOpen(false);
  };

  const handleTogglePlanStatus = (id: string) => {
    setPlansResponse(prev => ({
      ...prev,
      data: {
        ...prev.data,
        plans: togglePlanStatus(prev.data.plans, id)
      }
    }));
  };

  return {
    adminPlans,
    editingPlan,
    isModalOpen,
    planDraft,
    plansResponse,
    setIsModalOpen,
    setPlanDraft,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleSaveOrUpdatePlan,
    handleTogglePlanStatus
  };
}
