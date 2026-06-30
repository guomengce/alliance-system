import type { Key } from 'react';
import { Button, Space, Statistic, Tag, Tooltip } from 'antd';
import { Edit, HelpCircle } from 'lucide-react';

import { AntdCard } from '../../../../shared/antd/AntdCard';
import type { ListProps, Plan } from '../types';

function PlanStatusTag({ plan }: { plan: Plan }) {
  const isEnabled = plan.status === 'enabled';

  return (
    <Tag className={`alliance-antd-plan-status-tag ${isEnabled ? 'is-enabled' : 'is-disabled'}`}>
      {isEnabled ? '可售中 (启用)' : '锁定中 (停用)'}
    </Tag>
  );
}

interface AntdPlanCardProps {
  key?: Key;
  plan: Plan;
  onOpenEditModal: (plan: Plan) => void;
  onTogglePlanStatus: (id: string) => void;
}

function PlanCard({ plan, onOpenEditModal, onTogglePlanStatus }: AntdPlanCardProps) {
  const isEnabled = plan.status === 'enabled';

  return (
    <AntdCard className={`alliance-antd-plan-card ${isEnabled ? 'is-enabled' : 'is-disabled'}`}>
      <div className="grid grid-cols-12 gap-5 items-center">
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-2">
          <Space size={10} wrap>
            <h4 className="text-base sm:text-lg font-black text-white tracking-tight">
              {plan.name}
            </h4>
            <PlanStatusTag plan={plan} />
          </Space>

          <p className="text-[13px] text-[#cbc4d2]/50 font-mono">
            套餐标识代码：<span className="text-[#cfbcff] select-all font-bold">{plan.id.toUpperCase()}</span>
          </p>

          <p className="text-xs text-[#cbc4d2]/70 leading-relaxed mt-1 italic">
            {plan.description || '系统管理员限定理财分销等级档。用户认购后，将释放对应佣金、TROO 股票份额以及队列配额。'}
          </p>
        </div>

        <div className="col-span-12 lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
          <Statistic
            className="alliance-antd-plan-stat"
            title="起购门槛"
            value={plan.price}
            suffix="U"
          />
          <Statistic
            className="alliance-antd-plan-stat is-success"
            title="佣金释放限额"
            value={plan.commissionLimit}
            suffix="U"
          />
          <Statistic
            className="alliance-antd-plan-stat is-purple"
            title="充值额外赠送"
            value={plan.giftRatio === 1 ? '无额外赠送' : `+${Math.round((plan.giftRatio - 1) * 100)}%`}
          />
          <Statistic
            className="alliance-antd-plan-stat is-warning"
            title="TROO 变现/排队"
            value={`${plan.buyRatio}% / ${plan.queueRatio}%`}
          />
        </div>

        <div className="col-span-12 lg:col-span-2 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 border-t lg:border-t-0 border-white/10 pt-4 lg:pt-0">
          <Button
            className="alliance-antd-plan-primary-button"
            icon={<Edit className="w-3.5 h-3.5" />}
            onClick={() => onOpenEditModal(plan)}
          >
            配置参数
          </Button>

          <Button
            className={`alliance-antd-plan-status-button ${isEnabled ? 'is-danger' : 'is-success'}`}
            onClick={() => onTogglePlanStatus(plan.id)}
          >
            {isEnabled ? '下架关停' : '启用上架'}
          </Button>
        </div>
      </div>
    </AntdCard>
  );
}

export function AntdList({ plans, onOpenEditModal, onTogglePlanStatus }: ListProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-5">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onOpenEditModal={onOpenEditModal}
            onTogglePlanStatus={onTogglePlanStatus}
          />
        ))}
      </div>

      <AntdCard className="alliance-antd-plan-guide-card">
        <Space align="start" size={8}>
          <Tooltip title="套餐数值会影响认购、佣金、TROO 配比和队列释放。">
            <HelpCircle className="w-4 h-4 text-[#cfbcff] mt-0.5" />
          </Tooltip>
          <div className="space-y-1.5">
            <p className="font-extrabold text-white text-[16px]">理财配置及数值对算关系指南：</p>
            <ul className="list-disc pl-4 space-y-1 opacity-80 leading-relaxed text-[14px]">
              <li><strong>佣金额度</strong>：该套餐被认购后，用户最多能够核扣获取的下线推广佣金绝对值。</li>
              <li><strong>买入比例与排队比例</strong>：用于指导用户认购套餐时本金中购买 TROO 与投入队列池的分配。</li>
              <li><strong>股票赠送比例</strong>：针对高净值认购级别给予的特殊赠送比例。</li>
            </ul>
          </div>
        </Space>
      </AntdCard>
    </>
  );
}
