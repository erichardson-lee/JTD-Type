/** Returns the string keys of an object */
export type SKeys<T> = Extract<keyof T, string>;
