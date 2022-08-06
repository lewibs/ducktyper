import ducker from "./functions/ducker";
import any from "./classes/Any";

//custom types
export const DUCK = "isDuck";

export const Any = any;
export const ducktyper = ducker;

export default ducktyper;


/*
unresolved questions:
what if a function is passed in as a type? since that should be a primative but its not...
*/