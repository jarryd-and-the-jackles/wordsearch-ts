import { __extends } from "tslib";
import Collection from "./collection";
var RowCollection = (function (_super) {
    __extends(RowCollection, _super);
    function RowCollection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        Object.defineProperty(_this, "values", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        return _this;
    }
    Object.defineProperty(RowCollection.prototype, "getValues", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return _super.prototype.getValues.call(this);
        }
    });
    Object.defineProperty(RowCollection.prototype, "get", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            return _super.prototype.get.call(this, key);
        }
    });
    Object.defineProperty(RowCollection.prototype, "put", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key, value) {
            return _super.prototype.put.call(this, key, value);
        }
    });
    return RowCollection;
}(Collection));
export { RowCollection };
export default RowCollection;
//# sourceMappingURL=row-collection.js.map