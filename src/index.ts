import { makeDuck, duckfaults } from "./functions/ducker";

export * from "./functions/ducker";
export * from "./functions/Any";
export * from "./functions/duckorate";
export * from "./functions/settings";
export * from "./classes/duckdto";
export * from "./functions/trimDuck";

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

export const isFunction = duckfaults(makeDuck(Function), {
    message: "Not a function",
});