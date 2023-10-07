export default function isDuck(val) {
    if (typeof val === 'function' && val.isDuck) {
        return true;
    }

    return false;
}