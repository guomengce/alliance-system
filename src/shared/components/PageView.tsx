import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface PageViewProps {
  children: ReactNode;
  className?: string;
}

export default function PageView({ children, className = 'space-y-6' }: PageViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
