<template>
  <svg xmlns="http://www.w3.org/2000/svg" class="container">
    <Rect v-for="shape in shapes" :key="shape.id" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Rect from './Rect.vue'

export default defineComponent({
  name: 'Canvas',

  props: {
    shapes: {
      type: Array,
      default: () => []
    }
  },

  components: {
    Rect
  }
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: gray;
}
</style>
