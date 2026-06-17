import type { DetailsPanelProps } from '../types';
import { FooterActions } from './components/FooterActions';
import { ProfilePanel } from './components/ProfilePanel';
import { SummaryHeader } from './components/SummaryHeader';
import { TabSelector } from './components/TabSelector';
import { TeamPanel } from './components/TeamPanel';
import { WalletPanel } from './components/WalletPanel';

export default function DetailsPanel({
  editingUser,
  activeTab,
  setActiveTab,
  teamSearchText,
  setTeamSearchText,
  formNickname,
  setFormNickname,
  formEmail,
  setFormEmail,
  formPhone,
  setFormPhone,
  formSponsor,
  setFormSponsor,
  formStatus,
  setFormStatus,
  formRegDate,
  formTier,
  formUsdt,
  setFormUsdt,
  formFrozenUsdt,
  setFormFrozenUsdt,
  formTroo,
  setFormTroo,
  formPending,
  setFormPending,
  formNodes,
  formVolume,
  formKycL1,
  setFormKycL1,
  formKycL2,
  setFormKycL2,
  onBack,
  onResetPasswordEmail,
  onSave,
}: DetailsPanelProps) {
  return (
      <div id="admin_users_details_panel" className="space-y-6 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
        <SummaryHeader
          editingUser={editingUser}
          formNickname={formNickname}
          formStatus={formStatus}
          formTier={formTier}
          onBack={onBack}
        />

        <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'profile' && (
          <ProfilePanel
            editingUser={editingUser}
            formNickname={formNickname}
            setFormNickname={setFormNickname}
            formEmail={formEmail}
            setFormEmail={setFormEmail}
            formPhone={formPhone}
            setFormPhone={setFormPhone}
            formSponsor={formSponsor}
            setFormSponsor={setFormSponsor}
            formStatus={formStatus}
            setFormStatus={setFormStatus}
            formRegDate={formRegDate}
            formKycL1={formKycL1}
            setFormKycL1={setFormKycL1}
            formKycL2={formKycL2}
            setFormKycL2={setFormKycL2}
            onResetPasswordEmail={onResetPasswordEmail}
          />
        )}

        {activeTab === 'wallet' && (
          <WalletPanel
            formUsdt={formUsdt}
            setFormUsdt={setFormUsdt}
            formFrozenUsdt={formFrozenUsdt}
            setFormFrozenUsdt={setFormFrozenUsdt}
            formTroo={formTroo}
            setFormTroo={setFormTroo}
            formPending={formPending}
            setFormPending={setFormPending}
            formNodes={formNodes}
            formVolume={formVolume}
          />
        )}

        {activeTab === 'team' && (
          <TeamPanel
            teamSearchText={teamSearchText}
            setTeamSearchText={setTeamSearchText}
            formNodes={formNodes}
            formVolume={formVolume}
          />
        )}

        <FooterActions onBack={onBack} onSave={onSave} />
      </div>
  );
}
