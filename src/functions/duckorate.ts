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

    let err;
    try {
        [err] = validateSync(dto, {stopAtFirstError:true});
        if (err.constraints) {
            err = err.constraints.customText
        }
    } catch (e) {
        err = e.message;
    }

    console.warn(err.message);

    if (options.throw) {
        if (options.message) {
            throw new Error(options.message);
        } else {
            throw new Error(err);
        }
    }

    return err ? false : true;
}

export function duckorate(duck, options?): Function {
    return makePropertyDuckorator(duck, options);
}

function makePropertyDuckorator(duck, options?) {
    options = options || {}

    @ValidatorConstraint({ name: 'customText', async: false })
    class DuckValidation implements ValidatorConstraintInterface {
      validate(val:any, args: ValidationArguments) {
        throw new Error("kjsajlsfhjdjfklsjlkfdsjklasdfjlkfdsjlk");
        return duck(val, {
            ...options,
            throw: true,
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

    //this is used to protect the user from adding duckorator to a non DuckDto class 
    return function forceDuckDto(target, name) {
        if (target instanceof DuckDto) {
            return Validate(DuckValidation)(target, name);
        } else {
            throw new Error("Duckorator must be used in a class that extends DuckDto");
        }
    }
}