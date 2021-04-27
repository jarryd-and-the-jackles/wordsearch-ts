var Coordinate = (function () {
    function Coordinate(coordinate) {
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.x = coordinate.x;
        this.y = coordinate.y;
    }
    Object.defineProperty(Coordinate, "getRandom", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (_a) {
            var grid = _a.grid, direction = _a.direction, wordLength = _a.wordLength;
            var maxX = grid.getWidth();
            var maxY = grid.getHeight();
            var minX = 0;
            var minY = 0;
            if (typeof direction !== "undefined" && typeof wordLength !== "undefined") {
                if (direction.isUp()) {
                    maxY -= (wordLength - 1);
                }
                else if (direction.isDown()) {
                    minY += (wordLength - 1);
                }
                if (direction.isRight()) {
                    maxX -= (wordLength - 1);
                }
                else if (direction.isLeft()) {
                    minX += (wordLength - 1);
                }
            }
            var newX = Math.floor((Math.random() * (maxX - minX)) + minX);
            var newY = Math.floor((Math.random() * (maxY - minY)) + minY);
            return new Coordinate({
                x: newX,
                y: newY,
            });
        }
    });
    Object.defineProperty(Coordinate.prototype, "getX", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.x;
        }
    });
    Object.defineProperty(Coordinate.prototype, "getY", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.y;
        }
    });
    Object.defineProperty(Coordinate.prototype, "move", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (direction) {
            this.x += direction.x;
            this.y += direction.y;
        }
    });
    Object.defineProperty(Coordinate.prototype, "clone", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return new Coordinate(this);
        }
    });
    return Coordinate;
}());
export { Coordinate };
export default Coordinate;
//# sourceMappingURL=coordinate.js.map