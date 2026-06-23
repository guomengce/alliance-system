import { useState } from 'react';
import { getInitialAdminPlans } from '../../../../api/admin/plans';
import { useAppContext } from '../../../../context/AppContext';
import type { Plan } from '../types';
import { createPlanFromForm, togglePlanStatus, updatePlanFromForm } from '../utils';

const createDefaults = {
  name: '',
  price: 1000,
  giftRatio: 1.0,
  buyRatio: 40,
  queueRatio: 60,
  commissionLimit: 4000,
  description: ''
};

export function usePlansState() {
  const { triggerGlobalAlert } = useAppContext();
  const [adminPlans, setAdminPlans] = useState<Plan[]>(() => getInitialAdminPlans());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState<number>(1000);
  const [formGiftRatio, setFormGiftRatio] = useState<number>(1.0);
  const [formBuyRatio, setFormBuyRatio] = useState<number>(40);
  const [formQueueRatio, setFormQueueRatio] = useState<number>(60);
  const [formCommissionLimit, setFormCommissionLimit] = useState<number>(5000);
  const [formDescription, setFormDescription] = useState('');
  const notifySuccess = (message: string) => triggerGlobalAlert(message, 'success');
  const notifyError = (message: string) => triggerGlobalAlert(message, 'error');

  const applyFormValues = (values: typeof createDefaults) => {
    setFormName(values.name);
    setFormPrice(values.price);
    setFormGiftRatio(values.giftRatio);
    setFormBuyRatio(values.buyRatio);
    setFormQueueRatio(values.queueRatio);
    setFormCommissionLimit(values.commissionLimit);
    setFormDescription(values.description);
  };

  const handleOpenCreateModal = () => {
    setEditingPlan(null);
    applyFormValues(createDefaults);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (plan: Plan) => {
    setEditingPlan(plan);
    applyFormValues({
      name: plan.name,
      price: plan.price,
      giftRatio: plan.giftRatio,
      buyRatio: plan.buyRatio,
      queueRatio: plan.queueRatio,
      commissionLimit: plan.commissionLimit,
      description: plan.description || ''
    });
    setIsModalOpen(true);
  };

  const handleSaveOrUpdatePlan = () => {
    if (!formName) return notifyError('请输入套餐名称');
    if (formPrice <= 0) return notifyError('认购金额必须大于 0');
    if (formCommissionLimit <= 0) return notifyError('佣金额度设定值必须大于 0');

    const values = {
      name: formName,
      price: formPrice,
      giftRatio: formGiftRatio,
      buyRatio: formBuyRatio,
      queueRatio: formQueueRatio,
      commissionLimit: formCommissionLimit,
      description: formDescription
    };

    if (editingPlan) {
      setAdminPlans(prev => updatePlanFromForm(prev, editingPlan.id, values));
      notifySuccess(`套餐“${editingPlan.id}”参数已更新成功。`);
    } else {
      setAdminPlans(prev => [...prev, createPlanFromForm(values)]);
      notifySuccess(`新套餐“${formName}”已配置建档并同步对外启租销售。`);
    }

    setIsModalOpen(false);
  };

  const handleTogglePlanStatus = (id: string) => {
    setAdminPlans(prev => togglePlanStatus(prev, id));
  };

  return {
    adminPlans,
    editingPlan,
    formBuyRatio,
    formCommissionLimit,
    formDescription,
    formGiftRatio,
    formName,
    formPrice,
    formQueueRatio,
    isModalOpen,
    setFormBuyRatio,
    setFormCommissionLimit,
    setFormDescription,
    setFormGiftRatio,
    setFormName,
    setFormPrice,
    setFormQueueRatio,
    setIsModalOpen,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleSaveOrUpdatePlan,
    handleTogglePlanStatus
  };
}
