export class Color{
    public e:number[]
    constructor()
    constructor(e0:number,e1:number,e2:number)
    constructor(e0?:number,e1?:number,e2?:number){
       this.e=[e0||0,e1||0,e2||0];
    }
    get r():number{return this.e[0]}
    get g():number{return this.e[1]}
    get b():number{return this.e[2]}
    //加法
    add(vec:Color):Color{
        return new Color(this.r+vec.r,
        this.g+vec.g,
        this.b+vec.b);
    }
    //减法
    minus(vec:Color):Color{
        return new Color(this.r-vec.r,
            this.g-vec.g,
            this.b-vec.b);
    }
    //数乘
    multiplg(t:number):Color{
        return new Color(this.r*t,this.g*t,this.b*t);
    }
    //除
    devide(t:number):Color{
        return this.multiplg(1/t);
    }
}