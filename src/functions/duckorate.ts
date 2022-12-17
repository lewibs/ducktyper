import mergeObjects from "./mergeObjects";
import "reflect-metadata";
import { DUCKORATE_OPTIONS, ISDUCK_OPTIONS } from "./settings";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate } from 'class-validator';


export enum DuckTypes {
    class="class",
    //method="method",
    //accessor="accessor",
    property="property",
    parameter="parameter",
};

export function duckorate(duck, options?): Function {
    options = mergeObjects(DUCKORATE_OPTIONS, options || {});

    if (options.type === DuckTypes.class) {
        return makeClassDuckorator(duck, options);
    // } else if (options.type === DuckTypes.method) {
    //     throw new Error("Bad decorator type");
    // } else if (options.type === DuckTypes.accessor) {
    //     throw new Error("Bad decorator type");
    } else if (options.type === DuckTypes.property) {
        return makePropertyDuckorator(duck, options);
    } else if (options.type === DuckTypes.parameter) {
        return makeParameterDuckorator(duck, options);
    }

    throw new Error("Bad decorator type");
}

function makeParameterDuckorator(duck, options?) {
    return function parameterDuckorator(target: Object, propertyKey: string | symbol, parameterIndex: number) {
        console.warn("As of duckorate does not support parameters, however in the near future it will");
    }
}

function makePropertyDuckorator(duck, options?) {
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
            console.log("throwing duck");
            duck(undefined, {
                allowUndefined: false,
                throw: true,
            });
            console.log("did not throw duck");
        } catch (error) {
            return error.message;
        }
      }
    }

    return Validate(DuckValidation);
}

function makeClassDuckorator(duck, options?) {
    console.warn("As of duckorate does not support classes, however in the near future it will");
    return function classDuckorator<T extends {new(...args: any[]): {}}>(constr: T){
        return class extends constr {
            constructor(...args: any[]) {
                super(...args);
                duck(this, options)
            }
        }
    }
}