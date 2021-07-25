<template>
  <Canvas />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Canvas from './components/Canvas.vue'

export default defineComponent({
  name: 'App',
  components: {
    Canvas
  }
})
</script>

<style></style>
