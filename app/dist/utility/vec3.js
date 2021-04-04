"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point3 = exports.Vec3 = void 0;
var random_1 = require("./random");
var Vec3 = /** @class */ (function () {
    function Vec3(e0, e1, e2) {
        this.e = [e0 || 0, e1 || 0, e2 || 0];
    }
    Object.defineProperty(Vec3.prototype, "x", {
        get: function () {
            return this.e[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vec3.prototype, "y", {
        get: function () {
            return this.e[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vec3.prototype, "z", {
        get: function () {
            return this.e[2];
        },
        enumerable: false,
        configurable: true
    });
    //加法
    Vec3.prototype.add = function (vec) {
        return new Vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    };
    //减法
    Vec3.prototype.minus = function (vec) {
        return new Vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    };
    //数乘
    Vec3.prototype.multiply = function (t) {
        return new Vec3(this.x * t, this.y * t, this.z * t);
    };
    //除
    Vec3.prototype.devide = function (t) {
        return this.multiply(1 / t);
    };
    //叉乘
    Vec3.prototype.cross = function (vec) {
        return new Vec3(this.y * vec.z - vec.y * this.z, -this.x * vec.z + this.z * vec.x, this.x * vec.y - this.y * vec.x);
    };
    //点乘
    Vec3.prototype.dot = function (vec) {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    };
    /**
     * 向量取负数
     */
    Vec3.negative = function (vec) {
        return new Vec3(-vec.x, -vec.y, -vec.z);
    };
    Object.defineProperty(Vec3.prototype, "length", {
        //求长度
        get: function () {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vec3.prototype, "length_squared", {
        //求长度平方
        get: function () {
            return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vec3.prototype, "unit_vector", {
        //求单位向量
        get: function () {
            return this.devide(this.length);
        },
        enumerable: false,
        configurable: true
    });
    Vec3.random_vector = function (min, max) {
        return new Vec3(random_1.random(min, max), random_1.random(min, max), random_1.random(min, max));
    };
    Vec3.random_unit_sphere_vector = function () {
        while (true) {
            var temp = Vec3.random_vector(-1, 1);
            if (temp.length_squared >= 1)
                continue;
            return temp;
        }
    };
    return Vec3;
}());
exports.Vec3 = Vec3;
exports.Point3 = Vec3; //构造函数
