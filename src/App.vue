<template>
  <div class="container">
    <ShapePanel @add="onAddShape" />
    <Canvas :shapes="shapes" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Canvas from './components/Canvas.vue'
import ShapePanel from './components/ShapePanel/ShapePanel.vue'

const factory = () => {
  return {
    id: Date.now(),
    type: 'rectangle',
    x: 0,
    y: 0,
    width: 50,
    height: 50
  }
}

type Data = {
  shapes: any[]
}

export default defineComponent({
  name: 'App',

  components: {
    ShapePanel,
    Canvas
  },

  data: (): Data => ({
    shapes: [factory()]
  }),

  methods: {
    onAddShape() {
      this.shapes.push(factory())
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: grid;
  grid-template-columns: 200px 1fr;
}
</style>
