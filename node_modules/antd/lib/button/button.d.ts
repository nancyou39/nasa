import * as React from 'react';
import Group from './button-group';
import { ConfigConsumerProps } from '../config-provider';
import { Omit } from '../_util/type';
import { SizeType } from '../config-provider/SizeContext';
declare const ButtonTypes: ["default", "primary", "ghost", "dashed", "danger", "link"];
export declare type ButtonType = typeof ButtonTypes[number];
declare const ButtonShapes: ["circle", "circle-outline", "round"];
export declare type ButtonShape = typeof ButtonShapes[number];
declare const ButtonHTMLTypes: ["submit", "button", "reset"];
export declare type ButtonHTMLType = typeof ButtonHTMLTypes[number];
export interface BaseButtonProps {
    type?: ButtonType;
    icon?: React.ReactNode;
    shape?: ButtonShape;
    size?: SizeType;
    loading?: boolean | {
        delay?: number;
    };
    prefixCls?: string;
    className?: string;
    ghost?: boolean;
    danger?: boolean;
    block?: boolean;
    children?: React.ReactNode;
}
export declare type AnchorButtonProps = {
    href: string;
    target?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps & Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;
export declare type NativeButtonProps = {
    htmlType?: ButtonHTMLType;
    onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps & Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;
export declare type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;
interface ButtonState {
    loading?: boolean | {
        delay?: number;
    };
    hasTwoCNChar: boolean;
}
declare class Button extends React.Component<ButtonProps, ButtonState> {
    static Group: typeof Group;
    static __ANT_BUTTON: boolean;
    static contextType: React.Context<ConfigConsumerProps>;
    static defaultProps: {
        loading: boolean;
        ghost: boolean;
        block: boolean;
        htmlType: string;
    };
    private delayTimeout;
    private buttonNode;
    constructor(props: ButtonProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: ButtonProps): void;
    componentWillUnmount(): void;
    saveButtonRef: (node: HTMLElement | null) => void;
    handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    fixTwoCNChar(): void;
    isNeedInserted(): boolean;
    render(): JSX.Element;
}
export default Button;
