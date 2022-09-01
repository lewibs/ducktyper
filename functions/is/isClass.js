export default function isClass(val) {
    return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
}