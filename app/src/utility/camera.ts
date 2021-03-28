import {Vec3,Point3} from "./vec3";
export class Camera{
origin:Point3
horizontal:Vec3
vertical:Vec3
lower_left_corner:Vec3
viewport_width:number
viewport_height:number
//aspect_ratio:number
focal_length:number
constructor(origin:Point3,viewportH:number,viewportW:number,focal_length:number,){
    this.origin=origin;
    this.focal_length=focal_length;
    this.viewport_height=viewportH;
    this.viewport_width=viewportW;
    this.horizontal=new Vec3(this.viewport_width,0,0);
    this.vertical=new Vec3(0,this.viewport_height,0);
    //origin - horizontal/2 - vertical/2 - vec3(0, 0, focal_length)
    this.lower_left_corner=this.origin.minus(this.horizontal.devide(2)).minus(this.vertical.devide(2)).minus(new Vec3(0,0,focal_length));
}
}