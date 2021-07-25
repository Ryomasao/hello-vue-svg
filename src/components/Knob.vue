<template>
  <rect :x="x" :y="y" width="10" height="10" stroke="black" fill="black" />
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
  data: () => ({}),
  computed: {},
  methods: {}
})
</script>

<style lang="scss" scoped></style>
