export interface AlphabetOptions {
    letters?: string;
    weightMap?: LetterWeightMap;
}
export interface LetterWeightMap {
    [p: string]: number;
}
export declare class Alphabet {
    letters: string[];
    static weightMap: LetterWeightMap;
    constructor({ letters, weightMap }: AlphabetOptions);
    setLetters(letters: string): void;
    getLetters(): string[];
    getWeightedLetters(): string[];
    getRandomLetter(): string;
}
export default Alphabet;
//# sourceMappingURL=alphabet.d.ts.map