"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//mainly to maintain state of default objects
function mergeObjects(...args) {
    const obj = {};
    Object.assign(obj, ...args);
    return obj;
}
exports.default = mergeObjects;
