"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
var vec3_1 = require("./vec3");
var ray_1 = require("./ray");
var Camera = /** @class */ (function () {
    function Camera(origin, viewportH, viewportW, focal_length) {
        this.origin = origin;
        this.focal_length = focal_length;
        this.viewport_height = viewportH;
        this.viewport_width = viewportW;
        this.horizontal = new vec3_1.Vec3(this.viewport_width, 0, 0);
        this.vertical = new vec3_1.Vec3(0, this.viewport_height, 0);
        //origin - horizontal/2 - vertical/2 - vec3(0, 0, focal_length)
        this.lower_left_corner = this.origin
            .minus(this.horizontal.devide(2))
            .minus(this.vertical.devide(2))
            .minus(new vec3_1.Vec3(0, 0, focal_length));
    }
    //获取射向视口坐标为（u,v)的光线
    Camera.prototype.getRay = function (u, v) {
        var dir = this.lower_left_corner
            .add(this.horizontal.multiply(u))
            .add(this.vertical.multiply(v))
            .minus(this.origin);
        return new ray_1.Ray(this.origin, dir);
    };
    return Camera;
}());
exports.Camera = Camera;
