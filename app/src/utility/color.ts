export class Color {
  public e: number[];
  constructor();
  constructor(e0: number, e1: number, e2: number);
  constructor(e0?: number, e1?: number, e2?: number) {
    this.e = [e0 || 0, e1 || 0, e2 || 0];
  }

  get r(): number {
    return this.e[0];
  }
  get g(): number {
    return this.e[1];
  }
  get b(): number {
    return this.e[2];
  }
  private clamp(val: number, min: number, max: number): number {
    if (val > max) return max;
    if (val < min) return min;
    return val;
  }
  get uint8_color(): Color {
    let e_uint8 = this.e.map((value) =>
      Math.floor(256 * this.clamp(value, 0, 0.999))
    );
    return new Color(e_uint8[0], e_uint8[1], e_uint8[2]);
  }
  //加法
  add(vec: Color): Color {
    return new Color(this.r + vec.r, this.g + vec.g, this.b + vec.b);
  }
  //减法
  minus(vec: Color): Color {
    return new Color(this.r - vec.r, this.g - vec.g, this.b - vec.b);
  }
  //数乘
  multiply(t: number): Color {
    return new Color(this.r * t, this.g * t, this.b * t);
  }
  //除
  devide(t: number): Color {
    return this.multiply(1 / t);
  }
}
