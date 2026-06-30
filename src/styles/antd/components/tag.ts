import type { ThemeConfig } from 'antd';
import { appThemeTokens as t } from '../tokens';

export const tagTheme: NonNullable<ThemeConfig['components']>['Tag'] = {
  borderRadiusSM: 999,
  defaultBg: 'rgba(255, 255, 255, 0.05)',
  defaultColor: t.textSecondary,
  fontSizeSM: t.fontSizeCaption,
};
