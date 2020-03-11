import * as React from 'react';
import { SkeletonElementProps } from './Element';
import { ConfigConsumerProps } from '../config-provider';
interface SkeletonButtonProps extends Omit<SkeletonElementProps, 'size'> {
    size?: 'large' | 'small' | 'default';
}
declare class SkeletonButton extends React.Component<SkeletonButtonProps, any> {
    static defaultProps: Partial<SkeletonButtonProps>;
    renderSkeletonButton: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export default SkeletonButton;
