"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sphere = void 0;
var Sphere = /** @class */ (function () {
    function Sphere(cen, radius) {
        this.center = cen;
        this.radius = radius;
    }
    Sphere.prototype.hit = function (r, t_min, t_max, rec) {
        var direction = r.dir;
        var origin = r.orig;
        var a = r.dir.length_squared;
        var half_b = direction.dot(origin.minus(this.center)); //b<0
        var c = origin.minus(this.center).dot(origin.minus(this.center)) -
            Math.pow(this.radius, 2);
        var discriminant = Math.pow(half_b, 2) - a * c;
        if (discriminant < 0)
            return false;
        var sqrtd = Math.sqrt(discriminant);
        var root = (-half_b - sqrtd) / a; //b<0，取最近的点，因此-sqrt(Δ)
        //若root在t的限制范围内，记录到hit_rec中
        if (root < t_min || t_max < root) {
            root = (-half_b + sqrtd) / a;
            if (root < t_min || t_max < root)
                return false;
        }
        rec.t = root;
        rec.p = r.at(rec.t);
        var outward_normal = rec.p.minus(this.center).devide(this.radius);
        rec.setFaceNormal(r, outward_normal);
        return true;
    };
    return Sphere;
}());
exports.Sphere = Sphere;
