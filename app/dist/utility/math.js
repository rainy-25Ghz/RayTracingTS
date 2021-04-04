"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = void 0;
function clamp(val, min, max) {
    if (val <= max && val >= min)
        return val;
    if (val > max)
        return max;
    return min;
}
exports.clamp = clamp;
