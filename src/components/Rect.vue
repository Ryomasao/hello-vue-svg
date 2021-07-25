<template>
  <svg xmlns="http://www.w3.org/2000/svg" class="rect">
    <rect
      :x="rect.x"
      :y="rect.y"
      width="30"
      height="30"
      stroke="black"
      fill="#fff"
      stroke-width="2"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type Data = {
  rect: {
    x: number
    y: number
  }
  dragOffsetX: number | null
  dragOffsetY: number | null
}

// 参考記事
// https://ja.javascript.info/mouse-drag-and-drop
// https://dev.to/abolz/roll-your-own-svg-drag-and-drop-in-vuejs-2c7o

export default defineComponent({
  name: 'Rect',
  data: (): Data => ({
    rect: {
      x: 0,
      y: 0
    },
    dragOffsetX: 0,
    dragOffsetY: 0
  }),
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
        x: e.offsetX - this.dragOffsetX,
        y: e.offsetY - this.dragOffsetY
      }
    }
  }
})
</script>

<style lang="scss">
.rect {
  width: 100%;
  height: 100%;
}
</style>
