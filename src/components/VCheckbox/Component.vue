<template>
  <label class="v-checkbox">
    <span class="mr-2">
      <input type="checkbox" :value="value" v-model="proxyChecked" class="hidden" />
      <span class="v-checkbox-indicator">
        <v-icon name="check" class="text-blue w-3 h-3"></v-icon>
      </span>
    </span>
    <slot></slot>
  </label>
</template>

<script>
import VIcon from '../VIcon';
export default {
  name: 'VCheckbox',
  components: {
    VIcon
  },
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    checked: {
      type: [Array, Boolean],
      default: false
    },
    value: {
      default: null
    }
  },
  computed: {
    proxyChecked: {
      get() {
        return this.checked;
      },
      set(val) {
        this.$emit("change", val);
      }
    }
  }
}
</script>

<style lang="scss">
.v-checkbox {
  @apply flex items-center space-x-1 cursor-pointer;
}
.v-checkbox-indicator {
  @apply w-4 h-4 bg-white rounded block border border-gray-light border-solid flex items-center justify-center;

  > * {
    display: none;
  }
}

.v-checkbox input:checked ~ .v-checkbox-indicator {
  @apply bg-blue bg-opacity-25 border-blue;

  > * {
    display: block;
  }
}
</style>