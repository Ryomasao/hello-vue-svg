import { ref, watch } from 'vue'

// composition学習のため、下記を参考に自分で書く
// https://github.com/pikax/vue-composable/blob/master/packages/vue-composable/src/event/onOutsidePress.ts
const useClickOutside = (el: any, onClickOutside: (e: MouseEvent) => void) => {
  const element = ref<Element | null>(el)

  const handler = (e: MouseEvent) =>
    element.value &&
    !element.value.contains(e.target as Node) &&
    onClickOutside(e)

  watch(element, (newEl, _, onInvalidate) => {
    if (newEl) {
      document.addEventListener('click', handler, true)
    }
    onInvalidate(() => {
      document.removeEventListener('click', handler)
    })
  })
}

export default useClickOutside
