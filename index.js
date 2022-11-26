import {makeDuck as md, duckfaults as ud} from "./functions/ducker";
import { Any as ANY } from "./functions/Any";

export const makeDuck = md;
export const duckfaults = ud;
export const Any = ANY;

export const isString = duckfaults(makeDuck(String), {
    message: "Not a string",
});

export const isNumber = duckfaults(makeDuck(Number), {
    message: "Not a number",
});

export const isObject = duckfaults(makeDuck(Object), {
    message: "Not a object",
});

export const isBoolean = duckfaults(makeDuck(Boolean), {
    message: "Not a boolean",
});

export const isArray = duckfaults(makeDuck(Array), {
    message: "Not an array",
})

const Duck = {
    duckfaults,
    makeDuck,
    Any,
}

export default Duck;