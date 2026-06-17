import { useAppContext } from '../../context/AppContext';
import LayoutFrame from '../MainLayout/LayoutFrame';

export default function ClientLayout() {
  const state = useAppContext();

  return <LayoutFrame state={state} />;
}