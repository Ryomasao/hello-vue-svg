<template>
  <div class="container">
    <ShapePanel />
    <Canvas :nodes="nodes" @add="onAddNode" @remove="onRemoveNode" />
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
    onAddNode(payload: FactoryParam) {
      this.nodes.push(factory(payload))
    },
    // TODO Node型定義
    onRemoveNode(payload: any) {
      // immutableとmutableをaddNodeとで揃えたほうがいいかも
      this.nodes = this.nodes.filter((node) => node.id !== payload.id)
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
