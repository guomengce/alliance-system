import type { ThemeConfig } from 'antd';
import { appThemeTokens as t } from '../tokens';

export const tableTheme: NonNullable<ThemeConfig['components']>['Table'] = {
  borderColor: t.borderFaint,
  cellFontSize: t.fontSizeBody,
  cellFontSizeMD: t.fontSizeBody,
  cellFontSizeSM: t.fontSizeCaption,
  cellPaddingBlock: 14,
  cellPaddingInline: 18,
  cellPaddingBlockMD: 12,
  cellPaddingInlineMD: 16,
  colorBgContainer: 'transparent',
  footerBg: 'transparent',
  headerBg: 'rgba(20, 18, 24, 0.9)',
  headerColor: 'rgba(203, 196, 210, 0.55)',
  headerSplitColor: 'transparent',
  rowHoverBg: 'rgba(255, 255, 255, 0.03)',
};
