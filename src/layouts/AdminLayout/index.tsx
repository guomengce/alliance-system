import { useAppContext } from '../../context/AppContext';
import AdminMobileDrawer from '../MainLayout/AdminMobileDrawer';
import LayoutFrame from '../MainLayout/LayoutFrame';

export default function AdminLayout() {
  const state = useAppContext();

  return (
    <LayoutFrame state={state}>
      <AdminMobileDrawer state={state} />
    </LayoutFrame>
  );
}