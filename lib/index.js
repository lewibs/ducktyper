"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = exports.isBoolean = exports.isObject = exports.isNumber = exports.isString = void 0;
const ducker_1 = require("./functions/ducker");
__exportStar(require("./functions/ducker"), exports);
__exportStar(require("./functions/Any"), exports);
__exportStar(require("./functions/duckorate"), exports);
__exportStar(require("./functions/settings"), exports);
exports.isString = (0, ducker_1.duckfaults)((0, ducker_1.makeDuck)(String), {
    message: "Not a string",
});
exports.isNumber = (0, ducker_1.duckfaults)((0, ducker_1.makeDuck)(Number), {
    message: "Not a number",
});
exports.isObject = (0, ducker_1.duckfaults)((0, ducker_1.makeDuck)(Object), {
    message: "Not a object",
});
exports.isBoolean = (0, ducker_1.duckfaults)((0, ducker_1.makeDuck)(Boolean), {
    message: "Not a boolean",
});
exports.isArray = (0, ducker_1.duckfaults)((0, ducker_1.makeDuck)(Array), {
    message: "Not an array",
});
