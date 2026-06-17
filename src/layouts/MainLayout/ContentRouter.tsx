import { AnimatePresence } from 'motion/react';
import { renderActivePage } from './pageRegistry';
import type { AppStateContext } from './types';

interface ContentRouterProps {
  state: AppStateContext;
}

export default function ContentRouter({ state }: ContentRouterProps) {
  return (
    <AnimatePresence mode="wait">
      {renderActivePage(state)}
    </AnimatePresence>
  );
}
