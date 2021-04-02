import { HitRecord, Hittable } from "./hittable";
import { Ray } from "./ray";
import { Point3 } from "./vec3";

export class Sphere implements Hittable {
  public center: Point3;
  public radius: number;
  constructor(cen: Point3, radius: number) {
    this.center = cen;
    this.radius = radius;
  }
  public hit(r: Ray, t_min: number, t_max: number, rec: HitRecord): boolean {
    let direction = r.dir;
    let origin = r.orig;
    let a = r.dir.length_squared;
    let half_b = direction.dot(origin.minus(this.center)); //b<0
    let c =
      origin.minus(this.center).dot(origin.minus(this.center)) -
      this.radius ** 2;
    let discriminant = half_b ** 2 - a * c;
    if (discriminant < 0) return false;
    let sqrtd = Math.sqrt(discriminant);
    let root = (-half_b - sqrtd) / a; //b<0，取最近的点，因此-sqrt(Δ)
    //若root在t的限制范围内，记录到hit_rec中
    if (root < t_min || t_max < root) {
      root = (-half_b + sqrtd) / a;
      if (root < t_min || t_max < root) return false;
    }
    rec.t = root;
    rec.p = r.at(rec.t);
    let outward_normal = rec.p.minus(this.center).devide(this.radius);
    rec.setFaceNormal(r, outward_normal);
    return true;
  }
}
