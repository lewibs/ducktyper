import {makeDuck as md, updateDefaults as ud} from "./functions/ducker";
import ANY from "./enums/Any";

export const makeDuck = md;
export const updateDefaults = ud;
export const Any = ANY;

export default {
    makeDuck: md,
    updateDefaults: ud,
    Any: ANY,
};


/*
unresolved questions:
what if a function is passed in as a type? since that should be a primative but its not...

how are enums handled

allow for class Duck too
*/