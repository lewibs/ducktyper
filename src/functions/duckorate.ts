import { duckfaults } from "./ducker";
import mergeObjects from "./mergeObjects";
import { DEFAULTOPTIONS } from "./settings";

export enum DuckTypes {
    class="class",
    method="method",
    accessor="accessor",
    property="property",
    parameter="parameter",
    default="default",
};

export function duckorator(duck, options?) {
    options = mergeObjects(DEFAULTOPTIONS, options || {});

    if (options.type === DuckTypes.class) {
        
    } else if (options.type === DuckTypes.method) {

    } else if (options.type === DuckTypes.accessor) {

    } else if (options.type === DuckTypes.property) {

    } else if (options.type === DuckTypes.parameter) {

    } else if (options.type === DuckTypes.default) {
        return duckfaults(duck, options);
    }
}
