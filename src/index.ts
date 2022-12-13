import { makeDuck, duckfaults } from "./functions/ducker";

export * from "./functions/ducker";
export * from "./functions/Any";
export * from "./functions/duckorate";
export * from "./functions/settings";

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
});