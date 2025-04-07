export interface UiConnection<T> {
    value: T;
    unSubscribe?: (componentId: string) => void;
}
