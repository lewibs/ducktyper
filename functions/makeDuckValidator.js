import isPrimitive from "./is/isPrimative";
import isArray from "./is/isArray";
import isDuck from "./is/isDuck";
import isObject from "./is/isObject";
import isAny from "./is/isAny";

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
    if (isObject(val)) { 
        //{} probably the most common
        return makeObjectValidator(val);
    } else if (isArray(val)) { 
        //[]
        return makeArrayValidator(val);
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

function makeIsDuckValidator(isDuck) {
    //for naming reasons
    return function duckValidator(check) {
        return isDuck(check);
    }
}

//in the case a primative is passed in. It is assumed that is an enum or something;
function makePrimativeValidator(prim) {
    return function primativeValidator(check) {
        return prim === check;
    };
}

function makeArrayValidator(arr) {
    //[type] validate that all the values are of that type
    //[type type] validate that each of those values exist and are correct... this can be any number of args
    if (arr.length === 1) {
        const validator = makeDuckValidator(arr[0]);

        return function arrayValidator(check) {
            if (isArray(check)) {
                for (let i = 0; i < check.length; i++) {
                    if (validator(check[i]) === false) {
                        return false;
                    }
                }
                return true;
            }
            return false
        }
    } else {
        const validators = arr.map(makeDuckValidator);

        //goes through the check and checks it against the validators. it only checks vals that have a matching validator
        return function structuredArrayValidator(check) {
            if (isArray(check)) {
                for (let i = 0; i < validators.length; i++) {
                    if (validators[i](check[i]) === false) {
                        return false;
                    }
                }
                return true
            }
            return false;
        }
    }

}

function makeObjectValidator(obj) {

}

function makeTypeValidator(val) {

}