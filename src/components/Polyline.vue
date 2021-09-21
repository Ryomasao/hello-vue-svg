<template>
  <polyline
    ref="polylineRef"
    class="polyline"
    tabindex="0"
    stroke="black"
    fill="none"
    stroke-width="8"
    :points="points"
    @click="toggleAcitve"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @keydown.delete="onRemove"
  />
  <circle
    v-if="isActive"
    fill="black"
    ref="firstRef"
    :cx="basePoint.x"
    :cy="basePoint.y"
    @mousedown="onKnobMouseDown"
    r="10"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useClickOutside from '@/composables/useClickOutside'
//import Knobs, { Direction } from './Knobs.vue'

type Data = {
  polyline: {
    points: { x: number; y: number }[]
  }
  dragOffsetX: number | null
  dragOffsetY: number | null
  knobWidth: number
  knobHeight: number
}

export default defineComponent({
  name: 'Polyline',

  components: {
    //Knobs
  },

  props: {
    id: {
      type: Number,
      required: true
    },
    x: {
      type: Number,
      default: () => 10
    },
    y: {
      type: Number,
      default: () => 10
    }
  },

  emits: ['remove', 'hoverPolyline'],

  data: (): Data => ({
    polyline: {
      points: [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 100, y: 100 }
      ]
    },
    // ドラッグ開始したときの座標/ドラック対象の要素の基準となる点からの相対位置
    dragOffsetX: 0,
    dragOffsetY: 0,
    // 要素のサイズを変更するKnobのサイズ
    knobWidth: 10,
    knobHeight: 10
  }),

  computed: {
    /**
     * SVGのpolyline用のpoints形式
     */
    points(): string {
      return this.polyline.points.reduce((str, point) => {
        return `${str}${point.x},${point.y} `
      }, '')
    },
    node(): any {
      return this.polyline
    },
    basePoint(): { x: number; y: number } {
      // 始点を基準とする
      return this.polyline.points[0]
      // 以下、中点を基準とする場合
      //const total = this.polyline.points.reduce(
      //  (total, point) => {
      //    total.x = total.x + point.x
      //    total.y = total.y + point.y
      //    return total
      //  },
      //  { x: 0, y: 0 }
      //)

      //return {
      //  x: total.x / this.polyline.points.length,
      //  y: total.y / this.polyline.points.length
      //}
    }
  },

  created() {
    this.polyline.points = this.polyline.points.map((point) => {
      return {
        x: point.x + this.x,
        y: point.y + this.y
      }
    })
  },

  methods: {
    /**
     * 対象の要素をクリックしてドラッグ開始したとき
     */
    onMouseDown(e: MouseEvent) {
      const { offsetX, offsetY } = e
      this.dragOffsetX = offsetX - this.basePoint.x
      this.dragOffsetY = offsetY - this.basePoint.y
      document.addEventListener('mousemove', this.onMouseMove)
    },
    /**
     * 対象の要素からクリックが離れたとき
     */
    onMouseUp() {
      this.dragOffsetX = null
      this.dragOffsetY = null
      document.removeEventListener('mousemove', this.onMouseMove)
    },
    /**
     * ドラッグ中
     */
    onMouseMove(e: MouseEvent) {
      if (this.dragOffsetX === null || this.dragOffsetY === null) return

      const dragX = e.offsetX - this.basePoint.x - this.dragOffsetX
      const dragY = e.offsetY - this.basePoint.y - this.dragOffsetY

      this.polyline.points = this.polyline.points.map((point) => {
        return {
          x: point.x + dragX,
          y: point.y + dragY
        }
      })
    },
    /**
     * TODO 別コンポーネントに切り出しだしたい
     * 始点クリック時
     */
    onKnobMouseDown() {
      document.addEventListener('mousemove', this.onKnobMouseMove)
      document.addEventListener('mouseup', this.onKnobMouseUp, { once: true })
    },
    /**
     * TODO 別コンポーネントに切り出しだしたい
     * 始点からクリックが離れたとき
     */
    onKnobMouseUp() {
      document.removeEventListener('mousemove', this.onKnobMouseMove)
    },
    /**
     * TODO 別コンポーネントに切り出しだしたい
     * 始点を動かしたとき
     */
    onKnobMouseMove(e: MouseEvent) {
      this.polyline.points[0].x = e.offsetX
      this.polyline.points[0].y = e.offsetY

      const mayBeOthreShape = document.elementFromPoint(e.clientX, e.clientY)
      if (!mayBeOthreShape) return

      const shape = mayBeOthreShape.closest('.shape')
      if (!shape) return

      const shapeId = shape.getAttribute('data-id')
      this.$emit('hoverPolyline', shapeId)
    },
    /**
     * Knobドラッグ中
     */
    //onKnobMouseMove(e: MouseEvent, index: Direction) {
    //  this.circle = after(e, this.circle, index)
    //},
    /**
     * DELETE/BackSpaceを押下したとき
     */
    onRemove() {
      this.$emit('remove')
    }
  },

  setup() {
    /**
     * 要素を押下/要素外を押下したときの状態を管理
     */
    const isActive = ref(false)
    const polylineRef = ref(null)
    const toggleAcitve = () => {
      isActive.value = !isActive.value
    }
    const deactive = () => {
      isActive.value = false
    }
    useClickOutside(polylineRef, deactive)
    return { polylineRef, isActive, toggleAcitve, deactive }
  }
})

//const after = (e: MouseEvent, circle: Data['circle'], index: Direction) => {
//  if (index === 'top' || index === 'bottom') {
//    const verticalChange = Math.abs(circle.y - e.offsetY)
//    if (verticalChange < 30) {
//      return circle
//    }
//    return {
//      ...circle,
//      width: verticalChange,
//      height: verticalChange
//    }
//  }
//
//  if (index === 'left' || index === 'right') {
//    const horizonalChange = Math.abs(circle.x - e.offsetX)
//    if (horizonalChange < 30) {
//      return circle
//    }
//    return {
//      ...circle,
//      width: horizonalChange,
//      height: horizonalChange
//    }
//  }
//
//  return circle
//}
</script>

<style lang="scss" scoped></style>
