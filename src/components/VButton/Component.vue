<template>
  <component
      :to="to || undefined"
      :is="tagName"
      :type="type"
      :disabled="loading || disabled"
      :class="classList"
      @click="$emit('click')"
      @click.native="$emit('click')"
      :role="to ? 'link' : 'button'"
  >
    <div v-if="hasPrependSlot" class="mr-2">
      <slot name="prepend"></slot>
    </div>
    <slot></slot>
    <div v-if="hasAppendSlot" class="ml-2">
      <slot name="append"></slot>
    </div>
  </component>
</template>

<script>
import './styles.scss';

export default {
  name: 'VButton',

  props: {
    type: {
      type: String,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    wide: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
    },
    to: [Object, String],

    circle: [Boolean, String],

    outline: Boolean,

    size: String,
  },
  computed: {
    hasPrependSlot() {
      return !!this.$slots.prepend;
    },
    hasAppendSlot() {
      return !!this.$slots.append;
    },

    tagName() {
      return (typeof this.to === 'string' || typeof this.to === 'object')
          ? 'NLink'
          : 'button';
    },

    classList() {
      let classList = 'button';

      if (this.circle === true) {
        classList += ' button--circle';
      }

      if (this.outline === true) {
        classList += ' button--outline';
      }

      if (['lg', 'sm'].indexOf(this.size) >= 0) {
        classList += ` button--${this.size}`;
      }

      if (typeof this.theme === 'string' && this.theme.length > 0) {
        classList += ` button--${this.theme}`
      }

      if (! this.circle) {
        if (this.wide === true) {
          classList += ' button--wide'
        }
      }

      if (this.loading) {
        classList += ' button--loading';
      }

      return classList;
    },
  }
}
</script>