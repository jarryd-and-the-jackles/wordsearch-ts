import { __assign } from "tslib";
import RowCollection from "./row-collection";
import Row from "./row";
import Creator from "../creator";
var Grid = (function () {
    function Grid(_a) {
        var width = _a.width, height = _a.height, rows = _a.rows, alphabet = _a.alphabet;
        Object.defineProperty(this, "width", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "height", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "alphabet", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rows", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new RowCollection()
        });
        this.setWidth(width);
        this.setHeight(height);
        this.alphabet = alphabet;
        this.makeGrid(rows);
    }
    Object.defineProperty(Grid.prototype, "getAlphabet", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.alphabet;
        }
    });
    Object.defineProperty(Grid.prototype, "getWidth", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.width;
        }
    });
    Object.defineProperty(Grid.prototype, "setWidth", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (width) {
            if (width < 0) {
                this.width = (width * -1);
            }
            else {
                this.width = width;
            }
            this.makeGrid(this.getRows());
        }
    });
    Object.defineProperty(Grid.prototype, "getHeight", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.height;
        }
    });
    Object.defineProperty(Grid.prototype, "setHeight", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (height) {
            if (height < 0) {
                this.height = (height * -1);
            }
            else {
                this.height = height;
            }
            this.makeGrid(this.getRows());
        }
    });
    Object.defineProperty(Grid.prototype, "resetRows", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            this.rows = new RowCollection();
        }
    });
    Object.defineProperty(Grid.prototype, "getRows", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.rows;
        }
    });
    Object.defineProperty(Grid.prototype, "getRow", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            return this.getRows().get(String(key));
        }
    });
    Object.defineProperty(Grid.prototype, "putRow", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key, value) {
            this.getRows().put(String(key), value);
        }
    });
    Object.defineProperty(Grid.prototype, "makeGrid", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (rows) {
            if (typeof rows !== "undefined") {
                this.rows = rows;
            }
            else {
                this.resetRows();
            }
            for (var i = 0; i < this.getHeight(); i++) {
                var row = this.getRow(i);
                if (!row) {
                    this.putRow(i, new Row({
                        y: i,
                        width: this.getWidth(),
                        alphabet: this.getAlphabet(),
                    }));
                }
            }
        }
    });
    Object.defineProperty(Grid.prototype, "addWord", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (word, start, direction) {
            var coordinate = start.clone();
            var keepIndexes = [];
            var letterMap = {};
            var i = 0;
            var error = false;
            while (i < word.length) {
                var row = this.getRow(coordinate.getY());
                if (!row) {
                    throw new Error("Coordinate spans outside of the grid at y: " + coordinate.getY());
                }
                var cell = row.getCell(coordinate.getX());
                if (!cell) {
                    throw new Error("Coordinate spans outside of the grid at x: " + coordinate.getX());
                }
                if (cell.hasLetter()) {
                    keepIndexes.push(i);
                    if (!cell.hasLetter(word[i])) {
                        error = true;
                        break;
                    }
                }
                if (Creator.debugging) {
                    letterMap[i] = __assign(__assign({}, coordinate.clone()), { letter: word[i] });
                }
                cell.setLetter(word[i]);
                coordinate.move(direction);
                i++;
            }
            if (error) {
                var toClean = word.substr(0, (i + 1));
                this.cleanWord(toClean, start, direction, keepIndexes);
                return false;
            }
            if (Creator.debugging) {
                Creator.wordMap[word] = letterMap;
            }
            return true;
        }
    });
    Object.defineProperty(Grid.prototype, "cleanWord", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (word, start, direction, keepIndexes) {
            var coordinate = start.clone();
            for (var i = 0; i < word.length; i++) {
                var row = this.getRow(coordinate.getY());
                if (!row) {
                    continue;
                }
                var cell = row.getCell(coordinate.getX());
                if (!cell || !cell.hasLetter(word[i])) {
                    continue;
                }
                if (keepIndexes.indexOf(i) === -1) {
                    cell.unsetLetter();
                }
                coordinate.move(direction);
            }
        }
    });
    return Grid;
}());
export { Grid };
export default Grid;
//# sourceMappingURL=grid.js.map