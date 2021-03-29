import React, { useState, useEffect } from "react";
import styles from "./Canva.module.css";
import { Camera } from "../../utility/camera";
import { Ray } from "../../utility/ray";
import { Vec3, Point3 } from "../../utility/vec3";
import { Color } from "../../utility/color";
function ray_color(r: Ray): Color {
  let unit_direction: Vec3 = r.dir.unit_vector; //y∈[-1,1]
  let t = 0.5 * (unit_direction.y + 1); //映射y到[0,1]
  let white = new Color(1, 1, 1);
  let blue = new Color(0.5, 0.7, 1.0);
  return white.multiply(1 - t).add(blue.multiply(t)); //最底下y=-1,t=0时为白色，y=1,t=1时为蓝色
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
  let origin = cam.origin;
  let lower_left_corner = cam.lower_left_corner;
  let horizontal = cam.horizontal;
  let vertical = cam.vertical;
  function _frame() {
    //console.log(y);
    for (let temp = 0; temp < 3 && y >= 0; temp++) {
      for (x = 0; x < w; x++) {
        let u = x / (w - 1);
        let v = y / (h - 1);
        let dir = lower_left_corner
          .add(horizontal.multiply(u))
          .add(vertical.multiply(v))
          .minus(origin);
        const r = new Ray(origin, dir);
        let color = ray_color(r).uint8_color;
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
