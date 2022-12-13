import isArray from "./isArray";

export default function isObject(val) {
    if (isArray(val)) return false;
    return typeof val === "object";
}