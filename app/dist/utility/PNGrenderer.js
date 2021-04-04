"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PNGRenderer = void 0;
var jimp_1 = __importDefault(require("jimp"));
var math_1 = require("./math");
var PNGRenderer = /** @class */ (function () {
    function PNGRenderer(width, height) {
        this.width = width;
        this.height = height;
        this.image = new jimp_1.default(width, height);
    }
    PNGRenderer.prototype.setPixelColor = function (color, x, y, samplesPerPixel) {
        var _a = [color.r, color.g, color.b], r = _a[0], g = _a[1], b = _a[2];
        r /= samplesPerPixel;
        g /= samplesPerPixel;
        b /= samplesPerPixel;
        r = Math.floor(256 * math_1.clamp(r, 0, 0.999));
        g = Math.floor(256 * math_1.clamp(g, 0, 0.999));
        b = Math.floor(256 * math_1.clamp(b, 0, 0.999));
        var hexcolor = jimp_1.default.rgbaToInt(r, g, b, 255);
        this.image.setPixelColor(hexcolor, x, y);
    };
    PNGRenderer.prototype.renderToPng = function () {
        this.image.write("output.png", function (err) {
            if (err)
                throw err;
        });
    };
    return PNGRenderer;
}());
exports.PNGRenderer = PNGRenderer;
