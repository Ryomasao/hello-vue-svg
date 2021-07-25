<template>
  <div class="container">
    <svg xmlns="http://www.w3.org/2000/svg">
      <rect
        :x="rect.x"
        :y="rect.y"
        width="30"
        height="30"
        stroke="black"
        fill="#fff"
        stroke-width="2"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Canvas',
  data: () => ({
    rect: {
      x: 0,
      y: 0
    }
  })
})
</script>

<style lang="scss">
.container {
  width: 1200px;
  height: 800px;
  background: gray;
}
</style>
