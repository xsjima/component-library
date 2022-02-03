<template>
  <div class="bg-white rounded-b-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <div class="text-lg">{{ title }}</div>
      <v-icon name="x" class="w-6 h-6 text-gray hover:text-black cursor-pointer" @click="$overlay.hide()"></v-icon>
    </div>

    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import VIcon from '../VIcon';

export default {
  components: {
    VIcon,
  },

  props: {
    title: String,
  }
}
</script>