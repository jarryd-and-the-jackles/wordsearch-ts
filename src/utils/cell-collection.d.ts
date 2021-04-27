import Collection from "./collection";
import Cell from "./cell";
export declare class CellCollection extends Collection {
    protected values: Cell[];
    getValues(): Cell[];
    get(key: string): Cell | null;
    put(key: string, value: Cell): this;
}
export default CellCollection;
//# sourceMappingURL=cell-collection.d.ts.map