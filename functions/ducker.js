import sortDucks from "./sortDucks";
import makeDuckValidator from "./makeDuckValidator";
import mergeObjects from "./mergeObjects";
import isObject from "./is/isObject";
import isClassDecorator from "./is/isClassDecorator";
import isMethodDecorator from "./is/isMethodDecorator";
import isFieldDecorator from "./is/isFieldDecorator";
import isDuckValidator from "./is/isDuck";

const DEFAULTOPTIONS = {
    throw: false,
    allowUndefined: false,
    allowEmpty: true,
    allowEmptyString: undefined,
    allowEmptyArray: undefined,
    childMessage: true,
    message: `Not A Duck: Input failed to follow specifications`,
};

export const DUCK = "isDuck";

//should the user pass in input name? or can it be collected from else where?
export function makeDuck(...args) {
    if (args.length === 0 || args === undefined) {
        throw new Error("no arguments passed into ducker unable to make type");
    }

    const [isDucks, ducks] = sortDucks(args);
    const validators = isDucks.concat(ducks.map(makeDuckValidator));

    //never rename this
    function isDuck(obj, options={}) {
        options = mergeObjects(DEFAULTOPTIONS, options);

        //return true if undefined is allowed and its undefined
        if (options.allowUndefined) {
            if (obj === undefined || obj === null) {
                return true;
            }
        }

        try {
            //for some reason this throws a bug with the default values.
            if (validators.map(v=>v(obj, {
                throw: options.throw, //for getting specifc error message if they are set
                allowEmpty: options.allowEmpty,
                allowEmptyString: options.allowEmptyString,
                allowEmptyArray: options.allowEmptyArray,

            })).reduce((a,b)=>a&&b, true)) {
                return true
            } else {
                throw new Error(options.message);
            }
        } catch (e) {
            if (options.throw) {
                //return child message false then we return parent
                if (options.childMessage === false) {
                    throw new Error(options.message);
                }

                //if not a duck was given as a child throw we want to return the parent message
                if (e.message === DEFAULTOPTIONS.message) {
                    throw new Error(options.message);
                }
                
                throw e;
            } else {
                return false;
            }
        }
    }

    return duckerator(isDuck);
}

export function duckfaults(duck, options) {
    if (!isObject(options)) {
        throw new Error("options must be an object");
    }

    let updated = mergeObjects(DEFAULTOPTIONS, options);
    //never rename this
    return function isDuck(obj, options) {
        return duck(obj, mergeObjects(updated, options));
    }
}

export function duckerator(duck) {
    // //never rename this
    return function isDuck(...fields) {
        if (isFieldDecorator(fields)) {
            let val;
            return {
                set: function (value) {
                    duck(value, {
                        throw: true,
                    });
                    val = value;
                },
                get: function() {
                    return val;
                },
                enumerable: true,
                configurable: true,
            }
        } else if (isMethodDecorator(fields)) {
            throw new Error("Using a duck as a method decorator is not yet supported");
        } else if (isClassDecorator(fields) && !isDuckValidator(fields[0])) { //second check is for an odd edge case
            throw new Error("Using a duck as a class decorator is not yet supported");
        } else { //pass into is duck
            return duck(...fields);
        }
    }
}