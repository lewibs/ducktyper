import {makeDuck as md, duckfaults as ud} from "./functions/ducker";
import ANY from "./enums/Any";

export const makeDuck = md;
export const updateDefaults = ud;
export const Any = ANY;

const Duck = {
    updateDefaults,
    duckfaults,
    Any,
}

export default Duck;