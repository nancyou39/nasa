import * as React from 'react';
export interface SkeletonElementProps {
    prefixCls?: string;
    className?: string;
    style?: object;
    size?: 'large' | 'small' | 'default' | number;
    shape?: 'circle' | 'square' | 'round';
    active?: boolean;
}
declare class Element extends React.Component<SkeletonElementProps, any> {
    render(): JSX.Element;
}
export default Element;
