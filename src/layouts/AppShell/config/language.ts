import type { LangCode } from '../types';

export interface LanguageOption {
  code: LangCode;
  label: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'zh', label: '简体中文' },
  { code: 'en', label: 'English' },
  { code: 'zht', label: '繁體中文' }
];

export const getLanguageShortLabel = (code: LangCode): string => {
  if (code === 'zh') return '中文';
  if (code === 'zht') return '繁體';
  return 'EN';
};
