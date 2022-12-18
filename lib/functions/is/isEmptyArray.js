"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyArray = void 0;
const isArray_1 = __importDefault(require("./isArray"));
function isEmptyArray(check) {
    return (0, isArray_1.default)(check) && check.length === 0;
}
exports.isEmptyArray = isEmptyArray;
exports.default = isEmptyArray;
