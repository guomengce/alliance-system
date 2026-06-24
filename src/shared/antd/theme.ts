import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

export const allianceAntdTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorBgBase: '#0c0a0f',
    colorBgContainer: '#181421',
    colorBgElevated: '#181421',
    colorBorder: 'rgba(255, 255, 255, 0.1)',
    colorBorderSecondary: 'rgba(255, 255, 255, 0.05)',
    colorPrimary: '#cfbcff',
    colorText: '#e6e0e9',
    colorTextBase: '#e6e0e9',
    colorTextDescription: 'rgba(203, 196, 210, 0.65)',
    colorTextPlaceholder: 'rgba(203, 196, 210, 0.32)',
    borderRadius: 12,
    borderRadiusLG: 16,
    fontFamily: 'inherit',
  },
  components: {
    Button: {
      defaultBg: 'rgba(255, 255, 255, 0.05)',
      defaultBorderColor: 'rgba(255, 255, 255, 0.1)',
      defaultColor: '#e6e0e9',
      defaultHoverBg: 'rgba(255, 255, 255, 0.1)',
      defaultHoverBorderColor: 'rgba(255, 255, 255, 0.14)',
      defaultHoverColor: '#ffffff',
      primaryColor: '#110e16',
    },
    Card: {
      colorBgContainer: '#181421',
      colorBorderSecondary: 'rgba(255, 255, 255, 0.08)',
    },
    Input: {
      activeBg: '#110e16',
      activeBorderColor: 'rgba(207, 188, 255, 0.45)',
      colorBgContainer: '#110e16',
      hoverBg: '#110e16',
      hoverBorderColor: 'rgba(207, 188, 255, 0.45)',
    },
    InputNumber: {
      activeBg: '#110e16',
      activeBorderColor: 'rgba(207, 188, 255, 0.45)',
      colorBgContainer: '#110e16',
      hoverBg: '#110e16',
      hoverBorderColor: 'rgba(207, 188, 255, 0.45)',
    },
    Modal: {
      contentBg: '#181421',
      headerBg: '#181421',
      titleColor: '#ffffff',
    },
    Select: {
      colorBgContainer: '#110e16',
      colorBgElevated: '#181421',
      optionSelectedBg: 'rgba(207, 188, 255, 0.14)',
      optionSelectedColor: '#cfbcff',
    },
    Table: {
      borderColor: 'rgba(255, 255, 255, 0.05)',
      colorBgContainer: 'transparent',
      headerBg: 'transparent',
      headerColor: 'rgba(203, 196, 210, 0.5)',
      rowHoverBg: 'rgba(255, 255, 255, 0.02)',
    },
  },
};
