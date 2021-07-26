<template>
  <rect
    class="rect"
    :x="rect.x"
    :y="rect.y"
    :width="rect.width"
    :height="rect.height"
    stroke="black"
    fill="#fff"
    stroke-width="2"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
  />
  <Knobs :node="node" @mousemove="onKnobMouseMove" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Knobs from './Knobs.vue'

type Data = {
  rect: {
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

// 参考記事
// https://ja.javascript.info/mouse-drag-and-drop
// https://dev.to/abolz/roll-your-own-svg-drag-and-drop-in-vuejs-2c7o

export default defineComponent({
  name: 'Rect',
  components: {
    Knobs
  },
  data: (): Data => ({
    rect: {
      x: 10,
      y: 10,
      width: 200,
      height: 30
    },
    dragOffsetX: 0,
    dragOffsetY: 0,
    knobWidth: 10,
    knobHeight: 10
  }),
  computed: {
    node(): any {
      return this.rect
    }
  },
  methods: {
    /**
     * 対象の要素をクリックしてドラッグ開始したとき
     */
    onMouseDown(e: any) {
      // offsetX/Yは、ドラック対象の要素をクリックした場所の座標
      // 一方、this.react.x/yは、ドラック対象の要素の左上の座標
      // ドラッグ時に、offsetX/Yをそのままthis.rect.x/yにセットすると、クリックした座標が、rectの左上になってしまう。
      // これを防ぐために、rectの左上からの相対位置を保持しておき、ドラッグ時に利用する。
      const { offsetX, offsetY } = e
      this.dragOffsetX = offsetX - this.rect.x
      this.dragOffsetY = offsetY - this.rect.y
      // rectにmovemoveを付与したとき、カーソルをすばやく動かすと追従しなくなった。理由があんまりわかってない。
      // ほとんどの実装で、mousedown時にイベントリスナーを登録するパターンになってる。
      document.addEventListener('mousemove', this.onMouseMove)
    },
    /**
     * 対象の要素からクリックが離れたとき
     */
    onMouseUp(e: any) {
      this.dragOffsetX = null
      this.dragOffsetY = null
      document.removeEventListener('mousemove', this.onMouseMove)
    },
    /**
     * ドラッグ中
     */
    onMouseMove(e: any) {
      if (this.dragOffsetX === null || this.dragOffsetY === null) return
      this.rect = {
        ...this.rect,
        x: e.offsetX - this.dragOffsetX,
        y: e.offsetY - this.dragOffsetY
      }
    },
    /**
     * Knobドラッグ中
     */
    onKnobMouseMove(e: any, index: string) {
      this.rect = after(e, this.rect, index)
    }
  }
})

const after = (e: any, rect: Data['rect'], index: string) => {
  if (index === 'right') {
    const horizonalChange = e.offsetX - (rect.x + rect.width)
    return {
      ...rect,
      width: rect.width + horizonalChange
    }
  }

  return rect
}

//const getEdge = (rect: Data['rect'], index: string) => {
//  if (index === 'top') {
//    return rect.y
//  }
//
//  if (index === 'right') {
//    return rect.x + rect.width
//  }
//
//  if (index === 'bottom') {
//    return rect.y + rect.height
//  }
//
//  // left
//  return rect.x
//}
</script>

<style lang="scss" scoped>
.rect {
  //stroke: blue;
  //stroke-width: 2;
  //stroke-dasharray: 1;
}
</style>
