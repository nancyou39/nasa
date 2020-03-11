import React from 'react';
declare type InputRef = HTMLInputElement | HTMLTextAreaElement;
interface InputProps {
    prefixCls: string;
    id: string;
    inputElement: React.ReactElement;
    disabled: boolean;
    autoFocus: boolean;
    editable: boolean;
    accessibilityIndex: number;
    value: string;
    open: boolean;
    tabIndex: number;
    onKeyDown: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLElement>;
    onMouseDown: React.MouseEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLElement>;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLElement>;
}
declare const RefInput: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>>;
export default RefInput;
