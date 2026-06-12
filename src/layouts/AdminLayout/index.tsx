import AdminMobileDrawer from '../MainLayout/AdminMobileDrawer';
import LayoutFrame from '../MainLayout/LayoutFrame';
import type { AppStateContext } from '../MainLayout/types';

interface AdminLayoutProps {
  state: AppStateContext;
}

export default function AdminLayout({ state }: AdminLayoutProps) {
  return (
    <LayoutFrame state={state}>
      <AdminMobileDrawer state={state} />
    </LayoutFrame>
  );
}
