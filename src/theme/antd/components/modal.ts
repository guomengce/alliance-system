import type { ThemeConfig } from 'antd';
import { appThemeTokens as t } from '../tokens';

export const modalTheme: NonNullable<ThemeConfig['components']>['Modal'] = {
  contentBg: t.bgSurfaceRaised,
  footerBg: 'transparent',
  headerBg: t.bgSurfaceRaised,
  titleColor: t.textPrimary,
  titleFontSize: 16,
};
