"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isClass_1 = __importDefault(require("./isClass"));
function isFunction(val) {
    return typeof val == "function" && !(0, isClass_1.default)(val);
}
exports.default = isFunction;
