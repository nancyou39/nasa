import * as React from 'react';
import { SkeletonTitleProps } from './Title';
import { SkeletonParagraphProps } from './Paragraph';
import { ConfigConsumerProps } from '../config-provider';
import SkeletonButton from './Button';
import SkeletonAvatar, { AvatarProps } from './Avatar';
import SkeletonInput from './Input';
interface SkeletonAvatarProps extends Omit<AvatarProps, 'active'> {
}
export interface SkeletonProps {
    active?: boolean;
    loading?: boolean;
    prefixCls?: string;
    className?: string;
    children?: React.ReactNode;
    avatar?: SkeletonAvatarProps | boolean;
    title?: SkeletonTitleProps | boolean;
    paragraph?: SkeletonParagraphProps | boolean;
}
declare class Skeleton extends React.Component<SkeletonProps, any> {
    static Button: typeof SkeletonButton;
    static Avatar: typeof SkeletonAvatar;
    static Input: typeof SkeletonInput;
    static defaultProps: Partial<SkeletonProps>;
    renderSkeleton: ({ getPrefixCls, direction }: ConfigConsumerProps) => {} | null | undefined;
    render(): JSX.Element;
}
export default Skeleton;
