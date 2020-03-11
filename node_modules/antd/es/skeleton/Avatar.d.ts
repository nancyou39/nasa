import * as React from 'react';
import { ConfigConsumerProps } from '../config-provider';
import { SkeletonElementProps } from './Element';
export interface AvatarProps extends Omit<SkeletonElementProps, 'shape'> {
    shape?: 'circle' | 'square';
}
declare class SkeletonAvatar extends React.Component<AvatarProps, any> {
    static defaultProps: Partial<AvatarProps>;
    renderSkeletonAvatar: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export default SkeletonAvatar;
