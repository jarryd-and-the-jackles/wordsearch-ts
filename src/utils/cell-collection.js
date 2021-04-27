import { __extends } from "tslib";
import Collection from "./collection";
var CellCollection = (function (_super) {
    __extends(CellCollection, _super);
    function CellCollection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        Object.defineProperty(_this, "values", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        return _this;
    }
    Object.defineProperty(CellCollection.prototype, "getValues", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return _super.prototype.getValues.call(this);
        }
    });
    Object.defineProperty(CellCollection.prototype, "get", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            return _super.prototype.get.call(this, key);
        }
    });
    Object.defineProperty(CellCollection.prototype, "put", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key, value) {
            return _super.prototype.put.call(this, key, value);
        }
    });
    return CellCollection;
}(Collection));
export { CellCollection };
export default CellCollection;
//# sourceMappingURL=cell-collection.js.map