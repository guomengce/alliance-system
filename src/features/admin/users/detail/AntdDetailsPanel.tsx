import { Button, Tabs, type TabsProps } from 'antd';
import { Check } from 'lucide-react';

import type { DetailsPanelProps } from '../types';
import AntdProfilePanel from './components/AntdProfilePanel';
import AntdSummaryHeader from './components/AntdSummaryHeader';
import AntdTeamPanel from './components/AntdTeamPanel';
import AntdWalletPanel from './components/AntdWalletPanel';

const TAB_LABELS = {
  profile: '\u57fa\u672c\u8d44\u6599 & \u72b6\u6001\u6807\u5b9a',
  wallet: '\u94b1\u5305\u8d44\u4ea7\u6838\u62e8\u8c03\u6574',
  team: '\u76f4\u5c5e\u4e0b\u7ebf\u56e2\u961f\u8282\u70b9 (\u88c2\u53d8)',
};

export default function AntdDetailsPanel(props: DetailsPanelProps) {
  const {
    activeTab,
    setActiveTab,
    onBack,
    onSave,
  } = props;

  const items: TabsProps['items'] = [
    { key: 'profile', label: TAB_LABELS.profile },
    { key: 'wallet', label: TAB_LABELS.wallet },
    { key: 'team', label: TAB_LABELS.team },
  ];

  return (
    <div id="admin_users_details_panel" className="space-y-6 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <AntdSummaryHeader
        editingUser={props.editingUser}
        formNickname={props.formNickname}
        formStatus={props.formStatus}
        formTier={props.formTier}
        onBack={onBack}
      />

      <Tabs
        activeKey={activeTab}
        className="alliance-antd-user-detail-tabs"
        items={items}
        onChange={(key) => setActiveTab(key as DetailsPanelProps['activeTab'])}
      />

      {activeTab === 'profile' && (
        <AntdProfilePanel
          editingUser={props.editingUser}
          formNickname={props.formNickname}
          setFormNickname={props.setFormNickname}
          formEmail={props.formEmail}
          setFormEmail={props.setFormEmail}
          formPhone={props.formPhone}
          setFormPhone={props.setFormPhone}
          formSponsor={props.formSponsor}
          setFormSponsor={props.setFormSponsor}
          formStatus={props.formStatus}
          setFormStatus={props.setFormStatus}
          formRegDate={props.formRegDate}
          formKycL1={props.formKycL1}
          setFormKycL1={props.setFormKycL1}
          formKycL2={props.formKycL2}
          setFormKycL2={props.setFormKycL2}
          onResetPasswordEmail={props.onResetPasswordEmail}
        />
      )}

      {activeTab === 'wallet' && (
        <AntdWalletPanel
          formUsdt={props.formUsdt}
          setFormUsdt={props.setFormUsdt}
          formFrozenUsdt={props.formFrozenUsdt}
          setFormFrozenUsdt={props.setFormFrozenUsdt}
          formTroo={props.formTroo}
          setFormTroo={props.setFormTroo}
          formPending={props.formPending}
          setFormPending={props.setFormPending}
          formNodes={props.formNodes}
          formVolume={props.formVolume}
        />
      )}

      {activeTab === 'team' && (
        <AntdTeamPanel
          teamSearchText={props.teamSearchText}
          setTeamSearchText={props.setTeamSearchText}
          formNodes={props.formNodes}
          formVolume={props.formVolume}
          filteredTeamMembers={props.filteredTeamMembers}
        />
      )}

      <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-end">
        <Button className="alliance-antd-user-detail-cancel-button" onClick={onBack}>
          \u53d6\u6d88\u8fd4\u56de\u540d\u518c
        </Button>
        <Button
          className="alliance-antd-user-detail-save-button"
          icon={<Check className="w-4 h-4" />}
          onClick={onSave}
        >
          \u786e\u8ba4\u4fee\u6539
        </Button>
      </div>
    </div>
  );
}
