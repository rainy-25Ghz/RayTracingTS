"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var camera_1 = require("../utility/camera");
var color_1 = require("../utility/color");
var hittable_1 = require("../utility/hittable");
var hittableList_1 = require("../utility/hittableList");
var PNGrenderer_1 = require("../utility/PNGrenderer");
var sphere_1 = require("../utility/sphere");
var vec3_1 = require("../utility/vec3");
function rayColor(r, world) {
    var rec = new hittable_1.HitRecord();
    if (world.hit(r, 0, Infinity, rec)) {
        //映射法向量到色彩
        var tempVec = rec.normal.add(new vec3_1.Vec3(1, 1, 1)).multiply(0.5);
        return new color_1.Color(tempVec.x, tempVec.y, tempVec.z);
    }
    //背景色
    var unitDirection = r.dir.unit_vector;
    var t = (unitDirection.y + 1) * 0.5;
    var white = new color_1.Color(1, 1, 1);
    var blue = new color_1.Color(0.5, 0.7, 1.0);
    return white.multiply(1 - t).add(blue.multiply(t));
}
//Image
var aspectRatio = 16 / 9;
var imageWidth = 400;
var imageHeight = Math.floor(imageWidth / aspectRatio);
var pngRenderer = new PNGrenderer_1.PNGRenderer(imageWidth, imageHeight);
var samplesPerPixel = 100; //每个像素的采样率；
//Camera
var cam = new camera_1.Camera(new vec3_1.Point3(0, 0, 0), 2, aspectRatio * 2, 1);
//world
var world = new hittableList_1.HittableList();
world.add(new sphere_1.Sphere(new vec3_1.Vec3(0, 0, -1), 0.5));
world.add(new sphere_1.Sphere(new vec3_1.Vec3(0, -100.5, -1), 100));
//render
for (var j = imageHeight - 1; j >= 0; --j) {
    console.log("Scanlines remaining: " + j);
    for (var i = 0; i < imageWidth; ++i) {
        var pixelColor = new color_1.Color(0, 0, 0);
        for (var s = 0; s < samplesPerPixel; ++s) {
            var _a = [
                (i + Math.random()) / (imageWidth - 1),
                (j + Math.random()) / (imageHeight - 1),
            ], u = _a[0], v = _a[1];
            var r = cam.getRay(u, v);
            var color = rayColor(r, world);
            pixelColor = pixelColor.add(color);
        }
        pngRenderer.setPixelColor(pixelColor, i, imageHeight - j, samplesPerPixel);
        //pngRenderer.renderToPng();
    }
}
pngRenderer.renderToPng();
