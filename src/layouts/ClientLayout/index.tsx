import LayoutFrame from '../MainLayout/LayoutFrame';
import type { AppStateContext } from '../MainLayout/types';

interface ClientLayoutProps {
  state: AppStateContext;
}

export default function ClientLayout({ state }: ClientLayoutProps) {
  return <LayoutFrame state={state} />;
}
