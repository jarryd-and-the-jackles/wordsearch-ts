export class Collection {
  [p: string]: any

  protected values: any[] = [];
  protected keys: string[] = [];
  protected key_value_map: number[] = [];

  public constructor(values?: any) {
    if (typeof values === "undefined") {
      return;
    }

    if (Array.isArray(values)) {
      this.setFromArray(values);
    } else if (typeof values === "object") {
      this.setFromObject(values);
    }

    this.push(values);
  }

  public isValidKey(key: string): boolean {
    return this.getKeys().indexOf(key) !== -1;
  }

  public isValidKeyIndex(key_index: number): boolean {
    return this.getKeyValueMap().indexOf(key_index) !== -1;
  }

  public getKeys(): string[] {
    return this.keys;
  }

  public getValues(): any[] {
    return this.values;
  }

  public getKeyValueMap(): number[] {
    return this.key_value_map;
  }

  public get(key: string): any {
    if (!this.isValidKey(key)) {
      return null;
    }

    const key_index = this.getKeys().indexOf(key);

    if (!this.isValidKeyIndex(key_index)) {
      return null;
    }

    const value_index = this.getKeyValueMap().indexOf(key_index);

    if (typeof this.getValues()[value_index] === "undefined") {
      return null;
    }

    return this.getValues()[value_index];
  }

  public put(key: string, value: any): this {
    this.getValues().push(value);
    const value_index = this.getValues().indexOf(value);

    this.getKeys().push(key);
    this.getKeyValueMap()[value_index] = this.getKeys().indexOf(key);

    return this;
  }

  public push(value: any): this {
    this.getValues().push(value);
    const value_index = this.getValues().indexOf(value);
    const key = value_index.toString(10);

    this.getKeys().push(key);
    this.getKeyValueMap()[value_index] = this.getKeys().indexOf(key);

    return this;
  }

  protected setFromArray(values: any[]): void {
    for (let i = 0; i < values.length; i++) {
      const key = i.toString(10);

      this.put(key, values[i]);
    }
  }

  protected setFromObject(values: object): void {
    for (const key in values) {
      if (!values.hasOwnProperty(key)) {
        continue;
      }

      this.put(key, values);
    }
  }
}

export default Collection;
