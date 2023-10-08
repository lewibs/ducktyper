import isPrimitive from "./is/isPrimative";
import isArray from "./is/isArray";
import isDuck from "./is/isDuck";
import isObject from "./is/isObject";   
import isEmptyArray from "./is/isEmptyArray";
import isFunction from "./is/isFunction";
import { DuckDto } from "../classes/duckdto";
import { dtoToIsDuck } from "./duckorate";
import { isPrimativeConstructor } from "./is/isPrimativeConstructor";
import { isAny } from "./is/isAny";

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
export default function makeDuckValidator(val) {
    if (val.prototype instanceof DuckDto) {
        //the user passed in a DuckDto and we want to check it using an isDuck
        return dtoToIsDuck(val);
    } else if (isAny(val)) {
        return val;
    } else if (isArray(val)) { 
        //[]
        return makeArrayValidator(val);
    } else if (isObject(val)) { 
        //{}
        return makeObjectValidator(val);
    } else if (isPrimitive(val)) { 
        //user wants to be strict
        return makePrimativeValidator(val);
    } else if (isDuck(val)) {
        //user is merging types
        return val;
    } else if (isPrimativeConstructor(val)) {
        //validating based on type... not sure if this works for enums need to check
        return makeTypeValidator(val);
    } else if (isFunction(val)) {
        //user passed in a custom function to validate with
        return makeFunctionValidator(val);
    } else {
       throw new Error("Not a supported value");
    }
}

//in the case a primative is passed in. It is assumed that it has said param
export function makePrimativeValidator(prim) {
    return function primativeValidator(check, options?) {
        return prim === check;
    };
}

export function makeArrayValidator(arr) {
    //[type] validate that all the values are of that type
    //[type type] validate that each of those values exist and are correct... this can be any number of args
    const validators = (arr.length === 1) 
        ? makeDuckValidator(arr[0])
        : arr.map(makeDuckValidator);

    return function arrayValidator(check, options?) {
        if (isEmptyArray(check)) { //this is to allow for am empty array to be accepted if it is not a structued arr
            if (validators instanceof Array === false) { //if it is an unstructured arr meaning there is only one validator
                if (options) {
                    if (options.allowEmptyArray !== undefined) {
                        return options.allowEmptyArray;
                    } else if (options.allowEmpty !== undefined) {
                        return options.allowEmpty;
                    }
                } 
                return true;
            } else { //it is a structured arr and cant be empty
                return false;
            }
        } else {
            return checkArray(check, validators, options);
        }
    }
}

//helperMakeArrayValidator helper
function checkArray(check, validators, options?) {
    if (isArray(check)) {
        let length = check.length;
        
        if (isArray(validators)) {
            length = validators.length;
        }

        for (let i = 0; i < length; i++) {
            if (handleValidators(validators, check, i, options) === false) {
                return false;
            }
        }
        return true
    }
    return false;
}

//check array helper
function handleValidators(validators, values, i, options?) {
    if (isArray(validators)) {
        return validators[i](values[i], options);
    } else {
        return validators(values[i], options);
    }
}

export function makeObjectValidator(obj) {
    const entries = Object.entries(obj);
    const validators = entries.map((entry, i)=>{
        entry[1] = makeDuckValidator(entry[1]);
        return entry;
    });

    return function objectValidator(check, options?) {
        let field;
        let validator;

        if (isObject(check) === false) {
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
    }
}

export function makeFunctionValidator(val) {
    return function functionValidator(check) {
        if (check instanceof val) {
            return true;
        } else {
            return val(check);
        }
    }
}

export function makeTypeValidator(val) {
    return function typeValidator(check, options?) {
        if (options && check === "") {
            if (options.allowEmptyString !== undefined) {
                return options.allowEmptyString;
            } else if (options.allowEmpty !== undefined) {
                return options.allowEmpty;
            } else {
                return true;
            }
        }

        return typeof check === val.name.toLowerCase();
    }
}