<template>
  <div class="v-chip" :class="{[`v-chip--size-${size}`]: true, [`v-chip--${theme}`]: true}" @click="$emit('click')">
    <div v-if="!!$slots['thumbnail']">
      <slot name="thumbnail"></slot>
    </div>
    <div class="v-chip-text">{{ text }}</div>
    <button v-if="deletable" title="Удалить" type="button" tabindex="0" class="v-chip-delete" @click="$emit('delete')">
      <v-icon name="x" class="w-4 h-4"></v-icon>
    </button>
  </div>
</template>

<script>
import './styles.scss';
import VIcon from '../VIcon';

export default {
  components: {
    VIcon,
  },
  props: {
    size: {
      type: String,
      default: 'base'
    },
    theme: {
      type: String,
      default: 'base'
    },
    text: {
      type: String,
      required: true,
    },
    deletable: {
      type: Boolean
    }
  }
}
</script>