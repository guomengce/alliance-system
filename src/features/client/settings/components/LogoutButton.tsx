import { Button } from 'antd';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  onLogout: () => void;
}

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <Button
      onClick={onLogout}
      icon={<LogOut className="w-4 h-4" />}
      className="alliance-antd-settings-logout-button w-full"
    >
      安全登出同盟系统
    </Button>
  );
}
