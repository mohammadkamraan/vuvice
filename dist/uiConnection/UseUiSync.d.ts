import type { BehaviorSubject, ObserverCallback } from '../BehaviorSubject';
export declare function useUiSync(): {
    getValue: import("vue").ComputedRef<unknown>;
    attach: (componentId: string) => void;
    detach: (componentId: string) => void;
    setObserver: (observerToSet: BehaviorSubject<unknown>) => void;
    updaters: Map<string, ObserverCallback<unknown>>;
};
