<template>
  <div class="input-box">
    <div class="input-content" @keydown="keydown" @keyup="keyup" @paste="paste" @mousewheel="mousewheel"
        @input="inputEvent">
      <input max="9" min="0" maxlength="1" data-index="0" v-model.trim.number="input[0]" type="number"
          ref="firstinput"/>
      <input max="9" min="0" maxlength="1" data-index="1" v-model.trim.number="input[1]" type="number"/>
      <input max="9" min="0" maxlength="1" data-index="2" v-model.trim.number="input[2]" type="number"/>
      <input max="9" min="0" maxlength="1" data-index="3" v-model.trim.number="input[3]" type="number"/>
      <input max="9" min="0" maxlength="1" data-index="4" v-model.trim.number="input[4]" type="number"/>
      <input max="9" min="0" maxlength="1" data-index="5" v-model.trim.number="input[5]" type="number"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 存放粘贴进来的数字
      pasteResult: []
    }
  },
  props: ['code'],
  computed: {
    input() {
      // code 是父组件传进来的默认值，必须是6位长度的数组，这里就不再做容错判断处理
      // 最后空数组是默认值
      return this.code || this.pasteResult.length === 6 ? this.pasteResult : ['', '', '', '', '', '']
    }
  },
  methods: {
    // 解决一个输入框输入多个字符
    inputEvent(e) {
      const index = e.target.dataset.index * 1
      const el = e.target
      this.$set(this.input, index, el.value.slice(0, 1))
    },
    keydown(e) {
      let index = e.target.dataset.index * 1
      const el = e.target
      if (e.key === 'Backspace') {
        if (this.input[index].length > 0) {
          this.$set(this.input, index, '')
        } else {
          if (el.previousElementSibling) {
            el.previousElementSibling.focus()
            this.$set(this.input, index - 1, '')
          }
        }
      } else if (e.key === 'Delete') {
        if (this.input[index].length > 0) {
          this.$set(this.input, index, '')
        } else {
          if (el.nextElementSibling) {
            this.$set(this.input, index = 1, '')
          }
        }
        if (el.nextElementSibling) {
          el.nextElementSibling.focus()
        }
      } else if (e.key === 'Home') {
        el.parentElement.children[0] && el.parentElement.children[0].focus()
      } else if (e.key === 'End') {
        el.parentElement.children[this.input.length - 1] && el.parentElement.children[this.input.length - 1].focus()
      } else if (e.key === 'ArrowLeft') {
        if (el.previousElementSibling) {
          el.previousElementSibling.focus()
        }
      } else if (e.key === 'ArrowRight') {
        if (el.nextElementSibling) {
          el.nextElementSibling.focus()
        }
      } else if (e.key === 'ArrowUp') {
        if (this.input[index] * 1 < 9) {
          this.$set(this.input, index, (this.input[index] * 1 + 1).toString())
        }
      } else if (e.key === 'ArrowDown') {
        if (this.input[index] * 1 > 0) {
          this.$set(this.input, index, (this.input[index] * 1 - 1).toString())
        }
      }
    },
    keyup(e) {
      const index = e.target.dataset.index * 1
      const el = e.target
      if (/Digit|Numpad/i.test(e.code)) {
        this.$set(this.input, index, e.code.replace(/Digit|Numpad/i, ''))
        el.nextElementSibling && el.nextElementSibling.focus()
        if (index === 5) {
          if (this.input.join('').length === 6) {
            document.activeElement.blur()
            this.$emit('complete', this.input)
          }
        }
      } else {
        if (this.input[index] === '') {
          this.$set(this.input, index, '')
        }
      }
    },
    mousewheel(e) {
      const index = e.target.dataset.index
      if (e.wheelDelta > 0) {
        if (this.input[index] * 1 < 9) {
          this.$set(this.input, index, (this.input[index] * 1 + 1).toString())
        }
      } else if (e.wheelDelta < 0) {
        if (this.input[index] * 1 > 0) {
          this.$set(this.input, index, (this.input[index] * 1 - 1).toString())
        }
      } else if (e.key === 'Enter') {
        if (this.input.join('').length === 6) {
          document.activeElement.blur()
          this.$emit('complete', this.input)
        }
      }
    },
    paste(e) {
      // 当进行粘贴时
      e.clipboardData.items[0].getAsString(str => {
        if (str.toString().length === 6) {
          this.pasteResult = str.split('')
          document.activeElement.blur()
          this.$emit('complete', this.input)
        }
      })
    }
  },
  mounted() {
    // 等待dom渲染完成，在执行focus,否则无法获取到焦点
    this.$nextTick(() => {
      this.$refs.firstinput.focus()
    })
  }
}
</script>

<style lang="scss">
  .input-box {
    .input-content {
      width: 512px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      input {
        color: inherit;
        font-family: inherit;
        border: 0;
        outline: 0;
        border-bottom: 1px solid #919191;
        height: 60px;
        width: 60px;
        font-size: 44px;
        text-align: center;
      }
    }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        appearance: none;
        margin: 0;
      }

  }
</style>
