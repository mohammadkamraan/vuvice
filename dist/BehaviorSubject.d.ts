import { type Subject } from "./Subject";
import { type Observer } from "./Observer";
export type ObserverCallback<T> = (value: T) => void;
type ObserverUpdaterCallback<T> = (value: T) => T;
export declare class BehaviorSubject<T> implements Subject<T> {
    private _value;
    private observers;
    constructor(value: T);
    attach(observer: Observer<T> | ObserverCallback<T>): void;
    detach(observer: Observer<T> | ObserverCallback<T>): void;
    notify(): void;
    next(newValue: T | ObserverUpdaterCallback<T>): void;
    getValue(): T;
}
export {};
