"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.duckfaults = exports.makeDuck = exports.DUCK = void 0;
const sortDucks_1 = __importDefault(require("./sortDucks"));
const makeDuckValidator_1 = __importDefault(require("./makeDuckValidator"));
const mergeObjects_1 = __importDefault(require("./mergeObjects"));
const isObject_1 = __importDefault(require("./is/isObject"));
const settings_1 = require("./settings");
exports.DUCK = "isDuck";
//should the user pass in input name? or can it be collected from else where?
function makeDuck(...args) {
    if (args.length === 0 || args === undefined) {
        throw new Error("no arguments passed into ducker unable to make type");
    }
    const [isDucks, ducks] = (0, sortDucks_1.default)(args);
    const validators = isDucks.concat(ducks.map(makeDuckValidator_1.default));
    //never rename this
    function isDuck(obj, options) {
        options = (0, mergeObjects_1.default)(settings_1.ISDUCK_OPTIONS, options || {});
        //dumb edge case that should be refactored so that it does not exist up here.
        if (options.allowUndefined === false && (obj === undefined || obj === null)) {
            if (options.throw) {
                throw new Error(options.message);
            }
            else {
                return false;
            }
        }
        else if (options.allowUndefined === true && (obj === undefined || obj === null)) {
            return true;
        }
        try {
            //for some reason this throws a bug with the default values.
            if (validators.map(v => v(obj, {
                throw: options.throw,
                allowEmpty: options.allowEmpty,
                allowEmptyString: options.allowEmptyString,
                allowEmptyArray: options.allowEmptyArray,
            })).reduce((a, b) => a && b, true)) {
                return true;
            }
            else {
                throw new Error(options.message);
            }
        }
        catch (e) {
            if (options.throw) {
                //return child message false then we return parent
                if (options.childMessage === false) {
                    throw new Error(options.message);
                }
                //if not a duck was given as a child throw we want to return the parent message
                if (e.message === settings_1.ISDUCK_OPTIONS.message) {
                    throw new Error(options.message);
                }
                throw e;
            }
            else {
                return false;
            }
        }
    }
    return isDuck;
}
exports.makeDuck = makeDuck;
function duckfaults(duck, options) {
    if (!(0, isObject_1.default)(options)) {
        throw new Error("options must be an object");
    }
    let updated = (0, mergeObjects_1.default)(settings_1.ISDUCK_OPTIONS, options);
    //never rename this
    return function isDuck(obj, options) {
        return duck(obj, (0, mergeObjects_1.default)(updated, options));
    };
}
exports.duckfaults = duckfaults;
