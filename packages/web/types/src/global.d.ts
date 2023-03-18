import type { PropType as VuePropType } from "vue";

export declare global {
  // define global
  const __VITE_USE_MOCK__: boolean;

   type DeepPartial<T> = {
     [P in keyof T]?: DeepPartial<T[P]>;
   };
   type Recordable<T = any> = Record<string, T>;
   type Nullable<T> = T | null;
   interface ReadonlyRecordable<T = any> {
     readonly [key: string]: T;
   }
  // vue
  type PropType<T> = VuePropType<T>;

}
