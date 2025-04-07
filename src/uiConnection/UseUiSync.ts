import { computed, ref } from 'vue'
import type { BehaviorSubject, ObserverCallback } from '../BehaviorSubject'
import type { Nullable } from '../types'

const subscribedComponentIds = new Set<string>()
const updaters = new Map<string, ObserverCallback<unknown>>()
export function useUiSync() {
  const value = ref<unknown>()
  let observer: Nullable<BehaviorSubject<unknown>> = null

  function setObserver(observerToSet: BehaviorSubject<unknown>) {
    observer = observerToSet
  }

  const getValue = computed<unknown>(() => {
    return value.value as unknown
  })

  function attach(componentId: string) {
    if (!subscribedComponentIds.has(componentId)) {
      function updateValue(newValue: unknown): void {
        value.value = newValue
      }
      updaters.set(componentId, updateValue)
      observer?.attach(updateValue)
    }
    subscribedComponentIds.add(componentId)
  }

  function detach(componentId: string) {
    const updater = updaters.get(componentId)
    if (updater) {
      observer?.detach(updater)
      updaters.delete(componentId)
    }
  }

  return {
    getValue,
    attach,
    detach,
    setObserver,
    updaters
  }
}
