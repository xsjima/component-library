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
import { ref, onMounted, onBeforeUnmount } from '@vue/composition-api';
import 'swiper/swiper-bundle.min.css';
import VIcon from '../VIcon';

let Swiper = null;

if (process.client) {
  Swiper = require('swiper').default;
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
      defaultValue: () => {}
    }
  },
  setup(props) {
    let swiper = null;

    const isBeginning = ref(true);
    const isEnd = ref(false);

    const getOptions = Object.assign({
      spaceBetween: 24,
      slidesPerView: 'auto',
    }, props.options);

    onMounted(() => {
      if (Swiper) {
        swiper = new Swiper('.swiper', getOptions);

        swiper.on('activeIndexChange', (event) => {
          isBeginning.value = event.isBeginning;
          isEnd.value = event.isEnd;
        });
      }
    });

    onBeforeUnmount(() => {
      if (swiper && swiper.hasOwnProperty('destroy')) {
        swiper.destroy();
      }
    });

    const onPrev = () => swiper.slidePrev();
    const onNext = () => swiper.slideNext();

    return {
      swiper,
      isBeginning,
      isEnd,
      getOptions,
      onPrev,
      onNext,
    }
  },
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
  background-color: rgba(0,0,0,.4);
  cursor: pointer;

  &--left {
    left: 8px;
  }

  &--right {
    right: 8px;
  }
}
</style>