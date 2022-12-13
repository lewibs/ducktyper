import isArray from "./isArray";

export function isEmptyArray(check) {
    return isArray(check) && check.length === 0;
}

export default isEmptyArray;