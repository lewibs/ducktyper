"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ducker_1 = require("../ducker");
function isDuck(val) {
    if (typeof val === 'function' && val.name === ducker_1.DUCK) {
        return true;
    }
    return false;
}
exports.default = isDuck;
