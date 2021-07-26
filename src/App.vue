<template>
  <div class="container">
    <ShapePanel />
    <Canvas :nodes="nodes" @add="onAddShape" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ShapeType } from '@/models'
import Canvas from './components/Canvas.vue'
import ShapePanel from './components/ShapePanel/ShapePanel.vue'

type FactoryParam = { shapeType: ShapeType; x: number; y: number }
const factory = (params: FactoryParam) => {
  return {
    id: Date.now(),
    type: params.shapeType,
    x: params.x,
    y: params.y,
    width: 50,
    height: 50,
    prevNode: null,
    nextNode: null
  }
}

type Data = {
  nodes: any[]
}

export default defineComponent({
  name: 'App',

  components: {
    ShapePanel,
    Canvas
  },

  data: (): Data => ({
    nodes: []
  }),

  methods: {
    onAddShape(payload: FactoryParam) {
      this.nodes.push(factory(payload))
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
