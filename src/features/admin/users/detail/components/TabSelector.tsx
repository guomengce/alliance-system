import { Segmented } from 'antd';
import type { TabSelectorProps } from '../../types';
import type { AdminUserTab } from '../../types';

const tabs: Array<{ value: AdminUserTab; label: string }> = [
  { value: 'profile', label: '基本资料 & 状态标定' },
  { value: 'wallet', label: '钱包资产核拨调整' },
  { value: 'team', label: '直属下线团队节点 (裂变)' },
];

export function TabSelector({ activeTab, setActiveTab }: TabSelectorProps) {
  return (
    <Segmented<AdminUserTab>
      className="alliance-antd-admin-segmented-tabs alliance-antd-admin-user-detail-segmented"
      options={tabs}
      value={activeTab}
      onChange={setActiveTab}
    />
  );
}
