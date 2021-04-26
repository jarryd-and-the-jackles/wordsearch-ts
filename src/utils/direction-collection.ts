import Direction from "./direction";
import Collection from "./collection";

export class DirectionCollection extends Collection {
    protected values: Direction[] = [];

    public getValues(): Direction[] {
        return super.getValues();
    }

    public get(key: string): Direction {
        return super.get(key);
    }

    public put(key: string, value: Direction): this {
        return super.put(key, value);
    }
}

export default DirectionCollection;
