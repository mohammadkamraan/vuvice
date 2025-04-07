import { type Observer } from "./Observer";
export interface Subject<T> {
    attach(observer: Observer<T>): void;
    detach(observer: Observer<T>): void;
    notify(): void;
}
