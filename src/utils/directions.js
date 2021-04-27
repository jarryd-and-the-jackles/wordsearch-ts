import { __read, __spreadArray } from "tslib";
import Direction from "./direction";
import DirectionCollection from "./direction-collection";
var Directions = (function () {
    function Directions(options) {
        Object.defineProperty(this, "down", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Direction({ x: 0, y: -1 })
        });
        Object.defineProperty(this, "left", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Direction({ x: -1, y: 0 })
        });
        Object.defineProperty(this, "left_down", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Direction({ x: -1, y: -1 })
        });
        Object.defineProperty(this, "left_up", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Direction({ x: -1, y: 1 })
        });
        Object.defineProperty(this, "right", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Direction({ x: 1, y: 0 })
        });
        Object.defineProperty(this, "right_down", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Direction({ x: 1, y: -1 })
        });
        Object.defineProperty(this, "right_up", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Direction({ x: 1, y: 1 })
        });
        Object.defineProperty(this, "up", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Direction({ x: 0, y: 1 })
        });
        Object.defineProperty(this, "customCollection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new DirectionCollection()
        });
        if (typeof options === "undefined") {
            return;
        }
        if (typeof options.custom !== "undefined") {
            this.setCustom(options.custom);
        }
        if (typeof options.inactive !== "undefined") {
            this.setInactive(options.inactive);
        }
        if (typeof options.active !== "undefined") {
            this.setActive(options.active);
        }
    }
    Object.defineProperty(Directions, "getDefaultKeys", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return [
                "down",
                "left",
                "left_down",
                "left_up",
                "right",
                "right_down",
                "right_up",
                "up",
            ];
        }
    });
    Object.defineProperty(Directions.prototype, "throwInvalidKeyError", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            throw new Error("Invalid direction key passed: expected on of: \"" + (this.getAllKeys()) + "\" got \"" + key + "\"");
        }
    });
    Object.defineProperty(Directions.prototype, "throwInactiveKeyError", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            throw new Error("Invalid direction key passed: expected on of: \"" + (this.getActiveKeys()) + "\" got \"" + key + "\"");
        }
    });
    Object.defineProperty(Directions.prototype, "getCustomKeys", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.getCustomCollection().getKeys();
        }
    });
    Object.defineProperty(Directions.prototype, "getAllKeys", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var keys = Directions.getDefaultKeys();
            keys.push.apply(keys, __spreadArray([], __read(this.getCustomKeys())));
            return keys;
        }
    });
    Object.defineProperty(Directions.prototype, "isValidKey", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            return this.getAllKeys().indexOf(key) !== -1;
        }
    });
    Object.defineProperty(Directions.prototype, "isInvalidKey", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            return !this.isValidKey(key);
        }
    });
    Object.defineProperty(Directions.prototype, "setCustomCollection", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (collection) {
            this.customCollection = collection;
        }
    });
    Object.defineProperty(Directions.prototype, "resetCustomCollection", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            this.customCollection = new DirectionCollection();
        }
    });
    Object.defineProperty(Directions.prototype, "getCustomCollection", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.customCollection;
        }
    });
    Object.defineProperty(Directions.prototype, "setCustom", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (custom) {
            this.resetCustomCollection();
            for (var key in custom) {
                if (!custom.hasOwnProperty(key)) {
                    continue;
                }
                var value = new Direction(custom[key]);
                this.getCustomCollection().put(key, value);
            }
        }
    });
    Object.defineProperty(Directions.prototype, "hasCustom", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.getCustomKeys().length > 0;
        }
    });
    Object.defineProperty(Directions.prototype, "isCustom", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            return this.getCustomCollection().isValidKey(key);
        }
    });
    Object.defineProperty(Directions.prototype, "getCustom", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            if (!this.isCustom(key)) {
                return this.getCustomCollection().get(key);
            }
            this.throwInvalidKeyError(key);
            return null;
        }
    });
    Object.defineProperty(Directions.prototype, "get", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            if (this.isInvalidKey(key)) {
                this.throwInvalidKeyError(key);
            }
            if (this.hasCustom()) {
                var direction = this.getCustom(key);
                if (direction) {
                    return direction;
                }
            }
            return this[key];
        }
    });
    Object.defineProperty(Directions.prototype, "isActive", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            return this.get(key).isActive();
        }
    });
    Object.defineProperty(Directions.prototype, "setActive", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (active) {
            for (var i = 0; i < active.length; i++) {
                if (this.isActive(active[i])) {
                    continue;
                }
                this.get(active[i]).setActive();
            }
        }
    });
    Object.defineProperty(Directions.prototype, "getActive", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            if (this.isInactive(key)) {
                this.throwInactiveKeyError(key);
            }
            return this.get(key);
        }
    });
    Object.defineProperty(Directions.prototype, "isInactive", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            return this.get(key).isInactive();
        }
    });
    Object.defineProperty(Directions.prototype, "setInactive", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (inactive) {
            for (var i = 0; i < inactive.length; i++) {
                if (this.isInactive(inactive[i])) {
                    continue;
                }
                this.get(inactive[i]).setInactive();
            }
        }
    });
    Object.defineProperty(Directions.prototype, "getActiveKeys", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var keys = this.getAllKeys();
            var active = [];
            for (var i = 0; i < keys.length; i++) {
                if (this.isInactive(keys[i])) {
                    continue;
                }
                active.push(keys[i]);
            }
            return active;
        }
    });
    Object.defineProperty(Directions.prototype, "getAllActive", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var keys = this.getActiveKeys();
            var active = {};
            for (var key in keys) {
                active[key] = this.getActive(key);
            }
            return active;
        }
    });
    Object.defineProperty(Directions.prototype, "getRandom", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (active_only) {
            if (active_only === void 0) { active_only = true; }
            var keys = active_only ? this.getActiveKeys() : this.getAllKeys();
            var index = this.getRandomIndex(keys.length);
            return active_only ? this.getActive(keys[index]) : this.get(keys[index]);
        }
    });
    Object.defineProperty(Directions.prototype, "getRandomIndex", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (arrayLength) {
            return Math.floor(Math.random() * arrayLength);
        }
    });
    return Directions;
}());
export { Directions };
export default Directions;
//# sourceMappingURL=directions.js.map