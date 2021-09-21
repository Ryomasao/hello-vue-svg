<template>
  <div class="container">
    <ShapePanel />
    <Canvas :nodes="nodes" @add="onAddNode" @remove="onRemoveNode" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ShapeType, CONNECTOR_TYPE } from '@/models'
import Canvas from './components/Canvas.vue'
import ShapePanel from './components/ShapePanel/ShapePanel.vue'

type FactoryParam = { shapeType: ShapeType; x: number; y: number }
const shapeFactory = (params: FactoryParam) => {
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

const connectorFactory = (params?: any) => {
  return {
    id: Date.now(),
    type: CONNECTOR_TYPE.POLYLINE,
    x: 100,
    y: 100,
    leftNode: null,
    rightNode: null
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
    nodes: [connectorFactory()]
  }),

  methods: {
    onAddNode(payload: FactoryParam) {
      this.nodes.push(shapeFactory(payload))
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
