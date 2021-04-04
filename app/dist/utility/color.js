"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
var Color = /** @class */ (function () {
    function Color(e0, e1, e2) {
        this.e = [e0 || 0, e1 || 0, e2 || 0];
    }
    Object.defineProperty(Color.prototype, "r", {
        get: function () {
            return this.e[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "g", {
        get: function () {
            return this.e[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "b", {
        get: function () {
            return this.e[2];
        },
        enumerable: false,
        configurable: true
    });
    Color.prototype.clamp = function (val, min, max) {
        if (val > max)
            return max;
        if (val < min)
            return min;
        return val;
    };
    Object.defineProperty(Color.prototype, "uint8_color", {
        get: function () {
            var _this = this;
            var e_uint8 = this.e.map(function (value) {
                return Math.floor(256 * _this.clamp(value, 0, 0.999));
            });
            return new Color(e_uint8[0], e_uint8[1], e_uint8[2]);
        },
        enumerable: false,
        configurable: true
    });
    //加法
    Color.prototype.add = function (vec) {
        return new Color(this.r + vec.r, this.g + vec.g, this.b + vec.b);
    };
    //减法
    Color.prototype.minus = function (vec) {
        return new Color(this.r - vec.r, this.g - vec.g, this.b - vec.b);
    };
    //数乘
    Color.prototype.multiply = function (t) {
        return new Color(this.r * t, this.g * t, this.b * t);
    };
    //除
    Color.prototype.devide = function (t) {
        return this.multiply(1 / t);
    };
    return Color;
}());
exports.Color = Color;
