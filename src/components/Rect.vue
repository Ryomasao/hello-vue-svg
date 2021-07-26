<template>
  <rect
    ref="rect"
    class="rect"
    :x="rect.x"
    :y="rect.y"
    :width="rect.width"
    :height="rect.height"
    stroke="black"
    fill="#fff"
    stroke-width="2"
    @click="onClick"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
  />
  <Knobs v-if="active" :node="node" @mousemove="onKnobMouseMove" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Knobs, { Direction } from './Knobs.vue'

// 参考記事
// https://ja.javascript.info/mouse-drag-and-drop
// https://dev.to/abolz/roll-your-own-svg-drag-and-drop-in-vuejs-2c7o

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
  active: boolean
}

const MIN_WIDTH = 50
const MIN_HEIGHT = 20

export default defineComponent({
  name: 'Rect',

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

  data: (): Data => ({
    rect: {
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
    knobHeight: 10,
    // 要素にフォーカスがあたっている場合true
    active: false
  }),

  computed: {
    node(): any {
      return this.rect
    }
  },

  created() {
    // TODO
    // ドロップしたときの座標位置はセンターかも
    // おいたときに左上が起点になるので、ちょっと違和感がある。
    this.rect.x = this.x
    this.rect.y = this.y
  },

  methods: {
    onClick() {
      this.active = !this.active
    },
    onClickOutside() {
      this.active = false
    },
    /**
     * 対象の要素をクリックしてドラッグ開始したとき
     */
    onMouseDown(e: MouseEvent) {
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
      this.rect = {
        ...this.rect,
        x: e.offsetX - this.dragOffsetX,
        y: e.offsetY - this.dragOffsetY
      }
    },
    /**
     * Knobドラッグ中
     */
    onKnobMouseMove(e: MouseEvent, index: Direction) {
      this.rect = after(e, this.rect, index)
    }
  }
})

const after = (e: MouseEvent, rect: Data['rect'], index: Direction) => {
  if (index === 'top') {
    const verticalChange = rect.y - e.offsetY

    if (verticalChange < 0 && rect.height <= MIN_HEIGHT) {
      return rect
    }

    return {
      ...rect,
      y: e.offsetY,
      height: rect.height + verticalChange
    }
  }

  if (index === 'right') {
    const horizonalChange = e.offsetX - (rect.x + rect.width)
    if (horizonalChange < 0 && rect.width <= MIN_WIDTH) {
      return rect
    }
    return {
      ...rect,
      width: rect.width + horizonalChange
    }
  }

  if (index === 'bottom') {
    const verticalChange = e.offsetY - (rect.y + rect.height)

    if (verticalChange < 0 && rect.height <= MIN_HEIGHT) {
      return rect
    }

    return {
      ...rect,
      height: rect.height + verticalChange
    }
  }

  if (index === 'left') {
    const horizonalChange = rect.x - e.offsetX
    if (horizonalChange < 0 && rect.width <= MIN_WIDTH) {
      return rect
    }
    return {
      ...rect,
      x: e.offsetX,
      width: rect.width + horizonalChange
    }
  }

  throw new Error('this code should be unreachable.')
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
