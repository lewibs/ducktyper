import { DUCK } from "../ducker";

export default function isDuck(val) {
    if (typeof val === 'function' && val.name === DUCK) {
        return true;
    }

    return false;
}