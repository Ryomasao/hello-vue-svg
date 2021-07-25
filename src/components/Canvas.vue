<template>
  <div class="container">
    <Rect />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Rect from './Rect.vue'

export default defineComponent({
  name: 'Canvas',
  components: {
    Rect
  }
})
</script>

<style lang="scss">
.container {
  width: 1200px;
  height: 800px;
  background: gray;
}
</style>
