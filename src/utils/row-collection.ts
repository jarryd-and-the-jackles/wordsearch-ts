import Collection from "./collection";
import Row from "./row";

export class RowCollection extends Collection {
  protected values: Row[] = [];

  public getValues(): Row[] {
    return super.getValues();
  }

  public get(key: string): Row | null {
    return super.get(key);
  }

  public put(key: string, value: Row): this {
    return super.put(key, value);
  }
}

export default RowCollection;
