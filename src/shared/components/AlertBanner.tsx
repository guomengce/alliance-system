import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

interface AlertBannerProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
}

export default function AlertBanner({ message, type = 'success', onClose }: AlertBannerProps) {
  if (!message) return null;

  const config = {
    success: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      text: 'text-emerald-400',
      icon: <CheckCircle className="w-4.5 h-4.5 shrink-0 text-emerald-400" />
    },
    error: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      text: 'text-rose-400',
      icon: <AlertCircle className="w-4.5 h-4.5 shrink-0 text-rose-400" />
    },
    warning: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      text: 'text-amber-400',
      icon: <AlertTriangle className="w-4.5 h-4.5 shrink-0 text-amber-400" />
    },
    info: {
      bg: 'bg-[#cfbcff]/10',
      border: 'border-[#cfbcff]/20',
      text: 'text-[#cfbcff]',
      icon: <Info className="w-4.5 h-4.5 shrink-0 text-[#cfbcff]" />
    }
  };

  const current = config[type];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`p-3.5 sm:p-4 ${current.bg} border ${current.border} ${current.text} rounded-xl text-xs sm:text-[13px] flex items-start gap-2.5 shadow-sm relative overflow-hidden`}
    >
      {current.icon}
      <div className="flex-1 font-semibold leading-relaxed pr-6">{message}</div>
      {onClose && (
        <button 
          onClick={onClose} 
          className="absolute right-2.5 top-2.5 p-1 rounded-lg text-current opacity-60 hover:opacity-100 hover:bg-white/5 active:scale-95 transition-all outline-none"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </motion.div>
  );
}
