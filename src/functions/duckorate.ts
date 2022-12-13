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
    options = mergeObjects(ISDUCK_OPTIONS, DUCKORATE_OPTIONS, options || {});

    if (options.type === DuckTypes.class) {
        return makeClassDuckorator(duck, options);
    // } else if (options.type === DuckTypes.method) {
    //     throw new Error("Bad decorator type");
    // } else if (options.type === DuckTypes.accessor) {
    //     throw new Error("Bad decorator type");
    } else if (options.type === DuckTypes.property) {
        return makePropertyDuckorator(duck, options);
    } else if (options.type === DuckTypes.parameter) {
        throw new Error("Bad decorator type");
    }

    throw new Error("Bad decorator type");
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