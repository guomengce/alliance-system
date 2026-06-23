import { Workspace } from './components/Workspace';
import { useRbacState } from './hooks/useRbacState';

export default function AdminRbacView() {
  const rbacState = useRbacState();

  return (
    <Workspace {...rbacState} />
  );
}
