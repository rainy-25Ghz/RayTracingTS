import {Vec3} from "./vec3"
type Point3=Vec3;//类型
const Point3=Vec3;//构造函数
export class Ray{
    orig:Point3
    dir:Vec3
    constructor()
    constructor(origin:Point3,direction:Vec3)
    constructor(origin?:Point3,direction?:Vec3){
        this.orig=origin||new Point3();
        this.dir=direction||new Vec3();
    }
}