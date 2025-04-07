import { getCurrentInstance } from 'vue'

export function useComponentId() {
  const currentComponentInstance = getCurrentInstance()
  const componentUniqId = currentComponentInstance?.uid.toString();
  return {
    uuId: componentUniqId as string,
  }
}
