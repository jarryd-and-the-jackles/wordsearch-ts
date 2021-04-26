import CellCollection from "./cell-collection";
import Cell from "./cell";
import Alphabet from "./alphabet";

export interface RowOptions {
  y: number;
  width: number;
  cells?: CellCollection;
  alphabet?: Alphabet;
}

export class Row {
  public y: number;
  public width: number;
  public cells: CellCollection = new CellCollection();
  public alphabet?: Alphabet;

  public constructor({y, width, alphabet, cells}: RowOptions) {
    this.y = y;
    this.width = width;
    this.alphabet = alphabet;

    if (typeof cells !== "undefined") {
      this.cells = cells;
    }

    this.makeCells();
  }

  public getWidth(): number {
    return this.width;
  }

  public getCells(): CellCollection {
    return this.cells;
  }

  public getCell(key: number): Cell | null {
    return this.getCells().get(String(key));
  }

  public putCell(key: number, value: Cell): void {
    this.getCells().put(String(key), value);
  }

  public getAlphabet(): Alphabet | undefined {
    return this.alphabet;
  }

  public makeCells() {
    for (let i = 0; i < this.width; i++) {
      const cell = this.getCell(i);

      if (!cell) {
        this.putCell(i, new Cell({
          x: i,
          y: this.y,
          alphabet: this.getAlphabet(),
        }));
      }
    }
  }
}

export default Row;
