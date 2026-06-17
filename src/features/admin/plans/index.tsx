import { EditorModal } from './components/EditorModal';
import { List } from './components/List';
import { Toolbar } from './components/Toolbar';
import { usePlansState } from './hooks/usePlansState';
import type { Plan } from './types';
import { createPlanId } from './utils';

export default function AdminPlansView() {
  const {
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
  } = usePlansState();

  const handleOpenCreateModal = () => {
    setEditingPlan(null);
    setFormName('');
    setFormPrice(1000);
    setFormGiftRatio(1.0);
    setFormBuyRatio(40);
    setFormQueueRatio(60);
    setFormCommissionLimit(4000); // Defaults to a specific value
    setFormDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (plan: Plan) => {
    setEditingPlan(plan);
    setFormName(plan.name);
    setFormPrice(plan.price);
    setFormGiftRatio(plan.giftRatio);
    setFormBuyRatio(plan.buyRatio);
    setFormQueueRatio(plan.queueRatio);
    setFormCommissionLimit(plan.commissionLimit);
    setFormDescription(plan.description || '');
    setIsModalOpen(true);
  };

  const handleSaveOrUpdatePlan = () => {
    if (!formName) return alert('请输入套餐名称');
    if (formPrice <= 0) return alert('认购金额必须大于 0');
    if (formCommissionLimit <= 0) return alert('佣金额度具体设定值必须大于 0');

    if (editingPlan) {
      // Edit
      setAdminPlans(prev => prev.map(p => {
        if (p.id === editingPlan.id) {
          return {
            ...p,
            name: formName,
            price: formPrice,
            giftRatio: formGiftRatio,
            buyRatio: formBuyRatio,
            queueRatio: formQueueRatio,
            commissionLimit: formCommissionLimit,
            description: formDescription
          };
        }
        return p;
      }));
      alert(`套餐「${editingPlan.id}」参数已更新成功！`);
    } else {
      // Create new
      const newPlan: Plan = {
        id: createPlanId(),
        name: formName,
        price: formPrice,
        giftRatio: formGiftRatio,
        buyRatio: formBuyRatio,
        queueRatio: formQueueRatio,
        commissionLimit: formCommissionLimit,
        description: formDescription,
        status: 'enabled'
      };
      setAdminPlans(prev => [...prev, newPlan]);
      alert(`新套餐「${formName}」已配置建档并同步对外启租销售！`);
    }
    setIsModalOpen(false);
  };

  const togglePlanStatus = (id: string) => {
    setAdminPlans(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'enabled' ? 'disabled' : 'enabled' };
      }
      return p;
    }));
  };

  return (
    <div id="admin_plans_view" className="space-y-6 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 flex-grow flex flex-col">
        <Toolbar onOpenCreateModal={handleOpenCreateModal} />
        <List plans={adminPlans} onOpenEditModal={handleOpenEditModal} onTogglePlanStatus={togglePlanStatus} />
      </div>

      {/* Versatile Overlay Selection Modal Component matching the exact Commission details style */}
      {isModalOpen && (
        <EditorModal
          editingPlan={editingPlan}
          formName={formName}
          formPrice={formPrice}
          formGiftRatio={formGiftRatio}
          formBuyRatio={formBuyRatio}
          formQueueRatio={formQueueRatio}
          formCommissionLimit={formCommissionLimit}
          formDescription={formDescription}
          setFormName={setFormName}
          setFormPrice={setFormPrice}
          setFormGiftRatio={setFormGiftRatio}
          setFormBuyRatio={setFormBuyRatio}
          setFormQueueRatio={setFormQueueRatio}
          setFormCommissionLimit={setFormCommissionLimit}
          setFormDescription={setFormDescription}
          onClose={() => setIsModalOpen(false)}
          onSaveOrUpdatePlan={handleSaveOrUpdatePlan}
        />
      )}

    </div>
  );
}
