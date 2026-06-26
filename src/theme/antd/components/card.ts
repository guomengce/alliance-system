import type { ThemeConfig } from 'antd';
import { appThemeTokens as t } from '../tokens';

export const cardTheme: NonNullable<ThemeConfig['components']>['Card'] = {
  actionsBg: t.bgSurface,
  colorBgContainer: t.bgSurfaceRaised,
  colorBorderSecondary: t.borderSoft,
  headerBg: 'transparent',
  headerFontSize: 14,
};
