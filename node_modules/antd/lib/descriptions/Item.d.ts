import * as React from 'react';
export interface DescriptionsItemProps {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    label?: React.ReactNode;
    children: React.ReactNode;
    span?: number;
}
declare const DescriptionsItem: React.SFC<DescriptionsItemProps>;
export default DescriptionsItem;
