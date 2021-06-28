import { defineComponent, reactive, ref, toRaw } from 'vue'
import './code-input.scss'

export default defineComponent({
  name: 'CodeInput',
  setup() {
    // copy code
    const pasteCode = ref([])
    const values = reactive([...Array(6, 1, 3, 4, 8, 3)])

    console.log(toRaw(pasteCode))
    console.log(toRaw(values))

    const onChange = (event) => {
      // console.log(event.target);
    }

    const keyDown = (event: KeyboardEvent) => {
      const index = +event.target.dataset.index
      const el = event.target
      const keyName = event.key

      switch (keyName) {
        case 'Backspace':
          const value = el.value
          !value && moveCursorToPrevious(el)
          break
        case 'Delete':
          console.log(keyName)
          break
        case 'Home':
          el.parentElement.children[0] && el.parentElement.children[0].focus()
          break
        case 'End':
          el.parentElement.children[5] && el.parentElement.children[5].focus()
          break
        case 'ArrowLeft':
          moveCursorToPrevious(el)
          break
        case 'ArrowRight':
          moveCursorToNext(el)
          break
        case 'ArrowUp':
          console.log(keyName)
          break
        case 'ArrowDown':
          console.log(keyName)
          break
        default:
          break
      }
    }

    const moveCursorToPrevious = (el) => {
      if (!!el.previousElementSibling) {
        el.previousElementSibling.focus()
        return true
      }
      return false
    }

    const moveCursorToNext = (el) => {
      if (!!el.nextElementSibling) {
        el.nextElementSibling.focus()
        return true
      }
      return false
    }

    return { values, onChange, keyDown }
  },
  render() {
    const { values, onChange, keyDown } = this

    return <div class="ink-code-input">
      <div className="ink-code-input-content" onInput={onChange} onKeydown={keyDown}>
        {
          [...Array(6)].map((item, index) => {
            return <input max="9" min="0" maxlength="1" data-index={index} type="tel" value={values[index]} />
          })
        }
      </div>
    </div>
  }
})
