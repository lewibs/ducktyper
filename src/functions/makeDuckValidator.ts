import isPrimitive from "./is/isPrimative";
import isArray from "./is/isArray";
import isDuck from "./is/isDuck";
import isObject from "./is/isObject";   
import isEmptyArray from "./is/isEmptyArray";
import isClass from "./is/isClass";
import isFunction from "./is/isFunction";
import isPrimativeConstructor from "./is/isPrimativeConstructor";
import { DuckDto } from "../classes/duckdto";
import { dtoToIsDuck } from "./duckorate";

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
        console.log("dto to is duck");
        //the user passed in a DuckDto and we want to check it using an isDuck
        return dtoToIsDuck(val);
    } else if (isArray(val)) { 
        //[]
        console.log("array validator");
        return makeArrayValidator(val);
    } else if (isObject(val)) { 
        //{}
        console.log("object validator");
        return makeObjectValidator(val);
    } else if (isPrimitive(val)) { 
        //user wants to be strict
        console.log("primative validator");
        return makePrimativeValidator(val);
    } else if (isDuck(val)) {
        //user is merging types
        console.log("is duck validator");
        return val;
    } else if (!isPrimativeConstructor(val) && isClass(val)) {
        console.log("class validator");
        return makeClassValidator(val);
    } else if (isFunction(val)) {
        //user passed in a custom function to validate with
        console.log("function validator");
        return val;
    } else {
        //made it to the bottom. its not more complex then this... i hope
        //these are the generic constructors
        //everything here is a function
        //which makes me question how this will react to functions passed in like ()=>{} since its not
        console.log("type validator");
        return makeTypeValidator(val);
    }
}

function makeIsDuckValidator(isDuck?) {
    //for naming reasons
    function duckValidator(check, options?) {
        return isDuck(check, options);
    }

    duckValidator.isDuck = true;
    return duckValidator;
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

export function makeClassValidator(val) {
    return function classValidator(check) {
        return check instanceof val;
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