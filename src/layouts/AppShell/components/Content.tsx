import { AnimatePresence } from 'motion/react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';

const { Content: AntdContent } = Layout;

export default function Content() {
  const location = useLocation();

  return (
    <AntdContent className="app-shell__content">
      <AnimatePresence mode="wait">
        <div key={location.pathname} className="app-shell__route-content">
          <Outlet />
        </div>
      </AnimatePresence>
    </AntdContent>
  );
}
