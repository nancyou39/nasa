import * as React from 'react';
import { EventDataNode, DataNode } from 'rc-tree/lib/interface';
import { ConfigConsumerProps } from '../config-provider';
import Tree, { TreeProps } from './Tree';
export declare type ExpandAction = false | 'click' | 'doubleClick';
export interface DirectoryTreeProps extends TreeProps {
    expandAction?: ExpandAction;
}
export interface DirectoryTreeState {
    expandedKeys?: string[];
    selectedKeys?: string[];
}
declare class DirectoryTree extends React.Component<DirectoryTreeProps, DirectoryTreeState> {
    static defaultProps: {
        showIcon: boolean;
        expandAction: string;
    };
    static getDerivedStateFromProps(nextProps: DirectoryTreeProps): DirectoryTreeState;
    state: DirectoryTreeState;
    tree: Tree;
    onDebounceExpand: (event: React.MouseEvent<HTMLElement>, node: EventDataNode) => void;
    lastSelectedKey?: string;
    cachedSelectedKeys?: string[];
    constructor(props: DirectoryTreeProps);
    onExpand: (expandedKeys: string[], info: {
        node: EventDataNode;
        expanded: boolean;
        nativeEvent: MouseEvent;
    }) => void;
    onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>, node: EventDataNode) => void;
    onDoubleClick: (event: React.MouseEvent<HTMLElement, MouseEvent>, node: EventDataNode) => void;
    onSelect: (keys: string[], event: {
        event: "select";
        selected: boolean;
        node: any;
        selectedNodes: DataNode[];
        nativeEvent: MouseEvent;
    }) => void;
    setTreeRef: (node: Tree) => void;
    expandFolderNode: (event: React.MouseEvent<HTMLElement, MouseEvent>, node: any) => void;
    setUncontrolledState: (state: DirectoryTreeState) => void;
    renderDirectoryTree: ({ getPrefixCls, direction }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export default DirectoryTree;
