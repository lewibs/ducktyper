"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isClass_1 = __importDefault(require("./isClass"));
function isClassDecorator(fieldArr) {
    return (0, isClass_1.default)(fieldArr[0]) && fieldArr[1] === undefined && fieldArr[2] === undefined;
}
exports.default = isClassDecorator;
