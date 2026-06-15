import type { BannerProps } from '../types';

export default function Banner({ onNavigateToTab }: BannerProps) {
  return (
    <div className="relative w-full h-[260px] rounded-2xl overflow-hidden glass-card group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6750a4] via-[#4d4465]/60 to-transparent z-10"></div>
      <img 
        className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:scale-105 transition-transform duration-1000" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXFyBetc_aW7x6ZT7sTQW1oDOPLd3VbyqzZcalrN1mX_RmitSPN04SH7hd-OF1UWmVm64ch4WwQ8vE9va_4hY67puf6xk4FC8jAPJ-OnU7lgsWwO6IAmZzD6R_DEPcj9IZRYBMLeOldXoYc8K-wOU03rJR3QINfrH3PYjZcbAoAZaZM7vHQGiMmUlX03f-gm8vpb-Ni_vUVa3sl4TzcrnVz1qNd5rWmZiVwVWVBekmhDxGCMe0YWj2DWNDwuqfgP1qo9IjTCFwojW-" 
        alt="Abstract blockchain connections"
        referrerPolicy="no-referrer"
      />
      <div className="relative z-20 h-full flex flex-col justify-center px-10 md:px-12 max-w-2xl">
        <span className="bg-[#e7c365] text-[#3e2e00] px-3 py-0.5 rounded-full text-xs font-bold w-fit mb-4 tracking-wide shadow-sm">
          限时活动 (Limited)
        </span>
        <h2 className="text-2xl md:text-3.5xl font-extrabold text-white leading-tight mb-2">
          同盟系统 2.0 正式上线
        </h2>
        <p className="text-sm md:text-base text-white/80 mb-6 font-medium leading-relaxed">
          尊享机构级理财与团队裂变收益，开启您的去中心化金融新纪元。
        </p>
        <button 
          onClick={() => onNavigateToTab('subscribe')}
          className="w-fit bg-[#cfbcff] text-[#381e72] px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-[#cfbcff]/20 transition-all active:scale-95 duration-200"
        >
          立即认购
        </button>
      </div>
    </div>
  );
}
