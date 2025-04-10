import type { BehaviorSubject } from '../BehaviorSubject'
import { useUiSync } from './UseUiSync'

export function UiSync<V = unknown, T = unknown>(propertyToWatch: string, valueGetter: (value: V) => T) {
  return function UiSyncDecorator(
    _target: unknown,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const reactiveValue = useUiSync()
    function reactiveCaller(componentId: string) {
      reactiveValue.setObserver(this![propertyToWatch] as BehaviorSubject<unknown>)
      reactiveValue.attach(componentId)
      const isSubscribed = reactiveValue.updaters.has(componentId)
      return {
        value: isSubscribed ? valueGetter(reactiveValue.getValue.value as V): valueGetter(this![propertyToWatch].getValue()),
        unSubscribe: reactiveValue.detach
      }
    }
    descriptor.value = reactiveCaller
  }
}
