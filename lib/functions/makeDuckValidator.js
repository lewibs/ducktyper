"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTypeValidator = exports.makeClassValidator = exports.makeObjectValidator = exports.makeArrayValidator = exports.makePrimativeValidator = exports.makeIsDuckValidator = void 0;
const isPrimative_1 = __importDefault(require("./is/isPrimative"));
const isArray_1 = __importDefault(require("./is/isArray"));
const isDuck_1 = __importDefault(require("./is/isDuck"));
const isObject_1 = __importDefault(require("./is/isObject"));
const isEmptyArray_1 = __importDefault(require("./is/isEmptyArray"));
const isClass_1 = __importDefault(require("./is/isClass"));
const isFunction_1 = __importDefault(require("./is/isFunction"));
const isPrimativeConstructor_1 = __importDefault(require("./is/isPrimativeConstructor"));
//accepts https://developer.mozilla.org/en-US/docs/Glossary/Primitive
//string
//number
//bigint
//boolean
//undefined
//symbol
//null
//val can be anything
//it can be a primitive
//an array
//or an object
//custom additions
//any
//cutom validation function
//designed to be used recursively
function makeDuckValidator(val) {
    if ((0, isArray_1.default)(val)) {
        //[]
        return makeArrayValidator(val);
    }
    else if ((0, isObject_1.default)(val)) {
        //{}
        return makeObjectValidator(val);
    }
    else if ((0, isPrimative_1.default)(val)) {
        //user wants to be strict
        return makePrimativeValidator(val);
    }
    else if ((0, isDuck_1.default)(val)) {
        //user is merging types
        return val;
    }
    else if (!(0, isPrimativeConstructor_1.default)(val) && (0, isClass_1.default)(val)) {
        return makeClassValidator(val);
    }
    else if ((0, isFunction_1.default)(val)) {
        //user passed in a custom function to validate with
        return val;
    }
    else {
        //made it to the bottom. its not more complex then this... i hope
        //these are the generic constructors
        //everything here is a function
        //which makes me question how this will react to functions passed in like ()=>{} since its not
        return makeTypeValidator(val);
    }
}
exports.default = makeDuckValidator;
function makeIsDuckValidator(isDuck) {
    //for naming reasons
    return function duckValidator(check, options) {
        return isDuck(check, options);
    };
}
exports.makeIsDuckValidator = makeIsDuckValidator;
//in the case a primative is passed in. It is assumed that it has said param
function makePrimativeValidator(prim) {
    return function primativeValidator(check, options) {
        return prim === check;
    };
}
exports.makePrimativeValidator = makePrimativeValidator;
function makeArrayValidator(arr) {
    //[type] validate that all the values are of that type
    //[type type] validate that each of those values exist and are correct... this can be any number of args
    const validators = (arr.length === 1)
        ? makeDuckValidator(arr[0])
        : arr.map(makeDuckValidator);
    return function arrayValidator(check, options) {
        if ((0, isEmptyArray_1.default)(check)) { //this is to allow for am empty array to be accepted if it is not a structued arr
            if (validators instanceof Array === false) { //if it is an unstructured arr meaning there is only one validator
                if (options) {
                    if (options.allowEmptyArray !== undefined) {
                        return options.allowEmptyArray;
                    }
                    else if (options.allowEmpty !== undefined) {
                        return options.allowEmpty;
                    }
                }
                return true;
            }
            else { //it is a structured arr and cant be empty
                return false;
            }
        }
        else {
            return checkArray(check, validators, options);
        }
    };
}
exports.makeArrayValidator = makeArrayValidator;
//helperMakeArrayValidator helper
function checkArray(check, validators, options) {
    if ((0, isArray_1.default)(check)) {
        let length = check.length;
        if ((0, isArray_1.default)(validators)) {
            length = validators.length;
        }
        for (let i = 0; i < length; i++) {
            if (handleValidators(validators, check, i, options) === false) {
                return false;
            }
        }
        return true;
    }
    return false;
}
//check array helper
function handleValidators(validators, values, i, options) {
    if ((0, isArray_1.default)(validators)) {
        return validators[i](values[i], options);
    }
    else {
        return validators(values[i], options);
    }
}
function makeObjectValidator(obj) {
    const entries = Object.entries(obj);
    const validators = entries.map((entry, i) => {
        entry[1] = makeDuckValidator(entry[1]);
        return entry;
    });
    return function objectValidator(check, options) {
        let field = undefined;
        let validator;
        if ((0, isObject_1.default)(check) === false) {
            return false;
        }
        for (let i = 0; i < validators.length; i++) {
            field = validators[i][0];
            validator = validators[i][1];
            if (validator(check[field], options) === false) {
                return false;
            }
        }
        return true;
    };
}
exports.makeObjectValidator = makeObjectValidator;
function makeClassValidator(val) {
    return function classValidator(check) {
        return check instanceof val;
    };
}
exports.makeClassValidator = makeClassValidator;
function makeTypeValidator(val) {
    return function typeValidator(check, options) {
        if (options && check === "") {
            if (options.allowEmptyString !== undefined) {
                return options.allowEmptyString;
            }
            else if (options.allowEmpty !== undefined) {
                return options.allowEmpty;
            }
            else {
                return true;
            }
        }
        return typeof check === val.name.toLowerCase();
    };
}
exports.makeTypeValidator = makeTypeValidator;
