<template>
  <div class="v-alert" :class="{[`v-alert--${type}`]: true}" role="alert">
    <div class="v-alert-border"></div>
    <div class="flex items-center space-x-3 ml-3">
      <v-icon :name="icon" :class="{[iconColor]: true}" class="flex-shrink-0 w-6 h-6"></v-icon>
      <div><slot></slot></div>
    </div>
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
    type: {
      type: String,
      default: 'base'
    },
  },
  computed: {
    icon() {
      return {
        info: 'information-circle',
        success: 'badge-check',
        danger: 'exclamation-circle'
      }[this.type]
    },
    iconColor() {
      return {
        info: 'text-blue',
        success: 'text-green',
        danger: 'text-pink'
      }[this.type]
    }
  }
}
</script>