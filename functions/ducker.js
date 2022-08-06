import sortDucks from "./sortDucks";
import filterReducer from "./filterReducer";
import makeDuckValidator from "./makeDuckValidator";
import mergeObjects from "./mergeObjects";
import isDuckToBool from "./is/isDuckToBool";

const DEFAULTOPTIONS = {
    throw: true,
    allowUndefiend: false,
    error: `Not A Duck: Input failed to follow specifications`,
};

//should the user pass in input name? or can it be collected from else where?
export function ducker(...args) {
    if (args.length === 0) {
        throw new Error("no arguments passed into ducker unable to make type");
    }


    const [isDucks, ducks] = sortDucks(args);
    const validators = isDucks.map(isDuckToBool).concat(ducks.map(makeDuckValidator));

    //never rename this
    return function isDuck(obj, options={}) {
        //format input
        if (!options instanceof Boolean) {
            options = mergeObjects(DEFAULTOPTIONS, options);
        }

        //the higher up the check the more likely it is to get reached.
        //if the value is determined good it stops checking and continues
        let isDuck;
        isDuck = allGoodCarryOnSir(isDuck, ()=>checkUndefined(obj, options));
        isDuck = allGoodCarryOnSir(isDuck, ()=>checkValidators(obj, validators));
        return handleResponce(isDuck, options);
    }
}

//if its true then we dont change
function allGoodCarryOnSir(bool, func) {
    return (bool) ? true : func();
}

function checkUndefined(obj, options) {
    if (options.allowUndefiend === true) {
        if (obj === undefined || obj === null) {
            return true;
        }
    }

    return false
}

function checkValidators(obj, validators) {
    return validators.reduce(filterReducer)(obj);
}

function handleResponce(bool, options) {
    if (options === false || options.throw === false) {
        return bool;
    } else {
        throw new Error(options.error);
    }
}

export default ducker