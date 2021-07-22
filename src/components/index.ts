import type { App } from 'vue'
import CodeInput from './CodeInput'

CodeInput.install = (app: App) => {
  app.component(CodeInput)
}

export default CodeInput
