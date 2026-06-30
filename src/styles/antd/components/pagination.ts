import type { ThemeConfig } from 'antd';
import { appThemeTokens as t } from '../tokens';

export const paginationTheme: NonNullable<ThemeConfig['components']>['Pagination'] = {
  colorBgContainer: t.bgControl,
  colorPrimary: t.primaryLight,
  colorPrimaryHover: t.primaryLight,
  itemActiveBg: 'rgba(207, 188, 255, 0.12)',
  itemBg: t.bgControl,
  itemInputBg: t.bgControl,
  itemSize: 32,
  miniOptionsSizeChangerTop: 0,
};
