import { Observer } from "./Observer";
export declare abstract class AbstractSubject {
    private observers;
    attach(observer: Observer<AbstractSubject>): void;
    detach(observer: Observer<AbstractSubject>): void;
    protected notify(): void;
}
