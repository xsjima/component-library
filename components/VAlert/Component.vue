<template>
  <div class="alert alert-primary" role="alert">
    <div class="flex">
      <v-icon :name="icon" width="16" height="16" :class="{[iconColor]: true}" class="flex-shrink-0"></v-icon>
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
      type: String
    },
  },
  computed: {
    icon() {
      return {
        info: 'info'
      }[this.type]
    },
    iconColor() {
      return {
        info: 'text-gray-light'
      }[this.type]
    }
  }
}
</script>