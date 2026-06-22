import { EditorModal } from './components/EditorModal';
import { List } from './components/List';
import { Toolbar } from './components/Toolbar';
import { usePlansState } from './hooks/usePlansState';

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
  } = usePlansState();

  return (
    <div id="admin_plans_view" className="space-y-6 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 flex-grow flex flex-col">
        <Toolbar onOpenCreateModal={handleOpenCreateModal} />
        <List plans={adminPlans} onOpenEditModal={handleOpenEditModal} onTogglePlanStatus={handleTogglePlanStatus} />
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
