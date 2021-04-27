import CellCollection from "./cell-collection";
import Cell from "./cell";
var Row = (function () {
    function Row(_a) {
        var y = _a.y, width = _a.width, alphabet = _a.alphabet, cells = _a.cells;
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "width", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cells", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new CellCollection()
        });
        Object.defineProperty(this, "alphabet", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.y = y;
        this.width = width;
        this.alphabet = alphabet;
        if (typeof cells !== "undefined") {
            this.cells = cells;
        }
        this.makeCells();
    }
    Object.defineProperty(Row.prototype, "getWidth", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.width;
        }
    });
    Object.defineProperty(Row.prototype, "getCells", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.cells;
        }
    });
    Object.defineProperty(Row.prototype, "getCell", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            return this.getCells().get(String(key));
        }
    });
    Object.defineProperty(Row.prototype, "putCell", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key, value) {
            this.getCells().put(String(key), value);
        }
    });
    Object.defineProperty(Row.prototype, "getAlphabet", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.alphabet;
        }
    });
    Object.defineProperty(Row.prototype, "makeCells", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            for (var i = 0; i < this.width; i++) {
                var cell = this.getCell(i);
                if (!cell) {
                    this.putCell(i, new Cell({
                        x: i,
                        y: this.y,
                        alphabet: this.getAlphabet(),
                    }));
                }
            }
        }
    });
    return Row;
}());
export { Row };
export default Row;
//# sourceMappingURL=row.js.map