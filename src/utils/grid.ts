import RowCollection from "./row-collection";
import Alphabet from "./alphabet";
import Row from "./row";
import Coordinate from "./coordinate";
import Direction from "./direction";
import Creator from "../creator";

export interface GridOptions {
  width: number;
  height: number;
  rows?: RowCollection;
  alphabet?: Alphabet;
}

export class Grid {
  public width: number = 0;
  public height: number = 0;
  public alphabet?: Alphabet;

  protected rows: RowCollection = new RowCollection();

  constructor({width, height, rows, alphabet}: GridOptions) {
    this.setWidth(width);
    this.setHeight(height);
    this.alphabet = alphabet;
    this.makeGrid(rows);
  }

  public getAlphabet(): Alphabet | undefined {
    return this.alphabet;
  }

  public getWidth(): number {
    return this.width;
  }

  public setWidth(width: number): void {
    if (width < 0) {
      this.width = (width * -1);
    } else {
      this.width = width;
    }

    this.makeGrid(this.getRows());
  }

  public getHeight(): number {
    return this.height;
  }

  public setHeight(height: number): void {
    if (height < 0) {
      this.height = (height * -1);
    } else {
      this.height = height;
    }

    this.makeGrid(this.getRows());
  }

  public resetRows(): void {
    this.rows = new RowCollection();
  }

  public getRows(): RowCollection {
    return this.rows;
  }

  public getRow(key: number): Row | null {
    return this.getRows().get(String(key));
  }

  public putRow(key: number, value: Row): void {
    this.getRows().put(String(key), value);
  }

  public makeGrid(rows?: RowCollection) {
    if (typeof rows !== "undefined") {
      this.rows = rows;
    } else {
      this.resetRows();
    }

    for (let i = 0; i < this.getHeight(); i++) {
      const row = this.getRow(i);

      if (!row) {
        this.putRow(i, new Row({
          y: i,
          width: this.getWidth(),
          alphabet: this.getAlphabet(),
        }));
      }
    }
  }

  public addWord(word: string, start: Coordinate, direction: Direction): boolean {
    const coordinate = start.clone();
    const keepIndexes: number[] = [];
    const letterMap: { [p: number]: any } = {};
    let i: number = 0;
    let error = false;

    while (i < word.length) {
      const row = this.getRow(coordinate.getY());

      if (!row) {
        throw new Error(`Coordinate spans outside of the grid at y: ${coordinate.getY()}`);
      }

      const cell = row.getCell(coordinate.getX());

      if (!cell) {
        throw new Error(`Coordinate spans outside of the grid at x: ${coordinate.getX()}`);
      }

      if (cell.hasLetter()) {
        keepIndexes.push(i);

        if (!cell.hasLetter(word[i])) {
          error = true;
          break;
        }
      }

      if (Creator.debugging) {
        letterMap[i] = {...coordinate.clone(), letter: word[i]};
      }

      cell.setLetter(word[i]);
      coordinate.move(direction);

      i++;
    }

    if (error) {
      const toClean = word.substr(0, (i + 1));
      this.cleanWord(toClean, start, direction, keepIndexes);
      return false;
    }

    if (Creator.debugging) {
      Creator.wordMap[word] = letterMap;
    }

    return true;
  }

  public cleanWord(word: string, start: Coordinate, direction: Direction, keepIndexes: number[]): void {
    const coordinate = start.clone();

    for (let i = 0; i < word.length; i++) {
      const row = this.getRow(coordinate.getY());

      if (!row) {
        continue;
      }

      const cell = row.getCell(coordinate.getX());

      if (!cell || !cell.hasLetter(word[i])) {
        continue;
      }

      if (keepIndexes.indexOf(i) === -1) {
        cell.unsetLetter();
      }

      coordinate.move(direction);
    }
  }
}

export default Grid;
