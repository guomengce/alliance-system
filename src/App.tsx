import { ConfigProvider } from 'antd';
import { AnimatePresence } from 'motion/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppRouter from './router';
import { allianceAntdTheme } from './theme/antd';

function AppContent() {
  return (
    <div id="app_root" className="min-h-screen bg-[#0c0a0f] text-[#e6e0e9] antialiased">
      <AnimatePresence mode="wait">
        <AppRouter />
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ConfigProvider theme={allianceAntdTheme}>
      <BrowserRouter>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
}
