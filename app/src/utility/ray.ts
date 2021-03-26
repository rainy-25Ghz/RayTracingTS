import {Vec3,Point3} from "./vec3"
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