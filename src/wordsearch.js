import "../sass/wordsearch.scss";
import Chronometer from "./utils/chronometer";
export function wordsToUpperCase(words) {
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].toUpperCase();
    }
    return words;
}
var WordSearch = (function () {
    function WordSearch(_a) {
        var _b = _a.grid, grid = _b === void 0 ? [
            [".", ".", ".", ".", ".", "."],
            [".", "T", "E", "S", "T", "."],
            [".", ".", ".", ".", ".", "."],
        ] : _b, _c = _a.words, words = _c === void 0 ? ["TEST"] : _c, _d = _a.onFindWord, onFindWord = _d === void 0 ? WordSearch.returnNull : _d, _e = _a.cellOptions, cellOptions = _e === void 0 ? {} : _e, _f = _a.parentId, parentId = _f === void 0 ? "ws-parent" : _f, _g = _a.wordSelectorPrefix, wordSelectorPrefix = _g === void 0 ? "ws-chosen-" : _g;
        Object.defineProperty(this, "grid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "words", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onFindWord", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "parent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rowSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "colSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeToFind", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "matrix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "selectFrom", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "selected", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "wordSelectorPrefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cellOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                width: 25,
                height: 25,
                font: "400 18px Calibri",
                style: "#333",
            }
        });
        this.grid = grid;
        this.rowSize = this.grid.length;
        this.colSize = this.grid[0].length;
        this.words = wordsToUpperCase(words);
        this.onFindWord = onFindWord.bind(this);
        this.wordSelectorPrefix = wordSelectorPrefix;
        this.setCellOptions(cellOptions);
        var parent = document.getElementById(parentId);
        if (!parent) {
            throw new TypeError("Invalid Type passed: expecting instance of \"HTMLElement\", got \"null\"");
        }
        this.parent = parent;
        this.parent.setAttribute("class", "ws-wrapper");
        this.timeToFind = new Array(this.words.length).fill(-1);
        this.matrix = this.initMatrix();
        this.timer = new Chronometer();
        this.drawGameArea();
        this.displayScore();
    }
    Object.defineProperty(WordSearch.prototype, "setCellOptions", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (_a) {
            var _b = _a.width, width = _b === void 0 ? this.cellOptions.width : _b, _c = _a.height, height = _c === void 0 ? this.cellOptions.height : _c, _d = _a.font, font = _d === void 0 ? this.cellOptions.font : _d, _e = _a.style, style = _e === void 0 ? this.cellOptions.style : _e;
            this.cellOptions = {
                width: width,
                height: height,
                style: style,
                font: font,
            };
        }
    });
    Object.defineProperty(WordSearch.prototype, "drawGameArea", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var scoreArea = document.createElement("h2");
            var scoreLabel = document.createElement("div");
            scoreLabel.id = "ws-score";
            scoreArea.appendChild(scoreLabel);
            this.parent.appendChild(scoreArea);
            var gridArea = document.createElement("section");
            gridArea.setAttribute("class", "ws-area");
            this.drawMatrix(gridArea);
            this.parent.appendChild(gridArea);
            var wordsArea = document.createElement("ul");
            wordsArea.setAttribute("class", "ws-words");
            this.drawWordList(wordsArea);
            this.parent.appendChild(wordsArea);
        }
    });
    Object.defineProperty(WordSearch.prototype, "getScore", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            if (this.timeToFind.length === 0) {
                return 0;
            }
            return this.timeToFind.map(function (i) {
                return (i > 0 ? 1 : 0);
            }).reduce(function (a, b) {
                return a + b;
            });
        }
    });
    Object.defineProperty(WordSearch.prototype, "getRemaining", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.timeToFind.map(function (i) {
                return (i > 0 ? 0 : 1);
            }).reduce(function (a, b) {
                return a + b;
            });
        }
    });
    Object.defineProperty(WordSearch.prototype, "getTiming", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.timeToFind.slice();
        }
    });
    Object.defineProperty(WordSearch.prototype, "displayScore", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var elem = this.parent.querySelector("#ws-score");
            if (!elem) {
                throw new TypeError("Invalid Type: expecting instance of \"Element\", got \"null\"");
            }
            elem.innerHTML = "Found " + this.getScore() + " out of " + this.words.length + " words so far.";
        }
    });
    Object.defineProperty(WordSearch.prototype, "initMatrix", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var matrix = [];
            for (var row = 0; row < this.rowSize; row++) {
                for (var col = 0; col < this.colSize; col++) {
                    var item = {
                        letter: this.grid[row][col],
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
    });
    Object.defineProperty(WordSearch.prototype, "drawWordList", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (target) {
            var words = this.words;
            for (var i = 0; i < words.length; i++) {
                var liEl = document.createElement("li");
                liEl.id = this.wordSelectorPrefix + words[i].toLowerCase();
                liEl.setAttribute("class", "ws-word");
                liEl.setAttribute("text-decoration", "none");
                liEl.innerHTML = words[i];
                target.appendChild(liEl);
            }
        }
    });
    Object.defineProperty(WordSearch.prototype, "getItem", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (row, col) {
            if (typeof this.matrix[row] === "undefined") {
                throw new Error("Invalid type: expected \"MatrixItem\", got \"" + (typeof this.matrix[row]) + "\"");
            }
            return this.matrix[row][col];
        }
    });
    Object.defineProperty(WordSearch.prototype, "getItems", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (rowFrom, colFrom, rowTo, colTo) {
            var items = [];
            if (rowFrom === rowTo || colFrom === colTo || Math.abs(rowTo - rowFrom) === Math.abs(colTo - colFrom)) {
                var shiftY = (rowFrom === rowTo) ? 0 : (rowTo > rowFrom) ? 1 : -1, shiftX = (colFrom === colTo) ? 0 : (colTo > colFrom) ? 1 : -1, row = rowFrom, col = colFrom;
                items.push(this.getItem(row, col));
                do {
                    row += shiftY;
                    col += shiftX;
                    items.push(this.getItem(row, col));
                } while (row !== rowTo || col !== colTo);
            }
            return items;
        }
    });
    Object.defineProperty(WordSearch.prototype, "drawMatrix", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (target) {
            var rowcount = this.rowSize;
            var columnCount = this.colSize;
            for (var row = 0; row < rowcount; row++) {
                var divEl = document.createElement("div");
                divEl.setAttribute("class", "ws-row");
                target.appendChild(divEl);
                for (var col = 0; col < columnCount; col++) {
                    var item = this.matrix[row][col];
                    var cvEl = document.createElement("canvas");
                    cvEl.setAttribute("class", "ws-col");
                    cvEl.setAttribute("width", String(this.cellOptions.width));
                    cvEl.setAttribute("height", String(this.cellOptions.height));
                    var x = cvEl.width / 2;
                    var y = cvEl.height / 2;
                    var ctx = cvEl.getContext("2d");
                    if (!ctx) {
                        throw new TypeError("Invalid Type: expecting instance of \"CanvasRenderingContext2D\", got \"null\"");
                    }
                    ctx.font = String(this.cellOptions.font);
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = String(this.cellOptions.style);
                    ctx.fillText(item.letter, x, y);
                    cvEl.addEventListener("mousedown", this.handleMousedown(item));
                    cvEl.addEventListener("mouseover", this.handleMouseover(item));
                    cvEl.addEventListener("mouseup", this.handleMouseup());
                    divEl.appendChild(cvEl);
                }
            }
        }
    });
    Object.defineProperty(WordSearch.prototype, "handleMouseover", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (item) {
            var that = this;
            return function () {
                if (that.selectFrom) {
                    that.selected = that.getItems(that.selectFrom.row, that.selectFrom.col, item.row, item.col);
                    that.clearHighlight();
                    for (var i = 0; i < that.selected.length; i++) {
                        var current = that.selected[i], row = current.row + 1, col = current.col + 1, el = that.parent.querySelector(".ws-row:nth-child(" + row + ") .ws-col:nth-child(" + col + ")");
                        if (!el) {
                            throw new Error("Invalid type: expected \"MatrixItem\", got \"" + (typeof el) + "\"");
                        }
                        el.classList.add("ws-selected");
                    }
                }
            };
        }
    });
    Object.defineProperty(WordSearch.prototype, "handleMouseup", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var that = this;
            return function () {
                that.selectFrom = null;
                that.clearHighlight();
                that.validateSelection(that.selected);
                that.selected = [];
            };
        }
    });
    Object.defineProperty(WordSearch.prototype, "handleMousedown", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (item) {
            var that = this;
            return function () {
                that.selectFrom = item;
            };
        }
    });
    Object.defineProperty(WordSearch.prototype, "clearHighlight", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var selectedEls = this.parent.querySelectorAll(".ws-selected");
            for (var i = 0; i < selectedEls.length; i++) {
                selectedEls[i].classList.remove("ws-selected");
            }
        }
    });
    Object.defineProperty(WordSearch.prototype, "markAsFound", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (selected, word) {
            for (var i = 0; i < selected.length; i++) {
                var row = selected[i].row + 1, col = selected[i].col + 1, el = this.parent.querySelector(".ws-row:nth-child(" + row + ") .ws-col:nth-child(" + col + ")");
                if (!el) {
                    throw new TypeError("Invalid Type: expecting instance of \"Element\", got \"null\"");
                }
                el.classList.add("ws-found");
                if (typeof word !== "undefined") {
                    el.classList.add(this.wordSelectorPrefix + word.toLowerCase());
                }
            }
            this.displayScore();
            this.onFindWord();
        }
    });
    Object.defineProperty(WordSearch.prototype, "validateWord", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (word, index) {
            if (this.timeToFind[index] !== -1) {
                return false;
            }
            this.timeToFind[index] = this.timer.getElapsed();
            var ele = this.parent.querySelector("#" + this.wordSelectorPrefix + word.toLowerCase());
            if (!ele) {
                throw new TypeError("Invalid Type: expecting instance of \"HTMLElement\", got \"null\"");
            }
            ele.setAttribute("class", "ws-word-found");
            return true;
        }
    });
    Object.defineProperty(WordSearch.prototype, "validateSelection", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (selected) {
            var wordSelected = "";
            for (var i = 0; i < selected.length; i++) {
                wordSelected += selected[i].letter;
            }
            var wordSelectedR = wordSelected.split("").reverse().join("");
            var indexOfWord = this.words.indexOf(wordSelected);
            var indexOfWordR = this.words.indexOf(wordSelectedR);
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
    });
    Object.defineProperty(WordSearch, "returnNull", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return null;
        }
    });
    return WordSearch;
}());
export { WordSearch };
export default WordSearch;
//# sourceMappingURL=wordsearch.js.map