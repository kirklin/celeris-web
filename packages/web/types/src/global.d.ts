declare global {
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };
  declare type Recordable<T = any> = Record<string, T>;
  declare type Nullable<T> = T | null;
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };
}
