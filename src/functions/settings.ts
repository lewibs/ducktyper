
export const ISDUCK_OPTIONS = {
    throw: false,
    allowUndefined: false,
    allowEmpty: true,
    allowEmptyString: undefined,
    allowEmptyArray: undefined,
    childMessage: true,
    message: `Not A Duck: Input failed to follow specifications`,
    forceDuckDto: false,
};

export const CLASIFYDUCK_OPTIONS = {
    ...ISDUCK_OPTIONS,
    message: undefined,
}

function afix(objA, objB) {
    for (const property in objB) {
        objA[property] = objB[property];
    }
}

export function initIsDuckOptions(obj) {
    afix(ISDUCK_OPTIONS, obj);
}

export function initClassifyDuckOptions(obj) {
    afix(CLASIFYDUCK_OPTIONS, obj);
}