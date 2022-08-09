<script>
import { computed } from 'vue'

export default {
  setup(_, { $overlay }) {
    const count = computed(() => $overlay.stack.length)

    return {
      count
    }
  }
}
</script>

<template>
  <div v-if="count" class="v-overlays">
    <div class="v-overlays-backdrop" :style="{
      zIndex: count
    }"></div>
    <component
      :is="overlay.component"
      :key="overlay.key"
      :style="{
        zIndex: index + 1
      }"
      v-bind="overlay.props"
      v-for="(overlay, index) in $overlay.stack"
      v-on="overlay.on"
      role="dialog"
    ></component>
  </div>
</template>

<style>
.v-overlays {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: hidden;
}
.v-overlays-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,.4);
  z-index: 1;
}
</style>