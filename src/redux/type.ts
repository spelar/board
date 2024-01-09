import { store } from "./index";

export type RootState = ReturnType<typeof store.getState>;

/* Custom MappedType */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SliceActions<T, P = any> = {
  [K in keyof T]: T[K] extends (...args: P[]) => infer A ? A : never;
}[keyof T];

export type UserAction = "close" | "confirm";
