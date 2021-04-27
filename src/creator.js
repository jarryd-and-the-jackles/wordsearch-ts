import { __read, __spreadArray } from "tslib";
import WordSearch from "./wordsearch";
import Coordinate from "./utils/coordinate";
import Directions from "./utils/directions";
import Alphabet from "./utils/alphabet";
import Grid from "./utils/grid";
var Creator = (function () {
    function Creator(_a) {
        var _b = _a.words, words = _b === void 0 ? [] : _b, directions = _a.directions, letters = _a.letters, _c = _a.width, width = _c === void 0 ? 8 : _c, _d = _a.height, height = _d === void 0 ? 8 : _d, _e = _a.onFindWord, onFindWord = _e === void 0 ? Creator.returnNull : _e, _f = _a.parentId, parentId = _f === void 0 ? "ws-parent" : _f, _g = _a.lettersGrid, lettersGrid = _g === void 0 ? [] : _g, _h = _a.fixedSize, fixedSize = _h === void 0 ? true : _h, _j = _a.cellOptions, cellOptions = _j === void 0 ? {
            width: 25,
            height: 25,
            font: "400 18px Calibri",
            style: "#333",
        } : _j;
        Object.defineProperty(this, "alphabet", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Alphabet({})
        });
        Object.defineProperty(this, "directions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Directions()
        });
        Object.defineProperty(this, "words", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "onFindWord", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Creator.returnNull
        });
        Object.defineProperty(this, "parentId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "ws-parent"
        });
        Object.defineProperty(this, "cellOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fixedSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "width", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 8
        });
        Object.defineProperty(this, "height", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 8
        });
        Object.defineProperty(this, "grid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Grid({ width: this.width, height: this.height, alphabet: this.alphabet })
        });
        Object.defineProperty(this, "lettersGrid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "wordsAdded", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
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
            this.alphabet = new Alphabet({ letters: letters });
        }
        if (lettersGrid.length === 0) {
            this.ensureCorrectGridSize();
            this.generateGrid();
            var attempts = 0;
            while (!this.areWordsAdded() && attempts < Creator.maxAttempts) {
                this.addWordsToGrid();
                attempts++;
            }
            if (!this.areWordsAdded()) {
                throw new Error("Unable to add Words: attempted " + attempts + " times.");
            }
            else {
                if (Creator.debugging) {
                    console.log("Words added after \"" + attempts + "\" attempts");
                }
            }
        }
        else {
            this.lettersGrid = lettersGrid;
        }
    }
    Object.defineProperty(Creator, "returnNull", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return null;
        }
    });
    Object.defineProperty(Creator.prototype, "create", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return new WordSearch(this.createOptions());
        }
    });
    Object.defineProperty(Creator.prototype, "createOptions", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return {
                grid: this.getLettersGrid(),
                onFindWord: this.onFindWord,
                parentId: this.parentId,
                words: this.words,
                cellOptions: this.cellOptions,
            };
        }
    });
    Object.defineProperty(Creator.prototype, "ensureCorrectGridSize", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            if (this.fixedSize) {
                return;
            }
            var words = this.getWords();
            var wordCountAdjustment = 1;
            var wordLengthAdjustment = 1;
            var lettersCountAdjustment = 1;
            var minGridSize = 0;
            var min = Math.ceil(words.length * wordCountAdjustment);
            if (minGridSize < min) {
                minGridSize = min;
            }
            var letters = [];
            for (var i = 0; i < words.length; i++) {
                var word = this.getWord(i);
                var min_1 = Math.ceil(word.length * wordLengthAdjustment);
                if (minGridSize < min_1) {
                    minGridSize = min_1;
                }
                for (var j = 0; j < word.length; j++) {
                    if (letters.indexOf(word[i]) === -1) {
                        letters.push(word[i]);
                    }
                }
            }
            var lettersMin = Math.ceil(letters.length * lettersCountAdjustment);
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
    });
    Object.defineProperty(Creator.prototype, "getDirections", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.directions;
        }
    });
    Object.defineProperty(Creator.prototype, "getRandomDirection", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.getDirections().getRandom();
        }
    });
    Object.defineProperty(Creator.prototype, "getRandomStartCoordinate", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (wordLength, direction) {
            return Coordinate.getRandom({
                grid: this.grid,
                direction: direction,
                wordLength: wordLength,
            });
        }
    });
    Object.defineProperty(Creator.prototype, "generateGrid", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            this.grid = new Grid({
                width: this.width,
                height: this.height,
                alphabet: this.alphabet,
            });
            this.lettersGrid = [];
        }
    });
    Object.defineProperty(Creator.prototype, "getGrid", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.grid;
        }
    });
    Object.defineProperty(Creator.prototype, "generateLettersSheet", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            this.lettersGrid = [];
            var grid = this.getGrid();
            for (var i = 0; i < grid.getHeight(); i++) {
                var row = grid.getRow(i);
                if (!row) {
                    throw new Error("There was an error creating the letter grid.");
                }
                this.addLettersGridRow(row, i);
            }
        }
    });
    Object.defineProperty(Creator.prototype, "addLettersGridRow", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (row, rowIndex) {
            this.lettersGrid[rowIndex] = [];
            for (var column_index = 0; column_index < row.getWidth(); column_index++) {
                var cell = row.getCell(column_index);
                if (!cell) {
                    throw new Error("There was an error creating the letter grid.");
                }
                if (!cell.hasLetter()) {
                    cell.randomFill();
                }
                this.lettersGrid[rowIndex][column_index] = cell.getLetter();
            }
        }
    });
    Object.defineProperty(Creator.prototype, "getLettersGrid", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            if (this.lettersGrid.length === 0) {
                this.generateLettersSheet();
            }
            return this.lettersGrid;
        }
    });
    Object.defineProperty(Creator.prototype, "setWords", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (words) {
            this.words = words.filter(function (word) { return word.trim().length !== 0; }).map(function (word) { return word.trim().toUpperCase(); });
        }
    });
    Object.defineProperty(Creator.prototype, "getWords", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.words;
        }
    });
    Object.defineProperty(Creator.prototype, "getWordCount", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.getWords().length;
        }
    });
    Object.defineProperty(Creator.prototype, "getWord", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (index) {
            return this.words[index];
        }
    });
    Object.defineProperty(Creator.prototype, "areWordsAdded", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.wordsAdded;
        }
    });
    Object.defineProperty(Creator.prototype, "addWordsToGrid", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var error = false;
            var i;
            for (i = 0; i < this.getWordCount(); i++) {
                var added = false;
                var attempts = 0;
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
                var cells = this.getGrid()
                    .getRows()
                    .getValues()
                    .map(function (row) {
                    return row.getCells().getValues();
                })
                    .reduce(function (accumulator, currentValue) {
                    return accumulator.concat.apply(accumulator, __spreadArray([], __read(currentValue)));
                });
                for (i = 0; i < cells.length; i++) {
                    var cell = cells[i];
                    cell.unsetLetter();
                }
                return false;
            }
            this.wordsAdded = true;
            return true;
        }
    });
    Object.defineProperty(Creator.prototype, "addWordToGrid", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (word) {
            var direction = this.getRandomDirection();
            var attempts = 0;
            var added = false;
            while (!added && attempts < Creator.maxAttempts) {
                var start = this.getRandomStartCoordinate(word.length, direction);
                added = this.getGrid().addWord(word, start, direction);
                attempts++;
            }
            return added;
        }
    });
    Object.defineProperty(Creator, "maxAttempts", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 30
    });
    Object.defineProperty(Creator, "debugging", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: false
    });
    Object.defineProperty(Creator, "wordMap", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {}
    });
    return Creator;
}());
export { Creator };
export default Creator;
//# sourceMappingURL=creator.js.map