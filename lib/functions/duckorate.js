"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.duckorate = exports.classifyDuck = void 0;
const mergeObjects_1 = __importDefault(require("./mergeObjects"));
require("reflect-metadata");
const settings_1 = require("./settings");
const class_validator_1 = require("class-validator");
function classifyDuck(dto, options) {
    options = (0, mergeObjects_1.default)(settings_1.CLASIFYDUCK_OPTIONS, options || {});
    const [err] = (0, class_validator_1.validateSync)(dto, { stopAtFirstError: true });
    if (options.throw) {
        if (options.message) {
            throw new Error(options.message);
        }
        else if (err.constraints) {
            throw new Error(err.constraints.customText);
        }
        else {
            throw new Error(settings_1.ISDUCK_OPTIONS.message);
        }
    }
    return err ? false : true;
}
exports.classifyDuck = classifyDuck;
function duckorate(duck, options) {
    options = (0, mergeObjects_1.default)(settings_1.ISDUCK_OPTIONS, options || {});
    return makePropertyDuckorator(duck, options);
}
exports.duckorate = duckorate;
function makePropertyDuckorator(duck, options) {
    options = (0, mergeObjects_1.default)(settings_1.ISDUCK_OPTIONS, options || {});
    let DuckValidation = class DuckValidation {
        validate(val, args) {
            return duck(val, Object.assign(Object.assign({}, options), { throw: false }));
        }
        defaultMessage(args) {
            try {
                duck(undefined, {
                    allowUndefined: false,
                    throw: true,
                });
            }
            catch (error) {
                return error.message;
            }
        }
    };
    DuckValidation = __decorate([
        (0, class_validator_1.ValidatorConstraint)({ name: 'customText', async: false })
    ], DuckValidation);
    return (0, class_validator_1.Validate)(DuckValidation);
}
