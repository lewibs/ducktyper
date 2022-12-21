import mergeObjects from "./mergeObjects";
import "reflect-metadata";
import { CLASIFYDUCK_OPTIONS, ISDUCK_OPTIONS } from "./settings";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate, validateSync } from 'class-validator';
import { DuckDto } from "../classes/duckdto";
import isObject from "./is/isObject";

export function dtoToIsDuck(ADuckDto) {
    if (ADuckDto.prototype instanceof DuckDto) {
        return function isDuck(val, options?) {
            if ( //if object
                typeof val === 'object' &&
                !Array.isArray(val) &&
                val !== null &&
                isObject(val)
            ) { //initialize and test
                let obj = new ADuckDto();
                obj = Object.assign(obj, val);

                return classifyDuck(obj, options);
            } else { //fail
                return classifyDuck({}, {
                    ...options,
                    allowUndefined: false,
                });
            }
        }
    } else {
        throw new Error("Must be an instance of DuckDto to be turned into isDuck");
    }
}

export function classifyDuck(dto, options?) {
    options = mergeObjects(CLASIFYDUCK_OPTIONS, options || {});
    const [err] = validateSync(dto, {stopAtFirstError:true});
   
    if (options.throw) {
        if (options.message) {
            throw new Error(options.message);
        } else if (err.constraints) {
            throw new Error(err.constraints.customText);
        } else {
            throw new Error(ISDUCK_OPTIONS.message);
        }
    }

    return err ? false : true;
}

export function duckorate(duck, options?): Function {
    options = mergeObjects(ISDUCK_OPTIONS, options || {});
    return makePropertyDuckorator(duck, options);
}

function makePropertyDuckorator(duck, options?) {
    options = mergeObjects(ISDUCK_OPTIONS, options || {});

    @ValidatorConstraint({ name: 'customText', async: false })
    class DuckValidation implements ValidatorConstraintInterface {
      validate(val:any, args: ValidationArguments) {
        return duck(val, {
            ...options,
            throw: false,
        });
      }
    
      defaultMessage(args: ValidationArguments) {
        try {
            duck(undefined, {
                allowUndefined: false,
                throw: true,
            });
        } catch (error) {
            return error.message;
        }
      }
    }

    return Validate(DuckValidation);
}