import "../sass/wordsearch.scss";
import Chronometer from "./utils/chronometer";

export function wordsToUpperCase(words: string[]): string[] {
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].toUpperCase();
  }

  return words;
}

export interface WordSearchOptions {
  grid?: string[][];
  words?: string[];
  onFindWord?: Function;
  parentId?: string;
  cellOptions?: {
    width?: number;
    height?: number;
    style?: string;
    font?: string;
  };
  wordSelectorPrefix?: string;
  expOptions?: { [p: string]: any };
}

export interface MatrixItem {
  letter: string;
  row: number;
  col: number;
}

export class WordSearch {
  public grid: string[][];
  public words: string[];
  public onFindWord: Function;
  public parent: HTMLElement;
  public rowSize: number;
  public colSize: number;
  public timeToFind: number[];
  public timer: Chronometer;
  public matrix: MatrixItem[][];
  public selectFrom: MatrixItem | null = null;
  public selected: MatrixItem[] = [];

  public wordSelectorPrefix: string;
  public cellOptions: { width?: number, height?: number, style?: string, font?: string } = {
    width: 25,
    height: 25,
    font: "400 18px Calibri",
    style: "#333",
  };

  public constructor({
                       grid = [
                         [".", ".", ".", ".", ".", "."],
                         [".", "T", "E", "S", "T", "."],
                         [".", ".", ".", ".", ".", "."],
                       ],
                       words = ["TEST"],
                       onFindWord = WordSearch.returnNull,
                       cellOptions = {},
                       parentId = "ws-parent",
                       wordSelectorPrefix = "ws-chosen-",
                     }: WordSearchOptions) {
    this.grid = grid;
    this.rowSize = this.grid.length;
    this.colSize = this.grid[0].length;
    this.words = wordsToUpperCase(words);
    this.onFindWord = onFindWord.bind(this);
    this.wordSelectorPrefix = wordSelectorPrefix;

    this.setCellOptions(cellOptions);
    const parent = document.getElementById(parentId);

    if (!parent) {
      throw new TypeError(`Invalid Type passed: expecting instance of "HTMLElement", got "null"`);
    }

    this.parent = parent;
    this.parent.setAttribute("class", "ws-wrapper");

    this.timeToFind = new Array(this.words.length).fill(-1);
    this.matrix = this.initMatrix();
    this.timer = new Chronometer();
    this.drawGameArea();
    this.displayScore();
  }

  public setCellOptions({
                          width = this.cellOptions.width,
                          height = this.cellOptions.height,
                          font = this.cellOptions.font,
                          style = this.cellOptions.style,
                        }: { width?: number, height?: number, style?: string, font?: string }): void {
    this.cellOptions = {
      width,
      height,
      style,
      font,
    };
  }

  public drawGameArea() {
    const scoreArea = document.createElement("h2");
    const scoreLabel = document.createElement("div");
    scoreLabel.id = "ws-score";
    scoreArea.appendChild(scoreLabel);
    this.parent.appendChild(scoreArea);

    const gridArea = document.createElement("section");
    gridArea.setAttribute("class", "ws-area");
    this.drawMatrix(gridArea);
    this.parent.appendChild(gridArea);

    const wordsArea = document.createElement("ul");
    wordsArea.setAttribute("class", "ws-words");
    this.drawWordList(wordsArea);
    this.parent.appendChild(wordsArea);
  }

  public getScore(): number {
    if (this.timeToFind.length === 0) {
      return 0;
    }

    return this.timeToFind.map(function (i: number): number {
      return (i > 0 ? 1 : 0);
    }).reduce(function (a: number, b: number): number {
      return a + b;
    });
  }

  public getRemaining(): number {
    return this.timeToFind.map(function (i: number): number {
      return (i > 0 ? 0 : 1);
    }).reduce(function (a: number, b: number): number {
      return a + b;
    });
  }

  public getTiming(): number[] {
    return this.timeToFind.slice();
  }

  public displayScore(): void {
    const elem = this.parent.querySelector("#ws-score");

    if (!elem) {
      throw new TypeError(`Invalid Type: expecting instance of "Element", got "null"`);
    }

    elem.innerHTML = "Found " + this.getScore() + " out of " + this.words.length + " words so far.";
  }

  public initMatrix(): MatrixItem[][] {
    let matrix: MatrixItem[][] = [];
    for (let row = 0; row < this.rowSize; row++) {
      for (let col = 0; col < this.colSize; col++) {
        const item: MatrixItem = {
          letter: this.grid[row][col], // Default value
          row: row,
          col: col,
        };
        if (!matrix[row]) {
          matrix[row] = [];
        }
        matrix[row][col] = item;
      }
    }
    return matrix;
  }

  public drawWordList(target: HTMLElement): void {
    const words = this.words;
    for (let i = 0; i < words.length; i++) {
      const liEl = document.createElement("li");
      liEl.id = this.wordSelectorPrefix + words[i].toLowerCase();
      liEl.setAttribute("class", "ws-word");
      liEl.setAttribute("text-decoration", "none");
      liEl.innerHTML = words[i];
      target.appendChild(liEl);
    }
  }

  public getItem(row: number, col: number): MatrixItem {
    if (typeof this.matrix[row] === "undefined") {
      throw new Error(`Invalid type: expected "MatrixItem", got "${(typeof this.matrix[row])}"`);
    }

    return this.matrix[row][col];
  }

