import { getInitialPermissionDefinitions } from '../../../api/admin/rbac';
import { Workspace } from './components/Workspace';
import { useRbacState } from './hooks/useRbacState';

export default function AdminRbacView() {
  const permissionInventory = getInitialPermissionDefinitions();
  const rbacState = useRbacState();

  return (
    <Workspace
      permissionInventory={permissionInventory}
      {...rbacState}
    />
  );
}
