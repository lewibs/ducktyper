import { DuckTypes } from "./duckorate";

export const DEFAULTOPTIONS = {
    type: DuckTypes.default,
    throw: false,
    allowUndefined: false,
    allowEmpty: true,
    allowEmptyString: undefined,
    allowEmptyArray: undefined,
    childMessage: true,
    message: `Not A Duck: Input failed to follow specifications`,
};

export function initializeOptions(obj) {
    for (const property in obj) {
        DEFAULTOPTIONS[property] = obj[property];
    }
}