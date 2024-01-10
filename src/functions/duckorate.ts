import mergeObjects from "./mergeObjects";
import "reflect-metadata";
import { CLASIFYDUCK_OPTIONS } from "./settings";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate, validateSync } from 'class-validator';
import { DuckDto } from "../classes/duckdto";
import isObject from "./is/isObject";

export function dtoToIsDuck(ADuckDto) {
    if (ADuckDto.prototype instanceof DuckDto) {
        function isDuck(val, options?) {
            let obj = new ADuckDto();
            if ( //if object
                typeof val === 'object' &&
                !Array.isArray(val) &&
                val !== null &&
                isObject(val)
            ) { //initialize and test
                obj = Object.assign(obj, val);
                return classifyDuck(obj, options);
            } else { //fail
                return classifyDuck(obj, {
                    ...options,
                });
            }
        }

        isDuck.isDuck = true;

        return isDuck;
    } else {
        throw new Error("Must be an instance of DuckDto to be turned into isDuck");
    }
}

export function classifyDuck(dto, options?) {
    options = mergeObjects(CLASIFYDUCK_OPTIONS, options || {});

    if (options.forceDuck && !(dto instanceof DuckDto)) {
        throw new Error("Must be an instance of DuckDto to be clasified");
    }

    try {
        //change dto to {} when it is undefined since {} and undefined are basically the same in this case
        var [err]:any = validateSync(dto || {});
        if (err && err.constraints) {
            err = err.constraints.customText
        }
    } catch (e) {
        var err = e.message;
    }

    if (err && options.throw) {
        if (options.message) {
            throw new Error(options.message);
        } else {
            throw new Error(err);
        }
    }

    return err ? false : true;
}

export function duckorate(duck, options?) {
    const duckDecorator = makePropertyDuckorator(duck, options);

    return function combinedDecorator(target: any, key: string): void {
        duckDecorator(target, key);
        initializeToNull(target, key);
    };
}

function makePropertyDuckorator(duck, options?) {
    options = options || {}

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
            return options.message || error.message;
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

function initializeToNull(target: any, key: string) {
    const privateFieldName = `_${key}`;

    Object.defineProperty(target, key, {
        get() {
            return this[privateFieldName];
        },
        set(value) {
            this[privateFieldName] = value;
        },
        enumerable: true,
        configurable: true,
    });

    // Set the initial value to null during class instantiation
    target[key] = null;
}