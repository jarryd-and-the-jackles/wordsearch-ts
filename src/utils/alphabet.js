var Alphabet = (function () {
    function Alphabet(_a) {
        var letters = _a.letters, _b = _a.weightMap, weightMap = _b === void 0 ? Alphabet.weightMap : _b;
        Object.defineProperty(this, "letters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        });
        if (typeof letters !== "undefined") {
            this.setLetters(letters);
        }
        Alphabet.weightMap = weightMap;
    }
    Object.defineProperty(Alphabet.prototype, "setLetters", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (letters) {
            this.letters = [];
            for (var i = 0; i < letters.length; i++) {
                if (typeof letters[i] !== "string") {
                    throw new Error("Unsupported datatype: expected type \"string\", got type " + (typeof letters[i]));
                }
                this.getLetters().push(letters[i].toUpperCase());
            }
            if (this.getLetters().length === 0) {
                throw new Error("Unsupported letters: expected a \"string\", got " + (letters));
            }
        }
    });
    Object.defineProperty(Alphabet.prototype, "getLetters", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.letters;
        }
    });
    Object.defineProperty(Alphabet.prototype, "getWeightedLetters", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var weighted = [];
            var letters = this.getLetters();
            for (var i = 0; i < letters.length; i++) {
                var letter = letters[i];
                var weight = Alphabet.weightMap[letter] || 1;
                for (var j = 0; j < weight; j++) {
                    weighted.push(letter);
                }
            }
            return weighted;
        }
    });
    Object.defineProperty(Alphabet.prototype, "getRandomLetter", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var letters = this.getWeightedLetters();
            var index = Math.floor(Math.random() * letters.length);
            return letters[index];
        }
    });
    Object.defineProperty(Alphabet, "weightMap", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {
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
        }
    });
    return Alphabet;
}());
export { Alphabet };
export default Alphabet;
//# sourceMappingURL=alphabet.js.map