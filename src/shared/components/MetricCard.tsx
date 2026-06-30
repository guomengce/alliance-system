import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  subtext?: string;
  subIcon?: ReactNode;
  hoverGradientColor?: string; // e.g., 'bg-[#cfbcff]'
  extraContent?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function MetricCard({
  label,
  value,
  icon,
  subtext,
  subIcon,
  hoverGradientColor = 'bg-[#cfbcff]',
  extraContent,
  onClick,
  className = ''
}: MetricCardProps) {
  const isClickable = !!onClick;
  
  return (
    <div
      onClick={onClick}
      className={`glass-card p-4 sm:p-6 rounded-2xl flex flex-col justify-between min-h-[140px] sm:min-h-[160px] relative overflow-hidden group select-none transition-all duration-300 ${
        isClickable ? 'cursor-pointer hover:border-white/10 active:scale-[0.99]' : ''
      } ${className}`}
    >
      {/* Glow ambient background sphere */}
      <div className={`absolute -right-8 -top-8 w-32 h-32 ${hoverGradientColor}/5 blur-[60px] rounded-full group-hover:${hoverGradientColor}/10 transition-all duration-500`} />
      
      <div className="flex justify-between items-start z-10">
        <span className="text-xs sm:text-xs font-semibold text-[#cbc4d2]/70 uppercase tracking-widest font-sans">
          {label}
        </span>
        <span className="w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[#cfbcff] group-hover:scale-105 group-hover:text-white group-hover:bg-[#cfbcff]/20 transition-all duration-300 shrink-0">
          {icon}
        </span>
      </div>

      <div className="mt-4 z-10 flex flex-col justify-end flex-grow">
        <h2 className="text-xl sm:text-2xl md:text-[25px] font-black text-white font-mono break-all leading-tight tracking-tight">
          {value}
        </h2>
        
        {subtext && (
          <div className="flex items-center gap-1.5 mt-2 text-xs sm:text-xs text-[#cfbcff]/70 font-semibold font-sans">
            {subIcon && <span className="shrink-0">{subIcon}</span>}
            <span className="truncate">{subtext}</span>
          </div>
        )}

        {extraContent && (
          <div className="mt-2.5 z-10 w-full">
            {extraContent}
          </div>
        )}
      </div>
    </div>
  );
}
