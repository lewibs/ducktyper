import isBoolean from "./isBoolean";
import isFunction from "./isFunction";
import isObject from "./isObject";
import isString from "./isString";

function isMethodDescriptor(obj) {
    return(
        isObject(obj)
        && isFunction(obj.value)
        && isBoolean(obj.writable)
        && isBoolean(obj.enumerable)
        && isBoolean(obj.configurable)
    );
}

export default function isMethodDecorator(fieldsArr) {
    return (
        isObject(fieldsArr[0])
        && isString(fieldsArr[1])
        && isMethodDescriptor(fieldsArr[2])
    );
}