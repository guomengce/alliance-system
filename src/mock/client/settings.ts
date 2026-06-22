import type { ActiveDevice } from '../../features/client/settings/types';

const ACTIVE_DEVICE_SEEDS: ActiveDevice[] = [
  { name: 'iPhone 15 Pro Max', location: '北京, 中国', ip: '103.45.12.89', time: '当前在线', current: true },
  { name: 'MacBook Pro 16" (M3 Max)', location: '上海, 中国', ip: '210.12.45.109', time: '11 分钟前', current: false }
];

export const getInitialClientSettingsData = () => ({
  activeDevices: ACTIVE_DEVICE_SEEDS.map((device) => ({ ...device }))
});
