import '../shared/antd-overrides.css';
import './antd-overrides.css';
import { AntdEditorModal } from './components/AntdEditorModal';
import { AntdList } from './components/AntdList';
import { Toolbar } from './components/Toolbar';
import { usePlansState } from './hooks/usePlansState';

export default function AdminPlansView() {
  const {
    adminPlans,
    editingPlan,
    isModalOpen,
    planDraft,
    plansResponse,
    setPlanDraft,
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
        <div className="rounded-xl border border-[#cfbcff]/15 bg-[#cfbcff]/5 px-4 py-3 text-xs text-[#cbc4d2]/70">
          <span className="font-semibold text-[#cfbcff]">数据流：</span>
          <span className="font-mono"> plansResponse[{plansResponse.requestId}] </span>
          <span>→</span>
          <span className="font-mono"> data.plans </span>
          <span>→</span>
          <span className="font-mono"> AntdList.plans ({adminPlans.length})</span>
        </div>
        <AntdList plans={adminPlans} onOpenEditModal={handleOpenEditModal} onTogglePlanStatus={handleTogglePlanStatus} />
      </div>

      {/* Versatile Overlay Selection Modal Component matching the exact Commission details style */}
      {isModalOpen && (
        <AntdEditorModal
          editingPlan={editingPlan}
          planDraft={planDraft}
          setPlanDraft={setPlanDraft}
          onClose={() => setIsModalOpen(false)}
          onSaveOrUpdatePlan={handleSaveOrUpdatePlan}
        />
      )}

    </div>
  );
}
