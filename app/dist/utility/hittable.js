"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitRecord = void 0;
var vec3_1 = require("./vec3");
var HitRecord = /** @class */ (function () {
    function HitRecord() {
        //this.p=new Point3();
        //this.isFrontFace=false;
        this.normal = new vec3_1.Vec3();
        //this.
    }
    /**
     *
     * @ 判定光线在物体内还是物体外，修正法线方向朝外，
     */
    HitRecord.prototype.setFaceNormal = function (r, outward_normal) {
        this.isFrontFace = r.dir.dot(outward_normal) < 0;
        this.normal = this.isFrontFace
            ? outward_normal
            : vec3_1.Vec3.negative(outward_normal);
    };
    return HitRecord;
}());
exports.HitRecord = HitRecord;
