import isPrimitive from "./is/isPrimative";
import isArray from "./is/isArray";
import isDuck from "./is/isDuck";
import isObject from "./is/isObject";
import isAny from "./is/isAny";
import isEmptyArray from "./is/isEmptyArray";
import isUndefined from "./is/isUndefined";

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

//designed to be used recursively
export default function makeDuckValidator(val) {
    if (isArray(val)) { 
        //[]
        return makeArrayValidator(val);
    } else if (isObject(val)) { 
        //{}
        return makeObjectValidator(val);
    } else if (isPrimitive(val) && !isAny(val)) { 
        //user wants to be strict
        return makePrimativeValidator(val);
    } else if (isDuck(val)) { 
        //user is merging types
        return makeIsDuckValidator(val);
    } else { 
        //made it to the bottom. its not more complex then this... i hope
        //these are the generic constructors
        //everything here is a function
        //which makes me question how this will react to functions passed in like ()=>{} since its not
        return makeTypeValidator(val);
    }
}

export function makeIsDuckValidator(isDuck) {
    //for naming reasons
    return function duckValidator(check) {
        return isDuck(check);
    }
}

//in the case a primative is passed in. It is assumed that it has said param
export function makePrimativeValidator(prim) {
    return function primativeValidator(check) {
        return prim === check;
    };
}

export function makeArrayValidator(arr) {
    //[type] validate that all the values are of that type
    //[type type] validate that each of those values exist and are correct... this can be any number of args
    if (arr.length === 1) {
        const validator = makeDuckValidator(arr[0]);
        return helperMakeArrayValidator(validator);
    } else {
        const validators = arr.map(makeDuckValidator);
        return helperMakeArrayValidator(validators);
    }
}

//make array validator helper
function helperMakeArrayValidator(validators) {
    return function arrayValidator(check) {
        if (isEmptyArray(check)) {
            return true;
        } else {
            return checkArray(check, validators);
        }
    }
}

//helperMakeArrayValidator helper
function checkArray(check, validators) {
    if (isArray(check)) {
        let length = check.length;
        
        if (isArray(validators)) {
            length = validators.length;
        }

        for (let i = 0; i < length; i++) {
            if (handleValidators(validators, check, i) === false) {
                return false;
            }
        }
        return true
    }
    return false;
}

//check array helper
function handleValidators(validators, values, i) {
    if (isArray(validators)) {
        return validators[i](values[i]);
    } else {
        return validators(values[i])
    }
}

export function makeObjectValidator(obj) {
    const entries = Object.entries(obj);
    const validators = entries.map((entry, i)=>{
        entry[1] = makeDuckValidator(entry[1]);
        return entry;
    });

    return function objectValidator(check) {
        let field = undefined;
        let validator;

        if (isObject(check) === false) {
            return false;
        }

        for (let i = 0; i < validators.length; i++) {
            field = validators[i][0];
            validator = validators[i][1];

            if (check[field]) {
                if (validator(check[field]) === false) {
                    return false;
                }
            } else {
                return false;
            }
        }

        return true;
    }
}

export function makeTypeValidator(val) {
    return function typeValidator(check) {
        //val is a function so we can get the name and switch to lower
        return typeof check === val.name.toLowerCase();
    }
}