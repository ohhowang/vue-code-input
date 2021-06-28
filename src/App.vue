<template>
  <code-input />
  <br>
  <br>
  <br>
  <code-input1 />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CodeInput from './components/CodeInput.vue'
import CodeInput1 from './components/CodeInput'

export default defineComponent({
  name: 'App',
  components: { CodeInput, CodeInput1 }
})
</script>
