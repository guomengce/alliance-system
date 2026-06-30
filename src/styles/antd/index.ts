import type { ThemeConfig } from 'antd';
import { theme } from 'antd';
import { buttonTheme } from './components/button';
import { cardTheme } from './components/card';
import { formTheme } from './components/form';
import { inputNumberTheme, inputTheme } from './components/input';
import { modalTheme } from './components/modal';
import { paginationTheme } from './components/pagination';
import { selectTheme } from './components/select';
import { tableTheme } from './components/table';
import { tabsTheme } from './components/tabs';
import { tagTheme } from './components/tag';
import { globalTokens } from './tokens';

export const allianceAntdTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: globalTokens,
  components: {
    Button: buttonTheme,
    Card: cardTheme,
    Form: formTheme,
    Input: inputTheme,
    InputNumber: inputNumberTheme,
    Modal: modalTheme,
    Pagination: paginationTheme,
    Select: selectTheme,
    Table: tableTheme,
    Tabs: tabsTheme,
    Tag: tagTheme,
  },
};

export * from './tokens';
