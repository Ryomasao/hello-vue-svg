<template>
  <Knob v-for="(knob, index) in knobs" :key="index" :x="knob.x" :y="knob.y" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Knob from './Knob.vue'

type Data = {
  knobWidth: number
  knobHeight: number
}

export default defineComponent({
  name: 'Knobs',

  components: {
    Knob
  },

  props: {
    node: {
      type: Object as PropType<{
        x: number
        y: number
        width: number
        height: number
      }>,
      required: true
    }
  },

  data: (): Data => ({
    knobWidth: 10,
    knobHeight: 10
  }),

  computed: {
    knobs(): any {
      const CENTER_KNOB_WIDTH = this.knobWidth / 2
      const CENTER_KNOB_HEIGHT = this.knobHeight / 2

      return {
        top: {
          x: this.node.x + this.node.width / 2 - CENTER_KNOB_WIDTH,
          y: this.node.y - CENTER_KNOB_HEIGHT
        },
        right: {
          x: this.node.x + this.node.width - CENTER_KNOB_WIDTH,
          y: this.node.y + this.node.height / 2 - CENTER_KNOB_HEIGHT
        },
        bottom: {
          x: this.node.x + this.node.width / 2 - CENTER_KNOB_WIDTH,
          y: this.node.y + this.node.height - CENTER_KNOB_HEIGHT
        },
        left: {
          x: this.node.x - CENTER_KNOB_WIDTH,
          y: this.node.y + this.node.height / 2 - CENTER_KNOB_HEIGHT
        }
      }
    }
  },

  methods: {}
})
</script>

<style lang="scss" scoped></style>
