import Coordinate, { CoordinateInterface } from "./coordinate";
export interface DirectionInterface extends CoordinateInterface {
    active?: boolean;
}
export declare class Direction extends Coordinate implements DirectionInterface {
    active: boolean;
    constructor(direction: DirectionInterface);
    isActive(): boolean;
    isInactive(): boolean;
    setActive(active?: boolean): void;
    setInactive(): void;
    isUp(): boolean;
    isDown(): boolean;
    isLeft(): boolean;
    isRight(): boolean;
}
export default Direction;
//# sourceMappingURL=direction.d.ts.map