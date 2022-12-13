import isClass from "./isClass";
export default function isClassDecorator(fieldArr) {
    return isClass(fieldArr[0]) && fieldArr[1] === undefined && fieldArr[2] === undefined;
}