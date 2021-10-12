<template>
  <textarea
      ref="textarea"
      :value="value"
      :id="id"
      :rows="rows"
      :placeholder="placeholder"
      :minlength="getMinLength"
      :maxlength="getMaxLength"
      class="input"
      :class="classList"
      @keydown="onKeydown"
      @paste="onPaste"
      @input="$emit('input', $event.target.value)"
  >
    </textarea>
</template>

<script>
import InputMixin from '../../mixins/input';

export default {
  mixins: [InputMixin],
  props: {
    rows: {
      type: [Number, String],
      default: 4
    },

    forceUpdate: {
      type: Boolean
    },

    shiftEnter: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    forceUpdate() {
      this.setHeight();
    },

    value: {
      handler() {
        this.setHeight();
      },

      immediate: true,
    }
  },

  methods: {
    /**
     * @param event
     */
    onPaste(event) {
      const clipboard = event.clipboardData.getData('text')

      // Только если существующий текст + тот текст который в буфере, меньше чем maxlength.
      if (this.maxlength > (this.value && this.value.length + clipboard.length)) {
        this.$emit('paste', event)
      }
    },

    setHeight() {
      this.$nextTick()
          .then(() => {
            if (this.$refs.textarea) {
              this.$refs.textarea.style.height = 'auto';
              this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px';
            }
          });
    },

    onKeydown(event) {
      // Если нажаты shift+enter, то перенос строки,
      // если нажат enter или enter с любой другой кнопкой, то генерируем событие enter
      if (this.shiftEnter === true) {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          this.$emit('enter');
        }
      }
    }
  }
}
</script>
