import { DataNode } from 'rc-tree/lib/interface';
/** 计算选中范围，只考虑expanded情况以优化性能 */
export declare function calcRangeKeys(treeData: DataNode[], expandedKeys: string[], startKey?: string, endKey?: string): string[];
export declare function convertDirectoryKeysToNodes(treeData: DataNode[], keys: string[]): DataNode[];
