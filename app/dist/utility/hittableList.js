"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HittableList = void 0;
var hittable_1 = require("./hittable");
var HittableList = /** @class */ (function () {
    function HittableList(hittableObject) {
        if (hittableObject)
            this.hittableObjects.push(hittableObject);
        else
            this.hittableObjects = [];
    }
    HittableList.prototype.clear = function () {
        this.hittableObjects.splice(0, this.hittableObjects.length);
    };
    HittableList.prototype.add = function (hittableObject) {
        this.hittableObjects.push(hittableObject);
    };
    HittableList.prototype.hit = function (r, t_min, t_max, rec) {
        var temp_rec = new hittable_1.HitRecord();
        var closest_so_far = t_max; //存储目前最小的t，初始值为t_max
        var hitFlag = false; //光线是否击中了物体
        for (var _i = 0, _a = this.hittableObjects; _i < _a.length; _i++) {
            var hittableObject = _a[_i];
            //console.log(hittableObject);
            //每次迭代都把目前为止最近的t作为下一次的tmax,确保击中最近的物体
            if (hittableObject.hit(r, t_min, closest_so_far, temp_rec)) {
                hitFlag = true;
                closest_so_far = temp_rec.t;
                rec.normal = temp_rec.normal;
                rec.t = temp_rec.t;
                rec.p = temp_rec.p;
                rec.isFrontFace = temp_rec.isFrontFace;
                //console.log(rec);
            }
        }
        return hitFlag;
    };
    return HittableList;
}());
exports.HittableList = HittableList;
