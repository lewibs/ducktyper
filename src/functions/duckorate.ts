import mergeObjects from "./mergeObjects";
import { DUCKORATE_OPTIONS, ISDUCK_OPTIONS } from "./settings";

export enum DuckTypes {
    class="class",
    method="method",
    accessor="accessor",
    property="property",
    parameter="parameter",
};

export function duckorate(duck, options?): Function {
    options = mergeObjects(ISDUCK_OPTIONS, DUCKORATE_OPTIONS, options || {});

    if (options.type === DuckTypes.class) {
        return function classDuckorator<T extends {new(...args: any[]): {}}>(constr: T){
            return class extends constr {
                constructor(...args: any[]) {
                    super(...args);
                    duck(this, {throw:true});
                }
            }
        }
    } else if (options.type === DuckTypes.method) {
        throw new Error("Bad decorator type");
    } else if (options.type === DuckTypes.accessor) {
        throw new Error("Bad decorator type");
    } else if (options.type === DuckTypes.property) {
        throw new Error("Bad decorator type");
    } else if (options.type === DuckTypes.parameter) {
        return function parameterDuckorator() {

        }
    }

    throw new Error("Bad decorator type");
}
