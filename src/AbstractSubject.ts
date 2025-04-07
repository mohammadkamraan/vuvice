import { Observer } from "./Observer";

export abstract class AbstractSubject {
  private observers: Observer<AbstractSubject>[] = [];

  public attach(observer: Observer<AbstractSubject>) {
    this.observers.push(observer);
  }

  public detach(observer: Observer<AbstractSubject>) {
    this.observers = this.observers.filter(
      (observerItem) => observerItem !== observer,
    );
  }

  protected notify() {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}
