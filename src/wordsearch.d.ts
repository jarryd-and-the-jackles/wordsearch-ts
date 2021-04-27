import "../sass/wordsearch.scss";
import Chronometer from "./utils/chronometer";
export declare function wordsToUpperCase(words: string[]): string[];
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
    expOptions?: {
        [p: string]: any;
    };
}
export interface MatrixItem {
    letter: string;
    row: number;
    col: number;
}
export declare class WordSearch {
    grid: string[][];
    words: string[];
    onFindWord: Function;
    parent: HTMLElement;
    rowSize: number;
    colSize: number;
    timeToFind: number[];
    timer: Chronometer;
    matrix: MatrixItem[][];
    selectFrom: MatrixItem | null;
    selected: MatrixItem[];
    wordSelectorPrefix: string;
    cellOptions: {
        width?: number;
        height?: number;
        style?: string;
        font?: string;
    };
    constructor({ grid, words, onFindWord, cellOptions, parentId, wordSelectorPrefix, }: WordSearchOptions);
    setCellOptions({ width, height, font, style, }: {
        width?: number;
        height?: number;
        style?: string;
        font?: string;
    }): void;
    drawGameArea(): void;
    getScore(): number;
    getRemaining(): number;
    getTiming(): number[];
    displayScore(): void;
    initMatrix(): MatrixItem[][];
    drawWordList(target: HTMLElement): void;
    getItem(row: number, col: number): MatrixItem;
    getItems(rowFrom: number, colFrom: number, rowTo: number, colTo: number): MatrixItem[];
    drawMatrix(target: HTMLElement): void;
    handleMouseover(item: MatrixItem): EventListener;
    handleMouseup(): EventListener;
    handleMousedown(item: MatrixItem): EventListener;
    clearHighlight(): void;
    markAsFound(selected: Array<MatrixItem>, word?: string): void;
    validateWord(word: string, index: number): boolean;
    validateSelection(selected: Array<MatrixItem>): void;
    static returnNull(): null;
}
export default WordSearch;
//# sourceMappingURL=wordsearch.d.ts.map