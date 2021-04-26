import Collection from "./collection";
import Cell from "./cell";

export class CellCollection extends Collection {
  protected values: Cell[] = [];

  public getValues(): Cell[] {
    return super.getValues();
  }

  public get(key: string): Cell | null {
    return super.get(key);
  }

  public put(key: string, value: Cell): this {
    return super.put(key, value);
  }
}

export default CellCollection;
