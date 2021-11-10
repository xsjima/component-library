<template>
  <node-view-wrapper draggable="true" data-drag-handle class="tiptap-image">
    <div class="relative">
      <img :src="node.attrs.src" alt="">
      <div class="absolute top-0 right-0 p-2">
        <button @click="deleteNode" type="button" class="bg-black bg-opacity-50 rounded-full flex items-center justify-center w-8 h-8">
          <v-icon name="x" class="text-white"></v-icon>
        </button>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2';

export default {
  components: {
    NodeViewWrapper,
  },

  props: nodeViewProps,
}
</script>