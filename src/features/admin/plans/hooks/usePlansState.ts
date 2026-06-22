import { useState } from 'react';
import { getInitialAdminPlans } from '../../../../api/admin/plans';
import type { Plan } from '../types';

export function usePlansState() {
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
    setAdminPlans,
    setEditingPlan,
    setFormBuyRatio,
    setFormCommissionLimit,
    setFormDescription,
    setFormGiftRatio,
    setFormName,
    setFormPrice,
    setFormQueueRatio,
    setIsModalOpen
  };
}
