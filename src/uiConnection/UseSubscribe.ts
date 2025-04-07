import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import type { BehaviorSubject } from '../BehaviorSubject'

export function useSubscribe<T>(observer: BehaviorSubject<T>) {
  const value = ref<T>(observer.getValue())

  function updateValue(newValue: T) {
    value.value = newValue
  }

  const getValue = computed<T>(() => {
    return value.value
  })


  onBeforeMount(() => {
    observer.attach(updateValue)
  })

  onBeforeUnmount(() => {
    observer.detach(updateValue)
  })

  return {
    getValue,
  }
}
