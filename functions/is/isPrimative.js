export default function isPrimitive(test) {
    return test !== Object(test);
}