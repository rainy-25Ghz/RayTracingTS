import React, { useState, useEffect } from "react";
import styles from "./Canva.module.css";
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
  function _frame() {
    for (x = 0; x < w; x++) {
      data[t + 0] = x; // R value
      data[t + 1] = y; // G value
      data[t + 2] = 0.25 * 256; // B value
      data[t + 3] = 255; // A value
      t += 4;
    }
    y--;
    for (x = 0; x < w; x++) {
      data[t + 0] = x; // R value
      data[t + 1] = y; // G value
      data[t + 2] = 0.25 * 256; // B value
      data[t + 3] = 255; // A value
      t += 4;
    }
    bar.style.width = `${((h - y) / h) * 100}%`;
    ctx.putImageData(imgdata, 0, 0);
    indicator.textContent = `${h - y} lines rendered`;
    if (y >= 0) {
      x = 0;
      y--;
      requestAnimationFrame(_frame);
    } else {
      return;
    }
  }
  requestAnimationFrame(_frame);
  // for (let j = h - 1; j >= 0; j--) {
  //   for (let i = 0; i < w; i++) {
  //     data[t + 0] = i; // R value
  //     data[t + 1] = j; // G value
  //     data[t + 2] = 0.25 * 256; // B value
  //     data[t + 3] = 255; // A value
  //     t += 4;
  //     //for (let k = 0; k < 200000; k++) {}
  //   }
  //   console.log(`${((h - j) / h) * 100}%`);
  //   bar.style.width = `${((h - j) / h) * 100}%`;
  //   ctx.putImageData(imgdata, 0, 0);
  // }
  ctx.putImageData(imgdata, 0, 0);
}
export const Canva = ({ imgHeight, imgWidth }: Props) => {
  const [renderImageFlag, setrenderImageFlag] = useState(false);
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
