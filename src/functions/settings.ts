import { DuckTypes } from "./duckorate";

export const ISDUCK_OPTIONS = {
    throw: false,
    allowUndefined: false,
    allowEmpty: true,
    allowEmptyString: undefined,
    allowEmptyArray: undefined,
    childMessage: true,
    message: `Not A Duck: Input failed to follow specifications`,
};

export const DUCKORATE_OPTIONS = {
    type: DuckTypes.parameter,
};

function afix(objA, objB) {
    for (const property in objB) {
        objA[property] = objB[property];
    }
}

export function initDuckorateOptions(obj) {
    afix(DUCKORATE_OPTIONS, obj);
}

export function initIsDuckOptions(obj) {
    afix(ISDUCK_OPTIONS, obj);
}