export declare class Collection {
    [p: string]: any;
    protected values: any[];
    protected keys: string[];
    protected key_value_map: number[];
    constructor(values?: any);
    isValidKey(key: string): boolean;
    isValidKeyIndex(key_index: number): boolean;
    getKeys(): string[];
    getValues(): any[];
    getKeyValueMap(): number[];
    get(key: string): any;
    put(key: string, value: any): this;
    push(value: any): this;
    protected setFromArray(values: any[]): void;
    protected setFromObject(values: object): void;
}
export default Collection;
//# sourceMappingURL=collection.d.ts.map