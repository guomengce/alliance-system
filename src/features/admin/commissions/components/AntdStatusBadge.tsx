import { Tag } from 'antd';

import type { StatusBadgeProps } from '../types';

const STATUS_TEXT = {
  credited: '\u5df2\u5165\u6c60\u5212\u8d26',
  pending: '\u5f85\u65e5\u7ec8\u5212\u8d26',
  poolInsufficient: '\u989d\u5ea6\u4e0d\u8db3\u963b\u585e',
  intercepted: '\u62e6\u622a\u56de\u7b3c',
  interceptedDesktop: '\u62e6\u622a\u56de\u7b3c\u5b58\u6c60',
  failed: '\u5e7f\u64ad\u5931\u8d25',
  failedDesktop: '\u5e7f\u64ad\u56de\u6eda\u5931\u8d25',
};

export default function AntdStatusBadge({ status, variant }: StatusBadgeProps) {
  const isMobile = variant === 'mobile';
  const baseClassName = isMobile
    ? 'alliance-antd-tag alliance-antd-commission-mobile-tag'
    : 'alliance-antd-tag';

  if (status === 'credited') {
    return <Tag className={`${baseClassName} alliance-antd-tag-success`}>{STATUS_TEXT.credited}</Tag>;
  }

  if (status === 'pending') {
    return <Tag className={`${baseClassName} alliance-antd-tag-warning animate-pulse`}>{STATUS_TEXT.pending}</Tag>;
  }

  if (status === 'pool_insufficient') {
    return <Tag className={`${baseClassName} alliance-antd-tag-pool`}>{STATUS_TEXT.poolInsufficient}</Tag>;
  }

  if (status === 'intercepted') {
    return (
      <Tag className={`${baseClassName} alliance-antd-tag-danger`}>
        {isMobile ? STATUS_TEXT.intercepted : STATUS_TEXT.interceptedDesktop}
      </Tag>
    );
  }

  return (
    <Tag className={`${baseClassName} alliance-antd-tag-danger`}>
      {isMobile ? STATUS_TEXT.failed : STATUS_TEXT.failedDesktop}
    </Tag>
  );
}
