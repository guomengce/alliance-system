import type { ThemeConfig } from 'antd';
import { appThemeTokens as t } from '../tokens';

export const tabsTheme: NonNullable<ThemeConfig['components']>['Tabs'] = {
  cardBg: t.bgSurface,
  horizontalItemGutter: 16,
  inkBarColor: t.primaryLight,
  itemActiveColor: t.primaryLight,
  itemColor: t.textMuted,
  itemHoverColor: t.textPrimary,
  itemSelectedColor: t.primaryLight,
  titleFontSize: t.fontSizeBody,
};
