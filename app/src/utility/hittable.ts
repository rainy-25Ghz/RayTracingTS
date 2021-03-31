import { Ray } from "./ray";
import { Vec3, Point3 } from "./vec3";
export interface hit_record {
  p: Point3;
  normal: Vec3;
  t: number;
}
export interface hittable {
  hit(r: Ray, t_min: number, t_max: number, rec: hit_record): boolean;
}
export class Sphere implements hittable {
  public center: Point3;
  public radius: number;
  constructor(cen: Point3, r: number) {
    this.center = cen;
    this.radius = r;
  }
  public hit(r: Ray, t_min: number, t_max: number, rec: hit_record) {
    let direction = r.dir;
    let origin = r.orig;
    let a = r.dir.length_squared;
    let half_b = direction.dot(origin.minus(this.center)); //b<0
    let c =
      origin.minus(this.center).dot(origin.minus(this.center)) - radius ** 2;
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
    rec.normal = rec.p.minus(this.center).devide(this.radius);
    return true;
  }
}
