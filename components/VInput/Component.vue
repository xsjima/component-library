<template>
  <div class="relative">
    <input
      class="input"
      :id="id"
      :type="editableType"
      :placeholder="placeholder"
      :class="classList"
      :value="value"
      :maxlength="maxlength"
      :minlength="minlength"
      :step="type === 'number' && step > 0 ? step : undefined"
      :min="type === 'number' && min > 0 ? min : undefined"
      :max="type === 'number' && max > 0 ? max : undefined"
      @input="$emit('input', $event.target.value); $emit('change', $event)"
    />

    <div v-if="isPassword" class="v-input-password__show-password" @click="changeInputType">
      <v-icon name="eye" width="20" height="20" :class="{[editableType === 'text' ? 'text-blue' : 'text-gray']: true}"></v-icon>
    </div>
  </div>
</template>

<script>
import InputMixin from '../../mixins/input';
import VIcon from '../VIcon';

export default {
  components: {
    VIcon
  },
  mixins: [InputMixin],
  props: {
    type: {
      type: String,
      default: 'text'
    },
  },
  computed: {
    isPassword() {
      return this.value && this.value.length > 0 && this.type === 'password'
    }
  },
  data() {
    return {
      editableType: this.type,
    }
  },
  methods: {
    changeInputType() {
      this.editableType === 'password' ? (this.editableType = 'text') : (this.editableType = 'password')
    }
  },
}
</script>

<style lang="scss">
.v-input-password__show-password {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  padding: 0 8px;
  cursor: pointer;
}
</style>
