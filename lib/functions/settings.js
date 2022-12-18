"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initClassifyDuckOptions = exports.initIsDuckOptions = exports.CLASIFYDUCK_OPTIONS = exports.ISDUCK_OPTIONS = void 0;
exports.ISDUCK_OPTIONS = {
    throw: false,
    allowUndefined: false,
    allowEmpty: true,
    allowEmptyString: undefined,
    allowEmptyArray: undefined,
    childMessage: true,
    message: `Not A Duck: Input failed to follow specifications`,
};
exports.CLASIFYDUCK_OPTIONS = {
    throw: false,
    message: undefined,
};
function afix(objA, objB) {
    for (const property in objB) {
        objA[property] = objB[property];
    }
}
function initIsDuckOptions(obj) {
    afix(exports.ISDUCK_OPTIONS, obj);
}
exports.initIsDuckOptions = initIsDuckOptions;
function initClassifyDuckOptions(obj) {
    afix(exports.CLASIFYDUCK_OPTIONS, obj);
}
exports.initClassifyDuckOptions = initClassifyDuckOptions;
