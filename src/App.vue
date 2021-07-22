<template>
  <CodeInput2 @complete="onComplete" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CodeInput2 from './components/CodeInput'

export default defineComponent({
  name: 'App',
  components: { CodeInput2 },
  setup() {
    const onComplete = (value: string) => {
      console.log(value)
    }

    return { onComplete }
  }
})
</script>
