import type { PropType as VuePropType } from "vue";

export declare global {
  // define global types

  type AnyFn = (...args: any[]) => any;
  export interface AnyObject {
    [key: string]: unknown;
  }
  type Awaitable<T> = Promise<T> | T;
  type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never;
  type PromisifyFn<T extends AnyFn> = (
    ...args: ArgumentsType<T>
  ) => Promise<ReturnType<T>>;

  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };
  type Recordable<T = any> = Record<string, T>;
  type Nullable<T> = T | null;
  interface ReadonlyRecordable<T = any> {
    readonly [key: string]: T;
  }
  /**
   * `NoInfer` type is used to prevent inference of generic types.
   * It is a conditional type that prevents TypeScript from automatically inferring
   * the type of a generic parameter.
   *
   * For example, when `NoInfer` is applied to a generic type `T`, it will ensure
   * that `T` is not inferred and maintains its exact type.
   *
   * Usage:
   *
   * ```
   * function foo<T>(arg: T) {
   *   const value: NoInfer<T> = arg;
   *   // ...
   * }
   * ```
   */
  type NoInfer<T> = [T][T extends any ? 0 : never];

  // vue
  type PropType<T> = VuePropType<T>;
}
