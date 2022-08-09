import { DUCK } from "../ducker";
import Duck from "../../classes/Duck";

export default function isDuck(val) {
    if (typeof val === 'function' && val.name === DUCK) {
        return true;
    }

    if (val instanceof Duck) {
        return true;
    }

    return false;
}