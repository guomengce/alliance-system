import type { ThemeConfig } from 'antd';
import { appThemeTokens as t } from '../tokens';

export const formTheme: NonNullable<ThemeConfig['components']>['Form'] = {
  labelColor: t.textSecondary,
  labelFontSize: t.fontSizeCaption,
  itemMarginBottom: 16,
  verticalLabelPadding: '0 0 8px',
};
