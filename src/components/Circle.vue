<template>
  <circle
    ref="circleRef"
    class="cricle"
    tabindex="0"
    :cx="circle.x"
    :cy="circle.y"
    :r="r"
    stroke="black"
    fill="#fff"
    stroke-width="2"
    @click="toggleAcitve"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @keydown.delete="onRemove"
  />
  <Knobs v-if="isActive" :node="leftTopBaseNode" @mousemove="onKnobMouseMove" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useClickOutside from '@/composables/useClickOutside'
import Knobs, { Direction } from './Knobs.vue'

type Data = {
  circle: {
    x: number
    y: number
    width: number
    height: number
  }
  dragOffsetX: number | null
  dragOffsetY: number | null
  knobWidth: number
  knobHeight: number
}

const MIN_WIDTH = 50

export default defineComponent({
  name: 'Circle',

  components: {
    Knobs
  },

  props: {
    x: {
      type: Number,
      default: () => 10
    },
    y: {
      type: Number,
      default: () => 10
    }
  },

  emits: ['remove'],

  data: (): Data => ({
    circle: {
      x: 10,
      y: 10,
      width: 50,
      height: 50
    },
    // ドラッグしたときの座標のドラック対象の要素の左上からの相対位置
    dragOffsetX: 0,
    dragOffsetY: 0,
    // 要素のサイズを変更するKnobのサイズ
    knobWidth: 10,
    knobHeight: 10
  }),

  computed: {
    /**
     * 半径
     */
    r(): number {
      return this.circle.width / 2
    },
    node(): any {
      return this.circle
    },
    /**
     * Circleのx/yは中心点を指すので、Rectangle同様に座標を左上を起点にした値
     */
    leftTopBaseNode(): any {
      return {
        ...this.circle,
        x: this.circle.x - this.r,
        y: this.circle.y - this.r
      }
    }
  },

  created() {
    this.circle.x = this.x
    this.circle.y = this.y
  },

  methods: {
    /**
     * 対象の要素をクリックしてドラッグ開始したとき
     */
    onMouseDown(e: MouseEvent) {
      const { offsetX, offsetY } = e
      this.dragOffsetX = offsetX - this.circle.x
      this.dragOffsetY = offsetY - this.circle.y
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
      this.circle = {
        ...this.circle,
        x: e.offsetX - this.dragOffsetX,
        y: e.offsetY - this.dragOffsetY
      }
    },
    /**
     * Knobドラッグ中
     */
    onKnobMouseMove(e: MouseEvent, index: Direction) {
      this.circle = after(e, this.circle, index)
    },
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
    const circleRef = ref(null)
    const toggleAcitve = () => {
      isActive.value = !isActive.value
    }
    const deactive = () => {
      isActive.value = false
    }
    useClickOutside(circleRef, deactive)
    return { circleRef, isActive, toggleAcitve, deactive }
  }
})

const after = (e: MouseEvent, circle: Data['circle'], index: Direction) => {
  if (index === 'top' || index === 'bottom') {
    const verticalChange = Math.abs(circle.y - e.offsetY)
    if (verticalChange < 30) {
      return circle
    }
    return {
      ...circle,
      width: verticalChange,
      height: verticalChange
    }
  }

  if (index === 'left' || index === 'right') {
    const horizonalChange = Math.abs(circle.x - e.offsetX)
    if (horizonalChange < 30) {
      return circle
    }
    return {
      ...circle,
      width: horizonalChange,
      height: horizonalChange
    }
  }

  return circle
}
</script>

<style lang="scss" scoped></style>
