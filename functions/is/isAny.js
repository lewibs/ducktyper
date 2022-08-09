import {ANY} from "../../enums/Any";

export default function isAny(val) {
    if (val === ANY) {
        return true;
    }
    return false;
}