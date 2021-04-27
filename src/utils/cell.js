import Coordinate from "./coordinate";
import Alphabet from "./alphabet";
var Cell = (function () {
    function Cell(_a) {
        var x = _a.x, y = _a.y, alphabet = _a.alphabet;
        Object.defineProperty(this, "alphabet", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "letter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "coordinate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.alphabet = typeof alphabet !== "undefined" ? alphabet : new Alphabet({});
        this.coordinate = new Coordinate({
            x: x,
            y: y,
        });
    }
    Object.defineProperty(Cell.prototype, "setLetter", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (letter) {
            this.letter = letter.toUpperCase();
        }
    });
    Object.defineProperty(Cell.prototype, "unsetLetter", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            this.letter = null;
        }
    });
    Object.defineProperty(Cell.prototype, "getLetter", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.letter;
        }
    });
    Object.defineProperty(Cell.prototype, "hasLetter", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (letter) {
            if (!letter) {
                return this.getLetter() !== null;
            }
            return this.getLetter() === letter;
        }
    });
    Object.defineProperty(Cell.prototype, "randomFill", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            if (!this.hasLetter()) {
                this.letter = this.alphabet.getRandomLetter();
            }
        }
    });
    Object.defineProperty(Cell.prototype, "getCoordinate", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.coordinate;
        }
    });
    return Cell;
}());
export { Cell };
export default Cell;
//# sourceMappingURL=cell.js.map