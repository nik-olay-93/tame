export type PlainObject<T> = {
  [P in keyof T]: T[P] extends Date ? string : T[P];
};
