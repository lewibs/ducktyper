import sortDucks from "./sortDucks";
import makeDuckValidator from "./makeDuckValidator";
import mergeObjects from "./mergeObjects";
import isObject from "./is/isObject";

const DEFAULTOPTIONS = {
    throw: false,
    allowUndefined: false,
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
    return function isDuck(obj, options={}) {
        options = mergeObjects(DEFAULTOPTIONS, options);

        //return true if undefined is allowed and its undefined
        if (options.allowUndefined) {
            if (obj === undefined || obj === null) {
                return true;
            }
        }

        try {
            if (validators.map(v=>v(obj, {throw: options.throw})).reduce((a,b)=>a&&b, true)) {
                return true
            } else {
                throw new Error(options.message);
            }
        } catch (e) {
            if (options.throw) {
                throw e;
            } else {
                return false;
            }
        }
    }
}

export function duckfaults(duck, options) {
    if (!isObject(options)) {
        throw new Error("options must be an object");
    }

    let updated = mergeObjects(DEFAULTOPTIONS, options);
    return function isDuck(obj, options) {
        return duck(obj, mergeObjects(updated, options));
    }
}