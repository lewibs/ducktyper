import sortDucks from "./sortDucks";
import makeDuckValidator from "./makeDuckValidator";
import mergeObjects from "./mergeObjects";
import isObject from "./is/isObject";
import { ISDUCK_OPTIONS } from "./settings";

//should the user pass in input name? or can it be collected from else where?
export function makeDuck(...args) {
    if (args.length === 0 || args === undefined) {
        throw new Error("no arguments passed into ducker unable to make type");
    }

    const [isDucks, ducks] = sortDucks(args);
    const validators = isDucks.concat(ducks.map(makeDuckValidator));

    //never rename this
    function isDuck(obj, options?: any) {
        options = mergeObjects(ISDUCK_OPTIONS, options || {});

        console.log(obj);
        console.log(options);

        //dumb edge case that should be refactored so that it does not exist up here.
        if (options.allowUndefined === false && (obj === undefined || obj === null)) {
            if (options.throw) {
                console.log("throwing since undefied not allowed");
                throw new Error(options.message)
            } else {
                return false;
            }
        } else if (options.allowUndefined === true && (obj === undefined || obj === null)) {
            return true;
        }

        try {
            //for some reason this throws a bug with the default values.
            const valid = validators.map(validator=>{
                console.log("validating.");
                return validator(obj, {
                    throw: options.throw, //for getting specifc error message if they are set
                    allowEmpty: options.allowEmpty,
                    allowEmptyString: options.allowEmptyString,
                    allowEmptyArray: options.allowEmptyArray,
                });
            }).every((results)=>results===true);

            if (valid === false) {
                console.error("throw");
                throw new Error(options.message);
            }

            return true;

        } catch (e:any) {
            if (options.throw) {
                //return child message false then we return parent
                if (options.childMessage === false) {
                    console.error("throw");
                    throw new Error(options.message);
                }

                //if the parent throw would have more description
                // if (e.message === ISDUCK_OPTIONS.message) {
                //     throw new Error(options.message);
                // }
                console.error("throw");
                throw e;
            } else {
                return false;
            }
        }
    }
    isDuck.isDuck = true;

    return isDuck;
}

export function duckfaults(duck, options?) {
    if (!isObject(options)) {
        throw new Error("options must be an object");
    }

    let updated = mergeObjects(ISDUCK_OPTIONS, options);
    //never rename this
    function isDuck(obj, options?) {
        return duck(obj, mergeObjects(updated, options));
    }
    isDuck.isDuck = true;

    return isDuck;
}