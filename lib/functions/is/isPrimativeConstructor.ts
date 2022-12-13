"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPrimativeConstructor(test) {
    //I am aware that this is normally not best practice but there is literally no other way to do this
    return test === String
        || test === Number
        || test === BigInt
        || test === Boolean
        || test === Symbol;
}
exports.default = isPrimativeConstructor;
