import { Any, ANY } from "../../classes/Any";

export default function isAny(val) {
    if (val instanceof Any) {
        return true;
    }

    if (val === ANY) {
        return true;
    }

    return false;
}