<template>
  <div class="container">
    <div>
      <ul>
        <span class="rectangle" @click="onClick" />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ShapePanel',

  components: {},

  emits: ['add'],

  methods: {
    onClick() {
      this.$emit('add')
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  background: cadetblue;
}

.rectangle {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 4px solid black;
}
</style>
