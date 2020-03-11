/// <reference types="react" />
import { HeaderProps } from './Header';
export interface FixedHeaderProps<RecordType> extends HeaderProps<RecordType> {
    colWidths: number[];
    columCount: number;
}
declare function FixedHeader<RecordType>({ columns, flattenColumns, colWidths, columCount, stickyOffsets, ...props }: FixedHeaderProps<RecordType>): JSX.Element;
export default FixedHeader;
