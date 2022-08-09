import { Vue, reactive, markRaw, watch } from 'vue'

export default {
  install: (app) => {
    let stack = reactive([])
    let eventListenerAdded = false;

    const show = (component, attributes = {on: {}, props: {}}) => {
      if (! attributes?.on) {
        attributes.on = {};
      }

      const overlay = {
        key: Math.random().toString(36).substring(2),
        component: markRaw(component),
        ...attributes
      }

      stack.push(overlay)

      if (stack.length > 0) {
        document.body.style.overflow = 'hidden'

        if (document.body.scrollHeight > window.innerHeight) {
          document.body.style.paddingRight = '17px'
        }
      }
    }

    const hide = () => {
      stack.splice(stack.length - 1, 1)

      if (stack.length === 0) {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
    }

    const hideAll = () => stack.length = 0;

    const onKeydown = (event) => {
      if (stack.length && event.key === 'Escape') {
        hide()
      }
    }

    watch(stack, (newValue) => {
      if (newValue.length === 0) {
        document.removeEventListener('keydown', onKeydown)
        eventListenerAdded = false
      } else if (! eventListenerAdded) {
        document.addEventListener('keydown', onKeydown)
        eventListenerAdded = true
      }
    })

    Vue.prototype.$dialog = {
      stack,
      show,
      hide,
      hideAll,
    }
  }
}