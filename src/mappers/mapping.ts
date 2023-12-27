export type MapperFunction<T, U> = (source: T) => U;

export function mapProperties<T extends object, U>(source: T, mapper: MapperFunction<any, any>): U {
    const keys = Object.keys(source);
    const result: any = {};
    for (const key of keys) {
        const value = source[key as keyof T];
        result[key] = mapper(value);
    }
    return result as U;
};