"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPrimitive(test) {
    return test !== Object(test);
}
exports.default = isPrimitive;
