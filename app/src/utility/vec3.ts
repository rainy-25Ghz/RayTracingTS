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
    //加法
    add(vec:Vec3):Vec3{
        return new Vec3(this.x+vec.x,
        this.y+vec.y,
        this.z+vec.z);
    }
    //减法
    minus(vec:Vec3):Vec3{
        return new Vec3(this.x-vec.x,
            this.y-vec.y,
            this.z-vec.z);
    }
    //数乘
    multiply(t:number):Vec3{
        return new Vec3(this.x*t,this.y*t,this.z*t);
    }
    //除
    devide(t:number):Vec3{
        return this.multiply(1/t);
    }
    //叉乘
    cross(vec:Vec3):Vec3{
        return new Vec3(this.y*vec.z-vec.y*this.z,
            -this.x*vec.z+this.z*vec.x,
            this.x*vec.y-this.y*vec.x);
    }
    //点乘
    dot(vec:Vec3):number{
        return this.x*vec.x+this.y*vec.y+this.z*vec.z;
    }
    //取负数
    static negative(vec:Vec3):Vec3{
        return new Vec3(-vec.x,-vec.y,-vec.z);
    }
    //求长度
    get length():number{
        return Math.sqrt(this.x**2+this.y**2+this.z**2);
    }
    //求长度平方
    get length_squared():number{
        return this.x**2+this.y**2+this.z**2;
    }
    //求单位向量
    get unit_vector():Vec3{
        return this.devide(this.length);
    }
}