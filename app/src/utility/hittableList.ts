import { HitRecord, Hittable } from "./hittable";
import { Ray } from "./ray";
export class HittableList {
  public hittableObjects: Hittable[];
  constructor();
  constructor(hittableObject: Hittable);
  constructor(hittableObject?: Hittable) {
    if (hittableObject) this.hittableObjects.push(hittableObject);
    else this.hittableObjects = [];
  }
  clear(): void {
    this.hittableObjects.splice(0, this.hittableObjects.length);
  }
  add(hittableObject: Hittable) {
    this.hittableObjects.push(hittableObject);
  }
  hit(r: Ray, t_min: number, t_max: number, rec: HitRecord): boolean {
    let temp_rec = new HitRecord();
    let closest_so_far = t_max; //存储目前最小的t，初始值为t_max
    let hitFlag: boolean = false; //光线是否击中了物体
    for (let hittableObject of this.hittableObjects) {
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
  }
}
