import isBoolean from "./isBoolean";
import isFunction from "./isFunction";
import isObject from "./isObject";
import isString from "./isString";

function isFieldDescriptor(obj) {
    console.log(obj);
    console.log(isObject(obj));
    console.log(typeof obj.initializer);
    console.log(isFunction(obj.initializer));
    console.log(isBoolean(obj.writable));
    console.log(isBoolean(obj.enumerable));
    console.log(isBoolean(obj.configurable));

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