import { StickyOffsets, FixedType } from '../interface';
export interface FixedInfo {
    fixLeft: number | false;
    fixRight: number | false;
    lastFixLeft: boolean;
    firstFixRight: boolean;
}
export declare function getCellFixedInfo(colStart: number, colEnd: number, columns: {
    fixed?: FixedType;
}[], stickyOffsets: StickyOffsets): FixedInfo;
