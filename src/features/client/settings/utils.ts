import type { ActiveDevice } from './types';

export const ACTIVE_DEVICES: ActiveDevice[] = [
  { name: 'iPhone 15 Pro Max', location: '北京, 中国', ip: '103.45.12.89', time: '当前在线', current: true },
  { name: 'MacBook Pro 16" (M3 Max)', location: '上海, 中国', ip: '210.12.45.109', time: '11 分钟前', current: false }
];

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
