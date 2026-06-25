import type { ThemeConfig } from 'antd';
import { appThemeTokens as t } from '../tokens';

export const selectTheme: NonNullable<ThemeConfig['components']>['Select'] = {
  activeBorderColor: t.borderActive,
  colorBgContainer: t.bgControlDeep,
  colorBgElevated: t.bgSurfaceRaised,
  colorText: t.textPrimary,
  colorTextPlaceholder: t.textPlaceholder,
  hoverBorderColor: t.borderActive,
  multipleItemBg: 'rgba(207, 188, 255, 0.1)',
  multipleItemBorderColor: 'rgba(207, 188, 255, 0.12)',
  optionActiveBg: 'rgba(207, 188, 255, 0.08)',
  optionSelectedBg: 'rgba(207, 188, 255, 0.14)',
  optionSelectedColor: t.primaryLight,
  selectorBg: t.bgControlDeep,
  singleItemHeightLG: 40,
};
