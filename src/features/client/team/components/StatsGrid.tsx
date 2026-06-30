export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 select-none">
      <div className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:bg-white/2 transition-colors duration-300">
        <span className="text-xs text-[#cbc4d2]/50 font-medium tracking-wide">团队总人数</span>
        <span className="text-2xl lg:text-3xl font-black text-white font-mono mt-3">2,410</span>
      </div>
      
      <div className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:bg-white/2 transition-colors duration-300">
        <span className="text-xs text-[#cbc4d2]/50 font-medium tracking-wide">L1 直属人数</span>
        <span className="text-2xl lg:text-3xl font-black text-[#cfbcff] font-mono mt-3">42</span>
      </div>
      
      <div className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:bg-white/2 transition-colors duration-300">
        <span className="text-xs text-[#cbc4d2]/50 font-medium tracking-wide">L2-L3 团队直销</span>
        <span className="text-2xl lg:text-3xl font-black text-white font-mono mt-3">850</span>
      </div>
      
      <div className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:bg-white/2 transition-colors duration-300">
        <span className="text-xs text-[#cbc4d2]/50 font-medium tracking-wide">活跃节点数</span>
        <span className="text-2xl lg:text-3xl font-black text-white font-mono mt-3">1,518</span>
      </div>
    </div>
  );
}
