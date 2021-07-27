<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="container"
    @dragover="onDragOver"
    @drop="onDrop"
  >
    <Rect
      v-for="node in nodes"
      :key="node.id"
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

export default defineComponent({
  name: 'Canvas',

  props: {
    nodes: {
      type: Array,
      default: () => []
    }
  },

  components: {
    Rect
  },

  emits: ['add', 'remove'],

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
