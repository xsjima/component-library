<template>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div
        v-for="slide in slides" :key="slide[slideKey]"
        @click="$emit('click', slide)"
        class="swiper-slide"
        :style="{
          height: 'auto',
          'width': getOptions.slidesPerView === 'auto'
            ? 'auto'
            : undefined
         }">
        <slot name="slide" :slide="slide"></slot>
      </div>
    </div>
    <div v-if="pagination" class="swiper-pagination"></div>
  </div>
</template>

<script>
let Swiper = null, swiper = null;

import 'swiper/swiper-bundle.min.css';

if (process.client) {
  Swiper = require('swiper').default;
}

export default {
  props: {
    slides: {
      type: Array,
      default() {
        return [];
      }
    },
    pagination: {
      type: Boolean,
      default: false,
    },
    slideKey: {
      type: String,
      default: 'id'
    },
    options: {
      type: Object,
    }
  },
  mounted() {
    if (Swiper) {
      swiper = new Swiper('.swiper', this.getOptions);
    }
  },
  computed: {
    getOptions() {
      return Object.assign({
        spaceBetween: 24,
        slidesPerView: 'auto',
      }, this.options)
    }
  },
  beforeDestroy() {
    if (Swiper) {
      swiper.destroy();
    }
  }
}
</script>