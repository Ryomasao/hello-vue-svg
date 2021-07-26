<template>
  <rect
    :x="x"
    :y="y"
    width="10"
    height="10"
    stroke="black"
    fill="black"
    @mousedown="onMouseDown"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Knob',
  props: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      default: () => 10
    },
    height: {
      type: Number,
      default: () => 10
    }
  },

  emits: ['mousedown', 'mouseup', 'mousemove'],

  data: () => ({}),

  computed: {},

  methods: {
    /**
     * 対象の要素をクリックしてドラッグ開始したとき
     */
    onMouseDown(e: any) {
      document.addEventListener('mousemove', this.onMouseMove)
      // mouseupをelementにbindすると、
      // element外にカーソルをおいて、クリックを離した場合、mouseupイベントがキャッチできない
      // これに対応するため、対象の要素をクリックしたときに、document全体にmouseupイベントを登録しておく
      // {once:true}は、IEでは使えないけど、一度イベントを発火したら、removeしてくれるやつ
      // https://melkornemesis.medium.com/handling-javascript-mouseup-event-outside-element-b0a34090bb56
      document.addEventListener('mouseup', this.onMouseUp, { once: true })
      this.$emit('mousedown', e)
    },
    /*
     * 対象の要素からクリックが離れたとき
     */
    onMouseUp(e: any) {
      document.removeEventListener('mousemove', this.onMouseMove)
      this.$emit('mouseup', e)
    },
    /**
     * ドラッグ中
     */
    onMouseMove(e: any) {
      this.$emit('mousemove', e)
    }
  }
})
</script>

<style lang="scss" scoped></style>
