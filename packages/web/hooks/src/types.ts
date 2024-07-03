export type BasicStateAction<S> = ((state: S) => S) | S;
export type Dispatch<A> = (action: A) => void;
