"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ray = void 0;
var vec3_1 = require("./vec3");
var Ray = /** @class */ (function () {
    function Ray(origin, direction) {
        this.orig = origin || new vec3_1.Point3();
        this.dir = direction || new vec3_1.Vec3();
    }
    Ray.prototype.at = function (t) {
        return this.orig.add(this.dir.multiply(t));
    };
    return Ray;
}());
exports.Ray = Ray;
