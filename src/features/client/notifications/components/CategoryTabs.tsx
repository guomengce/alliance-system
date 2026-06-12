import type { CategoryTabsProps } from '../types';
import { hasUnreadNotifications } from '../utils';

export default function CategoryTabs({
  categories,
  notifications,
  activeCategory,
  onSelectCategory
}: CategoryTabsProps) {
  return (
    <div className="flex border-b border-white/5 pb-1 gap-2 overflow-x-auto scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
            activeCategory === cat.id 
              ? 'bg-white/5 text-[#cfbcff] font-extrabold' 
              : 'text-[#cbc4d2]/80 hover:text-white'
          }`}
        >
          {cat.label}
          {cat.id !== 'all' && hasUnreadNotifications(notifications, cat.id) && (
            <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-[#ffb4ab]"></span>
          )}
        </button>
      ))}
    </div>
  );
}
