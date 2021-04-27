import { __extends } from "tslib";
import Coordinate from "./coordinate";
var Direction = (function (_super) {
    __extends(Direction, _super);
    function Direction(direction) {
        var _this = _super.call(this, {
            x: direction.x,
            y: direction.y,
        }) || this;
        Object.defineProperty(_this, "active", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        if (typeof direction.active !== "undefined") {
            _this.active = direction.active;
        }
        return _this;
    }
    Object.defineProperty(Direction.prototype, "isActive", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.active;
        }
    });
    Object.defineProperty(Direction.prototype, "isInactive", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return !this.isActive();
        }
    });
    Object.defineProperty(Direction.prototype, "setActive", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (active) {
            if (active === void 0) { active = true; }
            this.active = active;
        }
    });
    Object.defineProperty(Direction.prototype, "setInactive", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            this.setActive(false);
        }
    });
    Object.defineProperty(Direction.prototype, "isUp", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.getY() === 1;
        }
    });
    Object.defineProperty(Direction.prototype, "isDown", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.getY() === -1;
        }
    });
    Object.defineProperty(Direction.prototype, "isLeft", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.getX() === -1;
        }
    });
    Object.defineProperty(Direction.prototype, "isRight", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.getX() === 1;
        }
    });
    return Direction;
}(Coordinate));
export { Direction };
export default Direction;
//# sourceMappingURL=direction.js.map