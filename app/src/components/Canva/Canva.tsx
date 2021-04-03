import React, { useState, useEffect } from "react";
import styles from "./Canva.module.css";
import { Camera } from "../../utility/camera";
import { Ray } from "../../utility/ray";
import { Vec3, Point3 } from "../../utility/vec3";
import { Color } from "../../utility/color";
import { HittableList } from "../../utility/hittableList";
import { Sphere } from "../../utility/sphere";
import { HitRecord } from "../../utility/hittable";
import { random } from "../../utility/random";
/**
 * @return 光线的最终颜色
 * @param r 光线
 * @param world 所有物体
 * @param depth 计算反射的递归深度限制
 * */
function ray_color(r: Ray, world: HittableList, depth: number): Color {
  let rec = new HitRecord();
  if (depth <= 0) return new Color(0, 0, 0);
  if (world.hit(r, 0, Infinity, rec)) {
    const target = rec.p.add(rec.normal).add(Vec3.randomVecInUnitSphere());
    return ray_color(
      new Ray(rec.p, target.minus(rec.p)),
      world,
      depth - 1
    ).multiply(0.5);
  }
  // const rgb = rec.normal.add(new Vec3(1, 1, 1)).multiply(0.5);
  // return new Color(rgb.x, rgb.y, rgb.z);
  let unit_direction: Vec3 = r.dir.unit_vector; //y∈[-1,1]
  let t = 0.5 * (unit_direction.y + 1); //映射y到[0,1]
  let white = new Color(1, 1, 1);
  let blue = new Color(0.5, 0.7, 1.0);
  return white.multiply(1 - t).add(blue.multiply(t)); //最底下y=-1,t=0时为白色，y=1,t=1时为蓝色
}

function antialiasing(
  samplesPerPixel: number,
  world: HittableList,
  x: number,
  y: number,
  w: number,
  h: number,
  cam: Camera
): Color {
  let color = new Color(0, 0, 0);
  for (let s = 0; s < samplesPerPixel; ++s) {
    let u = (x + random(0, 1)) / (w - 1);
    let v = (y + random(0, 1)) / (h - 1);
    const r = cam.getRay(u, v);
    color = color.add(ray_color(r, world, 50));
  }
  let temp = color.devide(samplesPerPixel);
  return temp.sqrt().uint8_color;
}
interface Props {
  imgWidth: number;
  imgHeight: number;
}
function getInlineWH(w: number, h: number): React.CSSProperties {
  return {
    width: w,
    height: h,
  };
}
function initCanvas(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const imgdata = new ImageData(w, h);
  const data = imgdata.data;
  const bar = document.getElementsByClassName(styles.bar)[0] as HTMLElement;
  const indicator = document.getElementsByClassName(
    styles.indicator
  )[0] as HTMLElement;
  let t = 0;
  let y = h - 1,
    x = 0;

  let cam = new Camera(new Vec3(0, 0, 0), 2, (2 * 16) / 9, 1);
  let world = new HittableList();
  world.add(new Sphere(new Point3(0, 0, -1), 0.5));
  world.add(new Sphere(new Point3(0, -100.5, -1), 100));
  function _frame() {
    //console.log(y);
    for (let temp = 0; temp < 3 && y >= 0; temp++) {
      for (x = 0; x < w; x++) {
        let color = antialiasing(100, world, x, y, w, h, cam);
        data[t + 0] = color.r; // R value
        data[t + 1] = color.g; // G value
        data[t + 2] = color.b; // B value
        data[t + 3] = 255; // A value
        t += 4;
      }
      y--;
    }
    if (y >= 0) {
      x = 0;
      //y--;
      bar.style.width = `${((h - y) / h) * 100}%`;
      indicator.textContent = `${h - 1 - y} lines rendered`;
      ctx.putImageData(imgdata, 0, 0);
      requestAnimationFrame(_frame);
    } else {
      bar.style.width = `${((h - y) / h) * 100}%`;
      indicator.textContent = `${h - 1 - y} lines rendered`;
      ctx.putImageData(imgdata, 0, 0);
      return;
    }
  }
  requestAnimationFrame(_frame);
  //ctx.putImageData(imgdata, 0, 0);
}
export const Canva = ({ imgHeight, imgWidth }: Props) => {
  //const [renderImageFlag, setrenderImageFlag] = useState(false);
  //const canvaContext = React.useContext(null);
  useEffect(() => {
    //获取canva的上下文
    const canva = document.getElementById("canva") as HTMLCanvasElement;
    const canvaContext = canva.getContext("2d");
    initCanvas(canvaContext, imgWidth, imgHeight);
    //添加resize事件监听，防止canvas显示分辨率出问题
  }, [imgWidth, imgHeight]);
  return (
    <div className={styles.container}>
      <div className={styles.container_canva}>
        <canvas
          id="canva"
          width={`${imgWidth}`}
          height={`${imgHeight}`}
          style={getInlineWH(imgWidth, imgHeight)}
        ></canvas>
      </div>
      <div className={styles.progress}>
        <div className={styles.bar}></div>
        <span className={styles.indicator}></span>
      </div>
    </div>
  );
};
