import isClass from "./isClass";

export default function isFunction(val) {
    return typeof val == "function" && !isClass(val);
}