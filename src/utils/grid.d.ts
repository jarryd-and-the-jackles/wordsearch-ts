import RowCollection from "./row-collection";
import Alphabet from "./alphabet";
import Row from "./row";
import Coordinate from "./coordinate";
import Direction from "./direction";
export interface GridOptions {
    width: number;
    height: number;
    rows?: RowCollection;
    alphabet?: Alphabet;
}
export declare class Grid {
    width: number;
    height: number;
    alphabet?: Alphabet;
    protected rows: RowCollection;
    constructor({ width, height, rows, alphabet }: GridOptions);
    getAlphabet(): Alphabet | undefined;
    getWidth(): number;
    setWidth(width: number): void;
    getHeight(): number;
    setHeight(height: number): void;
    resetRows(): void;
    getRows(): RowCollection;
    getRow(key: number): Row | null;
    putRow(key: number, value: Row): void;
    makeGrid(rows?: RowCollection): void;
    addWord(word: string, start: Coordinate, direction: Direction): boolean;
    cleanWord(word: string, start: Coordinate, direction: Direction, keepIndexes: number[]): void;
}
export default Grid;
//# sourceMappingURL=grid.d.ts.map