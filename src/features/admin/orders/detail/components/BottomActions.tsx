import type { DetailViewProps } from '../types';

interface BottomActionsProps {
  setSelectedOrder: DetailViewProps['setSelectedOrder'];
  setDetailSearchQuery: DetailViewProps['setDetailSearchQuery'];
}

export default function BottomActions({
  setSelectedOrder,
  setDetailSearchQuery
}: BottomActionsProps) {
  return (
    <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
      <button
        type="button"
        onClick={() => {
          setSelectedOrder(null);
          setDetailSearchQuery('');
        }}
        className="bg-[#cfbcff]/5 hover:bg-[#cfbcff]/15 text-[#cfbcff] border border-[#cfbcff]/10 px-6 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
      >
        返回订单列表
      </button>
    </div>
  );
}
