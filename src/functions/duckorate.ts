import mergeObjects from "./mergeObjects";
import "reflect-metadata";
import { CLASIFYDUCK_OPTIONS, ISDUCK_OPTIONS } from "./settings";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate, validateSync } from 'class-validator';

export function clasifyDuck(dto, options?) {
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