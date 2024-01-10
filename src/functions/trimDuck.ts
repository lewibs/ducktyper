export function trimDuck<T>(object: Record<string, unknown>, Dto: { new (): T }): T {
    const dtoInstance = new Dto();
    const defaultDto = dtoInstance as Record<string, unknown>;
    const trimmedObject = new Dto();


    for (const key in defaultDto) {
        if (key in object) {
            trimmedObject[key] = object[key] as T[keyof T];
        }
    }

    return trimmedObject;
}
