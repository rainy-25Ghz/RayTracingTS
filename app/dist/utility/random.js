"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
//Math.RANDOM从0（包括0）往上，但是不包括1（排除1）
function random(min, max) {
    return Math.random() * (max - min) + min;
}
exports.random = random;
