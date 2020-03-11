import * as React from 'react';
import { SkeletonElementProps } from './Element';
import { ConfigConsumerProps } from '../config-provider';
interface SkeletonInputProps extends Omit<SkeletonElementProps, 'size' | 'shape'> {
    size?: 'large' | 'small' | 'default';
}
declare class SkeletonInput extends React.Component<SkeletonInputProps, any> {
    static defaultProps: Partial<SkeletonInputProps>;
    renderSkeletonInput: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export default SkeletonInput;
