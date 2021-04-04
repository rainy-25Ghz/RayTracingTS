import { Camera } from "../utility/camera";
import { Color } from "../utility/color";
import { HitRecord } from "../utility/hittable";
import { HittableList } from "../utility/hittableList";
import { PNGRenderer } from "../utility/PNGrenderer";
import { Ray } from "../utility/ray";
import { Sphere } from "../utility/sphere";
import { Point3, Vec3 } from "../utility/vec3";

function rayColor(r: Ray, world: HittableList): Color {
  let rec = new HitRecord();
  if (world.hit(r, 0, Infinity, rec)) {
    //映射法向量到色彩
    let tempVec = rec.normal.add(new Vec3(1, 1, 1)).multiply(0.5);
    return new Color(tempVec.x, tempVec.y, tempVec.z);
  }

  //背景色
  let unitDirection = r.dir.unit_vector;
  let t = (unitDirection.y + 1) * 0.5;
  let white = new Color(1, 1, 1);
  let blue = new Color(0.5, 0.7, 1.0);
  return white.multiply(1 - t).add(blue.multiply(t));
}

//Image
const aspectRatio = 16 / 9;
const imageWidth = 400;
const imageHeight = Math.floor(imageWidth / aspectRatio);
let pngRenderer = new PNGRenderer(imageWidth, imageHeight);
const samplesPerPixel = 100; //每个像素的采样率；

//Camera
let cam = new Camera(new Point3(0, 0, 0), 2, aspectRatio * 2, 1);

//world
let world = new HittableList();
world.add(new Sphere(new Vec3(0, 0, -1), 0.5));
world.add(new Sphere(new Vec3(0, -100.5, -1), 100));

//render
for (let j = imageHeight - 1; j >= 0; --j) {
  console.log(`Scanlines remaining: ${j}`);
  for (let i = 0; i < imageWidth; ++i) {
    let pixelColor = new Color(0, 0, 0);
    for (let s = 0; s < samplesPerPixel; ++s) {
      let [u, v] = [
        (i + Math.random()) / (imageWidth - 1),
        (j + Math.random()) / (imageHeight - 1),
      ];
      let r = cam.getRay(u, v);
      let color = rayColor(r, world);
      pixelColor = pixelColor.add(color);
    }
    pngRenderer.setPixelColor(pixelColor, i, imageHeight - j, samplesPerPixel);
    //pngRenderer.renderToPng();
  }
}
pngRenderer.renderToPng();
