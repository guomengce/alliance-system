import { Tabs, type TabsProps } from 'antd';
import type { TabSelectorProps } from '../../types';
import type { AdminUserTab } from '../../types';

const tabs: Array<{ key: AdminUserTab; label: string }> = [
  { key: 'profile', label: '基本资料 & 状态标定' },
  { key: 'wallet', label: '钱包资产核拨调整' },
  { key: 'team', label: '直属下线团队节点 (裂变)' },
];

export function TabSelector({ activeTab, setActiveTab }: TabSelectorProps) {
  const items: TabsProps['items'] = tabs.map(tab => ({
    key: tab.key,
    label: tab.label,
  }));

  return (
    <Tabs
      activeKey={activeTab}
      className="alliance-antd-admin-user-detail-tabs"
      items={items}
      onChange={(key) => setActiveTab(key as AdminUserTab)}
    />
  );
}
