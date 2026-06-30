import type { ThemeConfig } from 'antd';
import { appThemeTokens as t } from '../tokens';

export const buttonTheme: NonNullable<ThemeConfig['components']>['Button'] = {
  borderRadius: t.radiusMd,
  contentFontSize: t.fontSizeBody,
  contentFontSizeSM: t.fontSizeCaption,
  defaultBg: 'rgba(255, 255, 255, 0.05)',
  defaultBorderColor: t.borderControl,
  defaultColor: t.textBody,
  defaultHoverBg: 'rgba(255, 255, 255, 0.1)',
  defaultHoverBorderColor: t.borderControlHover,
  defaultHoverColor: t.textPrimary,
  defaultActiveBg: t.bgControlHover,
  defaultActiveBorderColor: t.borderActive,
  defaultActiveColor: t.textPrimary,
  primaryColor: t.textPrimary,
};
