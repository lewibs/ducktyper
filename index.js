import {makeDuck as md, duckfaults as ud} from "./functions/ducker";
import { Any as ANY } from "./functions/Any";

export const makeDuck = md;
export const updateDefaults = ud;
export const Any = ANY;

const Duck = {
    updateDefaults,
    makeDuck,
    Any,
}

export default Duck;