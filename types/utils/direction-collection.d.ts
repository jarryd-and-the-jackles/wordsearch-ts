import Direction from "./direction";
import Collection from "./collection";
export declare class DirectionCollection extends Collection {
    protected values: Direction[];
    getValues(): Direction[];
    get(key: string): Direction;
    put(key: string, value: Direction): this;
}
export default DirectionCollection;
//# sourceMappingURL=direction-collection.d.ts.map