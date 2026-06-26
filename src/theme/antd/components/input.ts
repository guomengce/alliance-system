import type { ThemeConfig } from 'antd';
import { appThemeTokens as t } from '../tokens';

export const inputTheme: NonNullable<ThemeConfig['components']>['Input'] = {
  activeBg: t.bgControlDeep,
  activeBorderColor: t.borderActive,
  addonBg: t.bgControl,
  colorBgContainer: t.bgControlDeep,
  colorText: t.textPrimary,
  colorTextPlaceholder: t.textPlaceholder,
  hoverBg: t.bgControlDeep,
  hoverBorderColor: t.borderActive,
  inputFontSize: t.fontSizeBody,
  paddingBlock: 10,
  paddingInline: 14,
};

export const inputNumberTheme: NonNullable<ThemeConfig['components']>['InputNumber'] = {
  activeBg: t.bgControlDeep,
  activeBorderColor: t.borderActive,
  addonBg: t.bgControl,
  colorBgContainer: t.bgControlDeep,
  colorText: t.textPrimary,
  colorTextPlaceholder: t.textPlaceholder,
  hoverBg: t.bgControlDeep,
  hoverBorderColor: t.borderActive,
  inputFontSize: t.fontSizeBody,
};
