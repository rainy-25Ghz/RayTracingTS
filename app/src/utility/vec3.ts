export class Vec3{
    public e:number[]
    constructor()
    constructor(e0:number,e1:number,e2:number)
    constructor(e0?:number,e1?:number,e2?:number){
       this.e=[e0||0,e1||0,e2||0];
    }
    get x():number{return this.e[0]}
    get y():number{return this.e[1]}
    get z():number{return this.e[2]}

    add(vec:Vec3):Vec3{
        return new Vec3(this.x+vec.x,
        this.y+vec.y,
        this.z+vec.z);
    }
    minus(vec:Vec3):Vec3{
        return new Vec3(this.x-vec.x,
            this.y-vec.y,
            this.z-vec.z);
    }
    static negative(vec:Vec3):Vec3{
        return new Vec3(-vec.x,-vec.y,-vec.z);
    }
}