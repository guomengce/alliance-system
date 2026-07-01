import { useEffect, useState } from 'react';
import { createAdminPlan, getAdminPlans, updateAdminPlan } from '../../../../api/admin/plans';
import { useAppContext } from '../../../../context/AppContext';
import type { Plan, PlanDraft } from '../types';
import {
  createPlanDraft,
  createPlansResponse,
  getPlansFromResponse,
  savePlanDraftToResponse,
  togglePlanStatus
} from '../utils';

export function usePlansState() {
  const { triggerGlobalAlert } = useAppContext();
  const [plansResponse, setPlansResponse] = useState(() => createPlansResponse([]));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [planDraft, setPlanDraft] = useState<PlanDraft>(() => createPlanDraft());
  const adminPlans = getPlansFromResponse(plansResponse);
  const notifySuccess = (message: string) => triggerGlobalAlert(message, 'success');
  const notifyError = (message: string) => triggerGlobalAlert(message, 'error');

  useEffect(() => {
    let mounted = true;

    getAdminPlans().then((plans) => {
      if (mounted) {
        setPlansResponse(createPlansResponse(plans));
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

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

  const handleSaveOrUpdatePlan = async (values: PlanDraft) => {
    const nextDraft = {
      ...values,
      price: Number(values.price) || 0,
      giftRatio: Number(values.giftRatio) || 1,
      buyRatio: Number(values.buyRatio) || 0,
      queueRatio: Number(values.queueRatio) || 0,
      commissionLimit: Number(values.commissionLimit) || 0,
    };
    setPlanDraft(nextDraft);

    if (!nextDraft.name) return notifyError('请输入套餐名称');
    if (nextDraft.price <= 0) return notifyError('认购金额必须大于 0');
    if (nextDraft.commissionLimit <= 0) return notifyError('佣金额度必须大于 0');

    if (editingPlan) {
      await updateAdminPlan(editingPlan.id, nextDraft);
      setPlansResponse(prev => savePlanDraftToResponse(prev, editingPlan.id, nextDraft));
      notifySuccess(`套餐 ${editingPlan.id} 参数已更新`);
    } else {
      const createdPlan = await createAdminPlan(nextDraft);
      setPlansResponse(prev => ({
        ...prev,
        data: {
          ...prev.data,
          plans: [...prev.data.plans, createdPlan]
        }
      }));
      notifySuccess(`新套餐 ${nextDraft.name} 已创建`);
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
