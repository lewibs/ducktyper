//mainly to maintain state of default objects
export default function mergeObjects(...args) {
    const obj = {};
    Object.assign(obj, ...args);
    return obj;
}