import Direction, { DirectionInterface } from "./direction";
import DirectionCollection from "./direction-collection";
export interface DirectionsOptions {
    active?: string[];
    inactive?: string[];
    custom?: CustomDirections;
}
export interface DirectionsInterface {
    up: DirectionInterface;
    down: DirectionInterface;
    left: DirectionInterface;
    right: DirectionInterface;
    left_up: DirectionInterface;
    left_down: DirectionInterface;
    right_up: DirectionInterface;
    right_down: DirectionInterface;
    [index: string]: DirectionInterface | Function | DirectionCollection;
}
export interface CustomDirections {
    [index: string]: DirectionInterface;
}
export declare class Directions implements DirectionsInterface {
    [index: string]: Direction | Function | DirectionCollection;
    down: Direction;
    left: Direction;
    left_down: Direction;
    left_up: Direction;
    right: Direction;
    right_down: Direction;
    right_up: Direction;
    up: Direction;
    customCollection: DirectionCollection;
    constructor(options?: DirectionsOptions);
    static getDefaultKeys(): string[];
    throwInvalidKeyError(key: string): void;
    throwInactiveKeyError(key: string): void;
    getCustomKeys(): string[];
    getAllKeys(): string[];
    isValidKey(key: string): boolean;
    isInvalidKey(key: string): boolean;
    setCustomCollection(collection: DirectionCollection): void;
    resetCustomCollection(): void;
    getCustomCollection(): DirectionCollection;
    setCustom(custom: CustomDirections): void;
    hasCustom(): boolean;
    isCustom(key: string): boolean;
    getCustom(key: string): Direction | null;
    get(key: string): Direction;
    isActive(key: string): boolean;
    setActive(active: string[]): void;
    getActive(key: string): Direction;
    isInactive(key: string): boolean;
    setInactive(inactive: string[]): void;
    getActiveKeys(): string[];
    getAllActive(): {
        [index: string]: Direction;
    };
    getRandom(active_only?: boolean): Direction;
    getRandomIndex(arrayLength: number): number;
}
export default Directions;
//# sourceMappingURL=directions.d.ts.map