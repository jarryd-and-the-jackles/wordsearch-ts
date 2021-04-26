import Coordinate from "./coordinate";
import Alphabet from "./alphabet";

export interface CellOptions {
  x: number;
  y: number;
  alphabet?: Alphabet;
}

export class Cell {
  alphabet: Alphabet;
  letter: string | null = null;
  coordinate: Coordinate;

  constructor({x, y, alphabet}: CellOptions) {
    this.alphabet = typeof alphabet !== "undefined" ? alphabet : new Alphabet({});
    this.coordinate = new Coordinate({
      x: x,
      y: y,
    });
  }

  setLetter(letter: string) {
    this.letter = letter.toUpperCase();
  }

  unsetLetter() {
    this.letter = null;
  }

  getLetter() {
    return this.letter;
  }

  hasLetter(letter?: string) {
    if (!letter) {
      return this.getLetter() !== null;
    }

    return this.getLetter() === letter;
  }

  randomFill() {
    if (!this.hasLetter()) {
      this.letter = this.alphabet.getRandomLetter();
    }
  }

  getCoordinate(): Coordinate {
    return this.coordinate;
  }
}

export default Cell;
