import type { BehaviorSubject } from '../BehaviorSubject';
export declare function useSubscribe<T>(observer: BehaviorSubject<T>): {
    getValue: import("vue").ComputedRef<T>;
};
