import { type Subject } from "./Subject";
import { type Observer } from "./Observer";

export type ObserverCallback<T> = (value: T) => void;
type ObserverUpdaterCallback<T> = (value: T) => T;

export class BehaviorSubject<T> implements Subject<T> {
  private _value!: T;
  private observers: (Observer<T> | ObserverCallback<T>)[] = [];

  constructor(value: T) {
    this.next(value);
  }

  public attach(observer: Observer<T> | ObserverCallback<T>): void {
    this.observers.push(observer);
  }

  public detach(observer: Observer<T> | ObserverCallback<T>): void {
    this.observers = this.observers.filter((observerItem) => {
      return observerItem !== observer;
    });
  }

  public notify(): void {
    for (const observer of this.observers) {
      if (typeof observer === "function") {
        observer(this._value);
      } else {
        observer.update(this._value);
      }
    }
  }

  public next(newValue: T | ObserverUpdaterCallback<T>) {
    if (typeof newValue === 'function') {
      this._value = (newValue as ObserverUpdaterCallback<T>)(this._value);
    } else {
      this._value = newValue;
    }
    this.notify();
  }

  public getValue() {
    return this._value;
  }
}
