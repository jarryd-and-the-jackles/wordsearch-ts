import Coordinate from "./coordinate";
import Alphabet from "./alphabet";
export interface CellOptions {
    x: number;
    y: number;
    alphabet?: Alphabet;
}
export declare class Cell {
    alphabet: Alphabet;
    letter: string | null;
    coordinate: Coordinate;
    constructor({ x, y, alphabet }: CellOptions);
    setLetter(letter: string): void;
    unsetLetter(): void;
    getLetter(): string | null;
    hasLetter(letter?: string): boolean;
    randomFill(): void;
    getCoordinate(): Coordinate;
}
export default Cell;
//# sourceMappingURL=cell.d.ts.map