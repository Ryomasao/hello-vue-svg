<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="container"
    @dragover="onDragOver"
    @drop="onDrop"
  >
    <component
      :is="COMPONENTS[node.type]"
      v-for="node in nodes"
      :key="node.id"
      :id="node.id"
      :x="node.x"
      :y="node.y"
      @remove="onRemoveNode(node)"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ShapeType } from '@/models'
import Rect from './Rect.vue'
import Circle from './Circle.vue'
import Polyline from './Polyline.vue'

export default defineComponent({
  name: 'Canvas',

  props: {
    nodes: {
      type: Array,
      default: () => []
    }
  },

  components: {
    Rect,
    Circle,
    Polyline
  },

  emits: ['add', 'remove'],

  computed: {
    //shape()
    //{
    //  return this.nodes.filter(node => node.type !== ShapeType.POL)
    //},
    /**
     * node.typeとコンポーネントのMap
     */
    COMPONENTS() {
      return {
        RECTANGLE: Rect,
        CIRCLE: Circle,
        POLYLINE: Polyline
      }
    }
  },

  methods: {
    /**
     * ドラッグ項目が有効なドロップ対象にドラッグされた場合、数百ミリ秒ごとに
     */
    onDragOver(e: DragEvent) {
      // 必須っぽい
      e.preventDefault()
    },
    /**
     * shapeが有効なドロップ対象にドロップされた場合
     */
    onDrop(e: DragEvent) {
      // 必須っぽい
      e.preventDefault()
      if (e.dataTransfer) {
        const shapeType = e.dataTransfer.getData('text/plain') as ShapeType
        this.$emit('add', {
          shapeType,
          x: e.offsetX,
          y: e.offsetY
        })
      }
    },
    /**
     * nodeを取り除く
     */
    onHoverPolyline(shapeId: number) {
      console.log(shapeId)
    },
    /**
     * nodeを取り除く
     */
    onRemoveNode(node: any) {
      this.$emit('remove', node)
    }
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
