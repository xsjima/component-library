<template>
  <div class="bg-white rounded-lg p-6" :class="{[`v-dialog--${size}`]: true}">
    <div class="flex items-center justify-between mb-6">
      <div class="text-lg">{{ title }}</div>
      <v-icon name="x" class="w-6 h-6 text-gray hover:text-black cursor-pointer" @click="$overlay.hide()"></v-icon>
    </div>

    <div>
      <slot></slot>
    </div>

    <div v-if="!hideFooter">
      <hr class="my-6">

      <div class="flex justify-end space-x-1">
        <v-button theme="gray" @click="$emit('cancel'); $overlay.hide()">
          <slot name="cancel-button">Отмена</slot>
        </v-button>
        <v-button theme="primary" @click="$emit('ok')">
          <slot name="ok-button"></slot>
        </v-button>
      </div>
    </div>
  </div>
</template>

<script>
import VButton from '../VButton';
import VIcon from '../VIcon';

export default {
  components: {
    VButton,
    VIcon,
  },

  props: {
    title: String,
    size: {
      type: String,
      default: 'base'
    },
    hideFooter: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style lang="scss">
.v-dialog {
  &--sm {
    width: 320px;
  }
  &--base {
    width: 480px;
  }
  &--lg {
    width: 640px;
  }
}
</style>