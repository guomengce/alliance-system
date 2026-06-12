export default function FooterInfo() {
  return (
    <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1.5 text-[9px] font-mono font-bold text-[#cbc4d2]/25 tracking-wider">
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
        <span>服务器已连接</span>
      </div>
      <span>V 2.4.0-PRO</span>
      <span>© 2024 Alliance System</span>
    </div>
  );
}
