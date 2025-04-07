export interface Observer<T> {
  update(subject: T): void;
}
