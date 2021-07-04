<template>
  <CodeInput />
  <br />
  <CodeInput2 />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CodeInput2 from "./components/CodeInput";
import { CodeInput } from "../dist/lib/index";

export default defineComponent({
  name: "App",
  components: {
    CodeInput,
    CodeInput2,
  },
});
</script>
