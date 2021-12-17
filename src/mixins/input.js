export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    minlength: {
      type: [Number, String],
      default: undefined
    },
    maxlength: {
      type: [Number, String],
      default: undefined
    },

    // type number
    step: [Number, String],
    min:  [Number, String],
    max:  [Number, String],

    hasError: Boolean,
    rounded: Boolean,
  },
  computed: {
    classList() {
      const classList = [];

      if (this.hasError === true) {
        classList.push('is-danger');
      }

      if (this.rounded === true) {
        classList.push('input--rounded');
      }

      return classList;
    },
    getMinLength() {
      return parseInt(this.minlength) > 0 ? parseInt(this.minlength) : false
    },
    getMaxLength() {
      return parseInt(this.maxlength) > 0 ? parseInt(this.maxlength) : false
    }
  },
}