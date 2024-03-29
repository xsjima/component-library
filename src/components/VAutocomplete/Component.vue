<template>
  <div class="relative" ref="target"
       @keydown="handleKeydown">
    <v-input
        ref="search"
        type="search"
        :placeholder="placeholder"
        v-model="query"
        :id="id"
        :minlength="minlength"
        :maxlength="maxlength"
        @input="onInput"
        @change="onInputChange"
    >
    </v-input>
    <div v-if="showResults" tabindex="1"
         class="absolute top-100 mt-1 z-10 border border-solid border-gray-light" :style="{width: resultWidth}">
      <div v-if="items.length > 0" class="bg-white p-2 overflow-y-auto" style="max-height: 10rem;">
        <div
            v-for="(item, index) in items"
            :key="item[keyId]"
            :class="{'bg-blue-50': index === cursor}"
            class="truncate cursor-pointer p-2 hover:bg-blue-50 rounded-lg"
            @click="onSelect(item)">
          <slot name="item" :item="item">{{ item[keyValue] }}</slot>
        </div>
      </div>
      <div v-else class="bg-white p-4">
        <slot name="empty">Ничего не найдено</slot>
      </div>
      <div v-if="!!$slots['footer']" class="bg-white border-t border-solid border-gray-light p-4">
        <div @click="query = ''; showResults = false;">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onClickOutside } from '@vueuse/core'
import VInput from '../VInput'

export default {
  components: {
    VInput,
  },
  props: {
    id: String,
    clearAfterSelect: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    keyId: {
      type: String,
      default: 'id',
    },
    keyValue: {
      type: String,
      default: 'name',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: ''
    },
    minlength: {
      type: [String, Number],
      default: undefined
    },
    maxlength: {
      type: [String, Number],
      default: undefined
    },
    resultWidth: {
      type: String,
      default: '100%',
    }
  },
  data() {
    return {
      cursor: null,
      showResults: false,
      query: ''
    }
  },
  mounted() {
    onClickOutside(this.$refs.target, () => this.showResults = false);
  },
  watch: {
    value: {
      handler(newValue) {
        this.query = newValue
      },
      immediate: true
    }
  },
  methods: {
    onSelect(item) {
      this.$emit('select', item);

      this.query = this.clearAfterSelect
          ? ''
          : item[this.keyValue];

      // Если clearAfterSelect === true, то в query передается выбранное значение,
      // срабатывает watch в setup и showResults становиться равным true,
      // по-этому нужен nextTick, который отработает после watch и закроет список результатов.
      this.$nextTick(() => this.showResults = false);
    },

    onInput(value) {
      this.$emit('input', value);
    },

    onInputChange({ target }) {
      if (target.value.length > 0) {
        this.showResults = true;
      }
    },

    handleKeydown(event) {
      const key = event.key;

      if (key === 'ArrowDown') {
        if (this.cursor === null) {
          this.cursor = 0;
        } else if (this.cursor >= 0 && this.cursor < this.items.length - 1) {
          this.cursor++;
        }
      }

      if (key === 'ArrowUp') {
        if (this.cursor > 0) {
          this.cursor--;
        }
      }

      if (key === 'Enter') {
        event.preventDefault();

        const item = this.items[this.cursor];

        if (item) {
          this.onSelect(item);
        } else {
          this.query = '';
          this.$nextTick(() => {
            this.showResults = false;
            this.$emit('enter');
          })
        }
      }
    }
  },
}
</script>