export declare function UiSync<V = unknown, T = unknown>(propertyToWatch: string, valueGetter: (value: V) => T): (_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor) => void;
