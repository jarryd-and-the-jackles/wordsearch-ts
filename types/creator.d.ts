import WordSearch, { WordSearchOptions } from "./wordsearch";
import Coordinate from "./utils/coordinate";
import Direction from "./utils/direction";
import Directions, { DirectionsOptions } from "./utils/directions";
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
export declare class Creator {
    readonly alphabet: Alphabet;
    readonly directions: Directions;
    words: string[];
    onFindWord: Function;
    parentId: string;
    cellOptions: {
        width?: number;
        height?: number;
        style?: string;
        font?: string;
    };
    fixedSize: boolean;
    width: number;
    height: number;
    grid: Grid;
    lettersGrid: string[][];
    wordsAdded: boolean;
    static maxAttempts: number;
    static debugging: boolean;
    static wordMap: {
        [p: string]: any;
    };
    static returnNull(): null;
    constructor({ words, directions, letters, width, height, onFindWord, parentId, lettersGrid, fixedSize, cellOptions, }: CreatorOptionsInterface);
    create(): WordSearch;
    createOptions(): WordSearchOptions;
    ensureCorrectGridSize(): void;
    getDirections(): Directions;
    getDirectionKeys(): string[];
    getActiveDirections(): object | Direction[];
    getActiveDirectionKeys(): string[];
    getRandomDirection(): Direction;
    getRandomStartCoordinate(wordLength: number, direction: Direction): Coordinate;
    generateGrid(): void;
    getGrid(): Grid;
    generateLettersSheet(): void;
    addLettersGridRow(row: Row, rowIndex: number): void;
    getLettersGrid(): string[][];
    setWords(words: string[]): void;
    getWords(): string[];
    getWordCount(): number;
    getWord(index: number): string;
    areWordsAdded(): boolean;
    addWordsToGrid(): boolean;
    addWordToGrid(word: string): boolean;
}
export default Creator;
//# sourceMappingURL=creator.d.ts.map