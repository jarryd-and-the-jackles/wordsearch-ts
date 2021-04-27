var Chronometer = (function () {
    function Chronometer() {
        var _this = this;
        Object.defineProperty(this, "elapsed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.elapsed = 0;
        this.timer = setInterval(function () { return _this.tick(); }, 1000);
    }
    Object.defineProperty(Chronometer.prototype, "tick", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            this.elapsed++;
        }
    });
    Object.defineProperty(Chronometer.prototype, "getElapsed", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.elapsed;
        }
    });
    return Chronometer;
}());
export { Chronometer };
export default Chronometer;
//# sourceMappingURL=chronometer.js.map