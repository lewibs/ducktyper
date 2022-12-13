"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isArray_1 = __importDefault(require("./isArray"));
function isObject(val) {
    if ((0, isArray_1.default)(val))
        return false;
    return typeof val === "object";
}
exports.default = isObject;
