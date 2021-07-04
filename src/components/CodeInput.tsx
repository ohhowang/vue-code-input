import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRaw,
  h,
} from "vue";
import "./code-input.scss";

export default defineComponent({
  name: "CodeInput",
  setup() {
    // copy code
    const pasteCode = ref([]);
    const values = reactive([...Array(6)]);

    // onInput event
    // @ts-ignore
    const onChange = (event) => {
      const el = event.target;
      if (!!el.value) {
        try {
          const value = parseInt(el.value);
          if (value >= 0 && value <= 9) {
            moveCursorToNext(el);
          } else {
            throw Error("请输入0-9的数字");
          }
        } catch (error) {
          el.value = "";
        }
      }
    };

    // onFocus event
    // @ts-ignore
    const onFocus = (event) => {
      const el = event.value;
    };

    // keyboard event
    // @ts-ignore
    const keyDown = (event) => {
      const index = +event.target.dataset.index;
      const el = event.target;
      const keyName = event.key;

      switch (keyName) {
        case "Backspace":
          const value = el.value;
          !value && moveCursorToPrevious(el);
          break;
        case "Delete":
          // console.log(keyName);
          break;
        case "Home":
          el.parentElement.children[0] && el.parentElement.children[0].focus();
          break;
        case "End":
          el.parentElement.children[5] && el.parentElement.children[5].focus();
          break;
        case "ArrowLeft":
          moveCursorToPrevious(el);
          break;
        case "ArrowRight":
          moveCursorToNext(el);
          break;
        case "ArrowUp":
          if (!!el.value) {
            if (el.value < 9 && el.value >= 0) {
              el.value = Number(el.value) + 1;
            }
          } else if (el.value === "") {
            el.value = 0;
          }
          break;
        case "ArrowDown":
          if (!!el.value) {
            if (el.value <= 9 && el.value > 0) {
              el.value = Number(el.value) - 1;
            }
          } else if (el.value === "") {
            el.value = 9;
          }
          break;
        default:
          break;
      }
    };

    // move to next input
    // @ts-ignore
    const moveCursorToPrevious = (el) => {
      if (!!el.previousElementSibling) {
        el.previousElementSibling.focus();
        return true;
      }
      return false;
    };

    // move to previous input
    // @ts-ignore
    const moveCursorToNext = (el) => {
      if (!!el.nextElementSibling) {
        el.nextElementSibling.focus();
        return true;
      }
      return false;
    };

    // input ref, auto focus when index equal 0
    // @ts-ignore
    const inputRef = (el) => {
      const index = +el.dataset.index;
      if (index === 0) {
        nextTick(() => {
          el.focus();
        });
      }
    };

    return { values, onChange, onFocus, keyDown, inputRef };
  },
  render() {
    const { values, onChange, onFocus, keyDown, inputRef } = this;

    return (
      <div class="ink-code-input">
        <div
          className="ink-code-input-content"
          onInput={onChange}
          onFocus={onFocus}
          onKeydown={keyDown}
        >
          {[...Array(values.length)].map((item, index) => {
            return (
              <input
                max="9"
                min="0"
                maxlength="1"
                data-index={index}
                autocomplete="off"
                type="tel"
                value={values[index]}
                ref={inputRef}
              />
            );
          })}
        </div>
      </div>
    );
  },
});
