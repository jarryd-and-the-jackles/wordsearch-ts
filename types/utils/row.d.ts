import CellCollection from "./cell-collection";
import Cell from "./cell";
import Alphabet from "./alphabet";
export interface RowOptions {
    y: number;
    width: number;
    cells?: CellCollection;
    alphabet?: Alphabet;
}
export declare class Row {
    y: number;
    width: number;
    cells: CellCollection;
    alphabet?: Alphabet;
    constructor({ y, width, alphabet, cells }: RowOptions);
    getWidth(): number;
    getCells(): CellCollection;
    getCell(key: number): Cell | null;
    putCell(key: number, value: Cell): void;
    getAlphabet(): Alphabet | undefined;
    makeCells(): void;
}
export default Row;
//# sourceMappingURL=row.d.ts.map