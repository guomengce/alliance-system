import type { ComponentProps, ComponentType, ReactNode } from 'react';
import Card from 'antd/es/card';

type RawCardProps = ComponentProps<typeof Card>;

export type AntdCardProps = RawCardProps & {
  children?: ReactNode;
};

export const AntdCard = Card as unknown as ComponentType<AntdCardProps>;
