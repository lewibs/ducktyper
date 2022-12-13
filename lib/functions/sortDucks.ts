"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isDuck_1 = __importDefault(require("./is/isDuck"));
function sortDucks(arr) {
    //[duckValidators, other]
    const sorted = [[], []];
    arr.forEach((val) => {
        if ((0, isDuck_1.default)(val)) {
            sorted[0].push(val);
        }
        else {
            sorted[1].push(val);
        }
    });
    return sorted;
}
exports.default = sortDucks;
