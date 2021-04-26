export interface AlphabetOptions {
  letters?: string;
  weightMap?: LetterWeightMap;
}

export interface LetterWeightMap {
  [p: string]: number;
}

export class Alphabet {
  letters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  static weightMap: LetterWeightMap = {
    "A": 2,
    "B": 2,
    "C": 2,
    "D": 2,
    "E": 2,
    "F": 2,
    "G": 2,
    "H": 2,
    "I": 2,
    "J": 1,
    "K": 1,
    "L": 2,
    "M": 2,
    "N": 2,
    "O": 2,
    "P": 2,
    "Q": 1,
    "R": 1,
    "S": 2,
    "T": 2,
    "U": 2,
    "V": 1,
    "W": 1,
    "X": 1,
    "Y": 1,
    "Z": 1,
  };

  constructor({letters, weightMap = Alphabet.weightMap}: AlphabetOptions) {
    if (typeof letters !== "undefined") {
      this.setLetters(letters);
    }

    Alphabet.weightMap = weightMap;
  }

  setLetters(letters: string): void {
    this.letters = [];

    for (let i = 0; i < letters.length; i++) {
      if (typeof letters[i] !== "string") {
        throw new Error(`Unsupported datatype: expected type "string", got type ${(typeof letters[i])}`);
      }

      this.getLetters().push(letters[i].toUpperCase());
    }

    if (this.getLetters().length === 0) {
      throw new Error(`Unsupported letters: expected a "string", got ${(letters)}`);
    }
  }

  getLetters(): string[] {
    return this.letters;
  }

  getWeightedLetters(): string[] {
    const weighted = [];
    const letters = this.getLetters();

    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];
      const weight = Alphabet.weightMap[letter] || 1;

      for (let j = 0; j < weight; j++) {
        weighted.push(letter);
      }
    }

    return weighted;
  }

  getRandomLetter(): string {
    const letters = this.getWeightedLetters();
    const index = Math.floor(Math.random() * letters.length);

    return letters[index];
  }
}

export default Alphabet;
