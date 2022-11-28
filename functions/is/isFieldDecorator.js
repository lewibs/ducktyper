import isBoolean from "./isBoolean";
import isFunction from "./isFunction";
import isObject from "./isObject";
import isString from "./isString";

function isFieldDescriptor(obj) {
    return (
        isObject(obj)
        && isFunction(obj.initializer)
        && isBoolean(obj.writable)
        && isBoolean(obj.enumerable)
        && isBoolean(obj.configurable)
    );
}

export default function isFieldDecorator(fieldsArr) {
    return (
        isObject(fieldsArr[0])
        && isString(fieldsArr[1])
        && isFieldDescriptor(fieldsArr[2])
    );
}