<template>
  <div class="container">
    <div>
      <ul class="list">
        <li class="item-container">
          <span
            class="rectangle"
            draggable="true"
            @click="onClick"
            @dragstart="(e) => onDragStart(e, SHAPE_TYPE.RECTANGLE)"
          />
        </li>
        <li class="item-container">
          <span
            class="circle"
            draggable="true"
            @click="onClick"
            @dragstart="(e) => onDragStart(e, SHAPE_TYPE.CIRCLE)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ShapeType, SHAPE_TYPE } from '@/models'

export default defineComponent({
  name: 'ShapePanel',

  components: {},

  computed: {
    SHAPE_TYPE() {
      return SHAPE_TYPE
    }
  },

  methods: {
    onDragStart(e: DragEvent, type: ShapeType) {
      if (e.dataTransfer) {
        e.dataTransfer.setData('text/plain', type)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  background: cadetblue;
}

.list {
  list-style: none;
}

.item-contaienr {
}

.rectangle {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 4px solid black;
}

.circle {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid black;
}
</style>
