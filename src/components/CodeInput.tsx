import { defineComponent, nextTick, onMounted, reactive, ref, toRefs, h, watch } from 'vue'
import './code-input.scss'

const props = {
  length: {
    type: Number,
    default: 6
  }
}

export default defineComponent({
  name: 'CodeInput',
  emits: ['change', 'complete'],
  props,
  setup(props, { emit }) {
    const { length } = props
    // copy code
    const pasteCode = ref([])
    const state = reactive({
      values: []
    })

    watch(state.values, () => {
      if (state.values.length === length) {
        const value = state.values.join().replaceAll(',', '')
        emit('complete', value)
      }
    })

    // onInput event
    // @ts-ignore
    const onChange = (event) => {
      const el = event.target
      const index = +el.dataset.index
      if (!!el.value) {
        try {
          const value = parseInt(el.value)
          if (value >= 0 && value <= 9) {
            state.values[index] = value
            moveCursorToNext(el)
          } else {
            throw Error('请输入0-9的数字')
          }
        } catch (error) {
          el.value = ''
        }
      }
    }

    // onFocus event
    // @ts-ignore
    const onFocus = (event) => {}

    // keyboard event
    // @ts-ignore
    const keyDown = (event) => {
      const index = +event.target.dataset.index
      const el = event.target
      const keyName = event.key

      switch (keyName) {
        case 'Backspace':
          // eslint-disable-next-line no-case-declarations
          const value = el.value
          !value && moveCursorToPrevious(el)
          break
        case 'Delete':
          // console.log(keyName);
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
          if (!!el.value) {
            if (el.value < 9 && el.value >= 0) {
              el.value = Number(el.value) + 1
            }
          } else if (el.value === '') {
            el.value = 0
          }
          break
        case 'ArrowDown':
          if (!!el.value) {
            if (el.value <= 9 && el.value > 0) {
              el.value = Number(el.value) - 1
            }
          } else if (el.value === '') {
            el.value = 9
          }
          break
        default:
          break
      }
    }

    // move to next input
    // @ts-ignore
    const moveCursorToPrevious = (el) => {
      if (!!el.previousElementSibling) {
        el.previousElementSibling.focus()
        return true
      }
      return false
    }

    // move to previous input
    // @ts-ignore
    const moveCursorToNext = (el) => {
      if (!!el.nextElementSibling) {
        el.nextElementSibling.focus()
        return true
      }
      return false
    }

    const inputRef = ref(null)
    onMounted(() => {
      // input ref, auto focus when index equal 0
      const { value } = inputRef
      value.focus()
    })

    return { ...state, onChange, onFocus, keyDown, inputRef }
  },
  render() {
    const { length, values, onChange, onFocus, keyDown } = this

    return (
      <div class="i-code-input">
        <div
          className="i-code-input-content"
          onInput={onChange}
          onFocus={onFocus}
          onKeydown={keyDown}
        >
          {[...Array(length)].map((item, index) => {
            return (
              <input
                max="9"
                min="0"
                maxlength="1"
                data-index={index}
                autocomplete="off"
                type="tel"
                value={values[index]}
                ref={index === 0 ? 'inputRef' : ''}
              />
            )
          })}
        </div>
      </div>
    )
  }
})
