import Collection from "./collection";
import Row from "./row";
export declare class RowCollection extends Collection {
    protected values: Row[];
    getValues(): Row[];
    get(key: string): Row | null;
    put(key: string, value: Row): this;
}
export default RowCollection;
//# sourceMappingURL=row-collection.d.ts.map