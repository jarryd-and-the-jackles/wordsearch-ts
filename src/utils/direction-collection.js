import { __extends } from "tslib";
import Collection from "./collection";
var DirectionCollection = (function (_super) {
    __extends(DirectionCollection, _super);
    function DirectionCollection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        Object.defineProperty(_this, "values", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        return _this;
    }
    Object.defineProperty(DirectionCollection.prototype, "getValues", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return _super.prototype.getValues.call(this);
        }
    });
    Object.defineProperty(DirectionCollection.prototype, "get", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            return _super.prototype.get.call(this, key);
        }
    });
    Object.defineProperty(DirectionCollection.prototype, "put", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key, value) {
            return _super.prototype.put.call(this, key, value);
        }
    });
    return DirectionCollection;
}(Collection));
export { DirectionCollection };
export default DirectionCollection;
//# sourceMappingURL=direction-collection.js.map