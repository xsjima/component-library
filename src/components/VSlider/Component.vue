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
            : '100%'
         }">
        <slot name="slide" :slide="slide"></slot>
      </div>
    </div>
    <div v-if="arrows && !isBeginning" @click="onPrev" class="v-slider-arrow v-slider-arrow--left">
      <v-icon name="chevron-left" class="text-white w-5 h-5"></v-icon>
    </div>
    <div v-if="arrows && !isEnd" @click="onNext" class="v-slider-arrow v-slider-arrow--right">
      <v-icon name="chevron-right" class="text-white w-5 h-5"></v-icon>
    </div>
    <div v-if="pagination" class="swiper-pagination"></div>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.min.css';
import VIcon from '../VIcon';

if (process.client && !window.Swiper) {
  window.Swiper = require('swiper').default;
}

export default {
  components: {
    VIcon
  },
  props: {
    slides: {
      type: Array,
      default() {
        return [];
      }
    },
    arrows: {
      type: Boolean,
      default: true,
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
  setup() {
    let swiper = null;

    return {
      swiper
    }
  },
  data() {
    return {
      isBeginning: true,
      isEnd: false,
    }
  },
  mounted() {
    if (window.Swiper) {
      this.swiper = new window.Swiper(this.$el, this.getOptions);

      this.swiper.on('activeIndexChange', ({ isBeginning, isEnd }) => {
        this.isBeginning = isBeginning;
        this.isEnd = isEnd;
      });
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
  methods: {
    onPrev() { this.swiper.slidePrev() },
    onNext() { this.swiper.slideNext() },
  },
  beforeDestroy() {
    if (this.swiper && this.swiper.hasOwnProperty('destroy')) {
      this.swiper.destroy();
    }
  }
}
</script>

<style lang="scss">
.v-slider-arrow {
  z-index: 1;
  position: absolute;
  top: calc(50% - 20px);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: rgba(0,0,0,.64);
  cursor: pointer;
  &--left {
    left: 8px;
  }
  &--right {
    right: 8px;
  }
}
</style>