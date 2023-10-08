const primitiveTypes = [Number, String, Boolean, Symbol];

export function isPrimativeConstructor(val) {
    return primitiveTypes.includes(val);
}