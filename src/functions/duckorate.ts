import mergeObjects from "./mergeObjects";
import { DUCKORATE_OPTIONS, ISDUCK_OPTIONS } from "./settings";

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
    return function propertyDuckorator(target: Object, propertyKey: string) {
        let value : string;
        Object.defineProperty(target, propertyKey, {
            get: ()=>value,
            set: (val)=>{
                duck(val, options);
                value = val;
            },
        });
    }
}

function makeClassDuckorator(duck, options?) {
    return function classDuckorator<T extends {new(...args: any[]): {}}>(constr: T){
        return class extends constr {
            constructor(...args: any[]) {
                super(...args);
                duck(this, options)
            }
        }
    }
}