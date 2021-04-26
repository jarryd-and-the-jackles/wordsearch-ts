import WordSearch, {WordSearchOptions} from "./wordsearch";
import Coordinate from "./utils/coordinate";
import Direction from "./utils/direction";
import Directions, {DirectionsOptions} from "./utils/directions";
import Cell from "./utils/cell";
import Alphabet from "./utils/alphabet";
import Grid from "./utils/grid";
import Row from "./utils/row";

export interface CreatorOptionsInterface {
  words?: string[];
  width?: number;
  height?: number;
  fixedSize?: boolean;
  letters?: string;
  directions?: DirectionsOptions;
  onFindWord?: Function;
  parentId?: string;
  lettersGrid?: string[][];
  cellOptions?: {
    width?: number;
    height?: number;
    style?: string;
    font?: string;
  };
}

export class Creator {
  public readonly alphabet: Alphabet = new Alphabet({});
  public readonly directions: Directions = new Directions();

  public words: string[] = [];
  public onFindWord: Function = Creator.returnNull;
  public parentId: string = "ws-parent";
  public cellOptions: { width?: number, height?: number, style?: string, font?: string };

  public fixedSize: boolean;
  public width: number = 8;
  public height: number = 8;
  public grid: Grid = new Grid({width: this.width, height: this.height, alphabet: this.alphabet});
  public lettersGrid: string[][] = [];
  public wordsAdded: boolean = false;

  static maxAttempts: number = 30;

  static debugging: boolean = false;
  static wordMap: { [p: string]: any } = {};

  public static returnNull(): null {
    return null;
  }

  public constructor({
                       words = [],
                       directions,
                       letters,
                       width = 8,
                       height = 8,
                       onFindWord = Creator.returnNull,
                       parentId = "ws-parent",
                       lettersGrid = [],
                       fixedSize = true,
                       cellOptions = {
                         width: 25,
                         height: 25,
                         font: "400 18px Calibri",
                         style: "#333",
                       },
                     }: CreatorOptionsInterface) {
    this.width = width;
    this.height = height;
    this.parentId = parentId;
    this.cellOptions = cellOptions;
    this.onFindWord = onFindWord;
    this.fixedSize = fixedSize;

    this.setWords(words);

    if (typeof directions !== "undefined") {
      this.directions = new Directions(directions);
    }

    if (typeof letters !== "undefined") {
      this.alphabet = new Alphabet({letters: letters});
    }

    if (lettersGrid.length === 0) {
      this.ensureCorrectGridSize();
      this.generateGrid();

      let attempts: number = 0;
      while (!this.areWordsAdded() && attempts < Creator.maxAttempts) {
        this.addWordsToGrid();
        attempts++;
      }

      if (!this.areWordsAdded()) {
        throw new Error(`Unable to add Words: attempted ${attempts} times.`);
      } else {
        if (Creator.debugging) {
          console.log(`Words added after "${attempts}" attempts`);
        }
      }
    } else {
      this.lettersGrid = lettersGrid;
    }
  }

  public create(): WordSearch {
    return new WordSearch(this.createOptions());
  }

  public createOptions(): WordSearchOptions {
    return {
      grid: this.getLettersGrid(),
      onFindWord: this.onFindWord,
      parentId: this.parentId,
      words: this.words,
      cellOptions: this.cellOptions,
    };
  }

  public ensureCorrectGridSize(): void {
    if (this.fixedSize) {
      return;
    }

    const words = this.getWords();
    const wordCountAdjustment: number = 1;
    const wordLengthAdjustment: number = 1;
    const lettersCountAdjustment: number = 1;

    let minGridSize: number = 0;

    // make sure we can fit all the words
    const min = Math.ceil(words.length * wordCountAdjustment);
    if (minGridSize < min) {
      minGridSize = min;
    }

    // make sure we can fit the words and collect the letters
    const letters: string[] = [];
    for (let i = 0; i < words.length; i++) {
      const word = this.getWord(i);
      const min = Math.ceil(word.length * wordLengthAdjustment);

      if (minGridSize < min) {
        minGridSize = min;
      }

      // we simply collect all unique letters
      for (let j = 0; j < word.length; j++) {
        if (letters.indexOf(word[i]) === -1) {
          letters.push(word[i]);
        }
      }
    }

    // make sure all letter can fit
    const lettersMin = Math.ceil(letters.length * lettersCountAdjustment);
    if (minGridSize < lettersMin) {
      minGridSize = lettersMin;
    }

    if (this.height < minGridSize) {
      this.height = minGridSize;
    }

    if (this.width < minGridSize) {
      this.width = minGridSize;
    }
  }

