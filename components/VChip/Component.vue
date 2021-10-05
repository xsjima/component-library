<template>
  <div class="v-chip" :class="{[`v-chip--${size}`]: true, [`v-chip--${theme}`]: true}">
    <div v-if="!!$slots['thumbnail']">
      <slot name="thumbnail"></slot>
    </div>
    <div class="v-chip-text">{{ text }}</div>
    <button v-if="deletable" type="button" tabindex="0" class="v-chip-delete" @click="$emit('delete')">
      <slot name="delete">
        <v-icon name="x" class="w-4 h-4"></v-icon>
      </slot>
    </button>
  </div>
</template>

<script>
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

<style lang="scss">
.v-chip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  padding: 0 8px;

  > * + * {
    margin-left: 8px;
  }
}
// sizes
.v-chip--base {
  height: 32px;
  border-radius: 16px;
}
// themes
//
.v-chip-text {
  font-size: 12px;
}
.v-chip-delete {
  @apply bg-gray-light;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  color: #fff;
}
</style>