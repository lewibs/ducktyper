"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isBoolean_1 = __importDefault(require("./isBoolean"));
const isFunction_1 = __importDefault(require("./isFunction"));
const isObject_1 = __importDefault(require("./isObject"));
const isString_1 = __importDefault(require("./isString"));
function isFieldDescriptor(obj) {
    return ((0, isObject_1.default)(obj)
        && (0, isFunction_1.default)(obj.initializer)
        && (0, isBoolean_1.default)(obj.writable)
        && (0, isBoolean_1.default)(obj.enumerable)
        && (0, isBoolean_1.default)(obj.configurable));
}
function isFieldDecorator(fieldsArr) {
    return ((0, isObject_1.default)(fieldsArr[0])
        && (0, isString_1.default)(fieldsArr[1])
        && isFieldDescriptor(fieldsArr[2]));
}
exports.default = isFieldDecorator;
