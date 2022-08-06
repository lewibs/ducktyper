import { DUCK } from "../../index";

export default function isDuck(val) {
    if (typeof val === 'function' && val.name === DUCK) {
        return true;
    }

    return false;
}