  public getDirections(): Directions {
    return this.directions;
  }

  public getDirectionKeys(): string[] {
    return this.getDirections().getAllKeys();
  }

  public getActiveDirections(): object | Direction[] {
    return this.getDirections().getAllActive();
  }

  public getActiveDirectionKeys(): string[] {
    return this.getDirections().getActiveKeys();
  }

  public getRandomDirection(): Direction {
    return this.getDirections().getRandom();
  }

  public getRandomStartCoordinate(wordLength: number, direction: Direction): Coordinate {
    return Coordinate.getRandom({
      grid: this.grid,
      direction: direction,
      wordLength: wordLength,
    });
  }

  public generateGrid(): void {
    this.grid = new Grid({
      width: this.width,
      height: this.height,
      alphabet: this.alphabet,
    });

    /**
     * clear the lettersSheet property as the sheet is going to change
     */
    this.lettersGrid = [];
  }

  public getGrid(): Grid {
    return this.grid;
  }

  public generateLettersSheet(): void {
    this.lettersGrid = [];

    let grid = this.getGrid();

    for (let i = 0; i < grid.getHeight(); i++) {
      const row = grid.getRow(i);

      if (!row) {
        throw new Error("There was an error creating the letter grid.");
      }

      this.addLettersGridRow(row, i);
    }
  }

  public addLettersGridRow(row: Row, rowIndex: number): void {
    this.lettersGrid[rowIndex] = [];

    for (let column_index = 0; column_index < row.getWidth(); column_index++) {
      let cell = row.getCell(column_index);

      if (!cell) {
        throw new Error("There was an error creating the letter grid.");
      }

      if (!cell.hasLetter()) {
        cell.randomFill();
      }

      this.lettersGrid[rowIndex][column_index] = <string>cell.getLetter();
    }
  }

  public getLettersGrid(): string[][] {
    if (this.lettersGrid.length === 0) {
      this.generateLettersSheet();
    }

    return this.lettersGrid;
  }

  public setWords(words: string[]) {
    this.words = words.filter(word => word.trim().length !== 0).map(word => word.trim().toUpperCase());
  }

  public getWords(): string[] {
    return this.words;
  }

  public getWordCount(): number {
    return this.getWords().length;
  }

  public getWord(index: number): string {
    return this.words[index];
  }

  public areWordsAdded(): boolean {
    return this.wordsAdded;
  }

  public addWordsToGrid() {
    let error = false;
    let i;

    for (i = 0; i < this.getWordCount(); i++) {
      let added = false;
      let attempts = 0;

      while (!added && attempts < Creator.maxAttempts) {
        added = this.addWordToGrid(this.getWord(i));
        attempts++;
      }

      if (!added) {
        error = true;
        break;
      }
    }

    if (error) {
      let cells: Cell[] = this.getGrid()
        .getRows()
        .getValues()
        .map(function (row: Row) {
          return row.getCells().getValues();
        })
        .reduce(function (accumulator, currentValue) {
          return accumulator.concat(...currentValue);
        });

      for (i = 0; i < cells.length; i++) {
        let cell = cells[i];
        cell.unsetLetter();
      }

      return false;
    }

    this.wordsAdded = true;
    return true;
  }

  public addWordToGrid(word: string) {
    const direction = this.getRandomDirection();

    let attempts: number = 0;
    let added: boolean = false;

    while (!added && attempts < Creator.maxAttempts) {
      const start = this.getRandomStartCoordinate(word.length, direction);
      added = this.getGrid().addWord(word, start, direction);
      attempts++;
    }

    return added;
  }
}

export default Creator;
