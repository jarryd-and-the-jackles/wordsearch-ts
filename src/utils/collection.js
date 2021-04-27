var Collection = (function () {
    function Collection(values) {
        Object.defineProperty(this, "values", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "keys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "key_value_map", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        if (typeof values === "undefined") {
            return;
        }
        if (Array.isArray(values)) {
            this.setFromArray(values);
        }
        else if (typeof values === "object") {
            this.setFromObject(values);
        }
        this.push(values);
    }
    Object.defineProperty(Collection.prototype, "isValidKey", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            return this.getKeys().indexOf(key) !== -1;
        }
    });
    Object.defineProperty(Collection.prototype, "isValidKeyIndex", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key_index) {
            return this.getKeyValueMap().indexOf(key_index) !== -1;
        }
    });
    Object.defineProperty(Collection.prototype, "getKeys", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.keys;
        }
    });
    Object.defineProperty(Collection.prototype, "getValues", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.values;
        }
    });
    Object.defineProperty(Collection.prototype, "getKeyValueMap", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.key_value_map;
        }
    });
    Object.defineProperty(Collection.prototype, "get", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            if (!this.isValidKey(key)) {
                return null;
            }
            var key_index = this.getKeys().indexOf(key);
            if (!this.isValidKeyIndex(key_index)) {
                return null;
            }
            var value_index = this.getKeyValueMap().indexOf(key_index);
            if (typeof this.getValues()[value_index] === "undefined") {
                return null;
            }
            return this.getValues()[value_index];
        }
    });
    Object.defineProperty(Collection.prototype, "put", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key, value) {
            this.getValues().push(value);
            var value_index = this.getValues().indexOf(value);
            this.getKeys().push(key);
            this.getKeyValueMap()[value_index] = this.getKeys().indexOf(key);
            return this;
        }
    });
    Object.defineProperty(Collection.prototype, "push", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (value) {
            this.getValues().push(value);
            var value_index = this.getValues().indexOf(value);
            var key = value_index.toString(10);
            this.getKeys().push(key);
            this.getKeyValueMap()[value_index] = this.getKeys().indexOf(key);
            return this;
        }
    });
    Object.defineProperty(Collection.prototype, "setFromArray", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (values) {
            for (var i = 0; i < values.length; i++) {
                var key = i.toString(10);
                this.put(key, values[i]);
            }
        }
    });
    Object.defineProperty(Collection.prototype, "setFromObject", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (values) {
            for (var key in values) {
                if (!values.hasOwnProperty(key)) {
                    continue;
                }
                this.put(key, values);
            }
        }
    });
    return Collection;
}());
export { Collection };
export default Collection;
//# sourceMappingURL=collection.js.map