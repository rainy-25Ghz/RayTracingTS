import Jimp from "jimp";
import { Color } from "./color";
import { clamp } from "./math";
export class PNGRenderer {
  width: number;
  height: number;
  image: Jimp;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.image = new Jimp(width, height);
  }
  setPixelColor(
    color: Color,
    x: number,
    y: number,
    samplesPerPixel: number
  ): void {
    let [r, g, b] = [color.r, color.g, color.b];
    r /= samplesPerPixel;
    g /= samplesPerPixel;
    b /= samplesPerPixel;
    r = Math.floor(256 * clamp(r, 0, 0.999));
    g = Math.floor(256 * clamp(g, 0, 0.999));
    b = Math.floor(256 * clamp(b, 0, 0.999));
    let hexcolor = Jimp.rgbaToInt(r, g, b, 255);
    this.image.setPixelColor(hexcolor, x, y);
  }
  renderToPng(): void {
    this.image.write("output.png", (err) => {
      if (err) throw err;
    });
  }
}