  public getItems(rowFrom: number, colFrom: number, rowTo: number, colTo: number): MatrixItem[] {
    const items = [];

    if (rowFrom === rowTo || colFrom === colTo || Math.abs(rowTo - rowFrom) === Math.abs(colTo - colFrom)) {
      let shiftY = (rowFrom === rowTo) ? 0 : (rowTo > rowFrom) ? 1 : -1,
        shiftX = (colFrom === colTo) ? 0 : (colTo > colFrom) ? 1 : -1,
        row = rowFrom,
        col = colFrom;
      items.push(this.getItem(row, col));
      do {
        row += shiftY;
        col += shiftX;
        items.push(this.getItem(row, col));
      } while (row !== rowTo || col !== colTo);
    }
    return items;
  }

  public drawMatrix(target: HTMLElement): void {
    const rowcount = this.rowSize;
    const columnCount = this.colSize;
    for (let row = 0; row < rowcount; row++) {
      // New row
      const divEl = document.createElement("div");
      divEl.setAttribute("class", "ws-row");
      target.appendChild(divEl);
      for (let col = 0; col < columnCount; col++) {
        const item = this.matrix[row][col];
        const cvEl = document.createElement("canvas");
        cvEl.setAttribute("class", "ws-col");
        cvEl.setAttribute("width", String(this.cellOptions.width));
        cvEl.setAttribute("height", String(this.cellOptions.height));

        // Fill text in middle center
        const x = cvEl.width / 2;
        const y = cvEl.height / 2;
        const ctx = cvEl.getContext("2d");

        if (!ctx) {
          throw new TypeError(`Invalid Type: expecting instance of "CanvasRenderingContext2D", got "null"`);
        }
        ctx.font = String(this.cellOptions.font);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = String(this.cellOptions.style);
        ctx.fillText(item.letter, x, y);

        // Add event listeners
        cvEl.addEventListener("touchend", this.handleSelect(item));
        cvEl.addEventListener("mouseup", this.handleSelect(item));
        cvEl.addEventListener("mouseover", this.handleMouseover(item));
        divEl.appendChild(cvEl);
      }
    }
  }

  public handleSelect(item: MatrixItem): EventListener {
    const that = this;
    return function (event): boolean {
      event.preventDefault();

      // If no captured touch, set the start and exit
      if (!that.selectFrom) {
        that.selectFrom = item;
        // Highlight the starting point
        that.highlightItem(item);

        return false;
      }

      // If this is a second touch, we will validate the entire selection
      // This is to allow for mobile use as the "mouseover" event has no equivalent for touch
      that.selected = that.getItems(that.selectFrom.row, that.selectFrom.col, item.row, item.col);
      that.selectFrom = null;
      that.clearHighlight();
      that.validateSelection(that.selected);
      that.selected = [];

      return false;
    };
  }

  public handleMouseover(item: MatrixItem): EventListener {
    const that = this;
    return function (): void {
      if (!that.selectFrom) {
        return;
      }

      that.selected = that.getItems(that.selectFrom.row, that.selectFrom.col, item.row, item.col);
      that.clearHighlight();
      for (let i = 0; i < that.selected.length; i++) {
        that.highlightItem(that.selected[i]);
      }
    };
  }

  public highlightItem(item: MatrixItem): void {
    const el = this.parent.querySelector(".ws-row:nth-child(" + (item.row + 1) + ") .ws-col:nth-child(" + (item.col + 1) + ")");

    if (!el) {
      throw new TypeError(`Invalid type: expected "MatrixItem", got "${(typeof el)}"`);
    }

    el.classList.add("ws-selected");
  }

  public clearHighlight(): void {
    const selectedEls = this.parent.querySelectorAll(".ws-selected");
    for (let i = 0; i < selectedEls.length; i++) {
      selectedEls[i].classList.remove("ws-selected");
    }
  }

  public markAsFound(selected: Array<MatrixItem>, word?: string): void {
    for (let i = 0; i < selected.length; i++) {
      const row = selected[i].row + 1,
        col = selected[i].col + 1,
        el = this.parent.querySelector(".ws-row:nth-child(" + row + ") .ws-col:nth-child(" + col + ")");

      if (!el) {
        throw new TypeError(`Invalid Type: expecting instance of "Element", got "null"`);
      }

      el.classList.add("ws-found");

      if (typeof word !== "undefined") {
        el.classList.add(this.wordSelectorPrefix + word.toLowerCase());
      }
    }
    this.displayScore();
    this.onFindWord();
  }

  public validateWord(word: string, index: number): boolean {
    if (this.timeToFind[index] !== -1) {
      return false;
    }

    this.timeToFind[index] = this.timer.getElapsed();
    const ele = this.parent.querySelector("#" + this.wordSelectorPrefix + word.toLowerCase());

    if (!ele) {
      throw new TypeError(`Invalid Type: expecting instance of "HTMLElement", got "null"`);
    }

    ele.setAttribute("class", "ws-word-found");

    return true;
  }

  public validateSelection(selected: Array<MatrixItem>): void {
    let wordSelected = "";
    for (let i = 0; i < selected.length; i++) {
      wordSelected += selected[i].letter;
    }
    const wordSelectedR = wordSelected.split("").reverse().join("");
    const indexOfWord = this.words.indexOf(wordSelected);
    const indexOfWordR = this.words.indexOf(wordSelectedR);

    if (indexOfWord > -1) {
      if (this.validateWord(wordSelected, indexOfWord)) {
        this.markAsFound(selected, wordSelected);
      }
    }

    if (indexOfWordR > -1) {
      if (this.validateWord(wordSelectedR, indexOfWordR)) {
        this.markAsFound(selected, wordSelectedR);
      }
    }
  }

  public static returnNull(): null {
    return null;
  }
}

export default WordSearch;
