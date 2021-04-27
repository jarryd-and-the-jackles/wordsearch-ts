import Direction from "./direction";
import Grid from "./grid";
export interface CoordinateInterface {
    x: number;
    y: number;
}
interface RandomOptions {
    grid: Grid;
    direction?: Direction;
    wordLength?: number;
}
export declare class Coordinate implements CoordinateInterface {
    x: number;
    y: number;
    constructor(coordinate: CoordinateInterface);
    static getRandom({ grid, direction, wordLength }: RandomOptions): Coordinate;
    getX(): number;
    getY(): number;
    move(direction: CoordinateInterface): void;
    clone(): Coordinate;
}
export default Coordinate;
//# sourceMappingURL=coordinate.d.ts.map