export default function isDuckToBool(isDuck) {
    return function chainedIsDuck(obj) {
        return isDuck(obj, {throw:false});
    }
}