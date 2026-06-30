import { Layout } from 'antd';
import { useAppContext } from '../../context/AppContext';
import Content from './components/Content';
import GlobalAlertDialog from './components/GlobalAlertDialog';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import type { AppShellProps } from './types';
import './AppShell.css';

export default function AppShell({ portalMode }: AppShellProps) {
  const state = useAppContext();

  return (
    <Layout className="app-shell">
      <Sidebar portalMode={portalMode} state={state} />

      <Layout className="app-shell__main">
        <Header portalMode={portalMode} state={state} />
        <Content />
      </Layout>

      <GlobalAlertDialog state={state} />
    </Layout>
  );
}
