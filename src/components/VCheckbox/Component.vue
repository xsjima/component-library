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
import './styles.scss';
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