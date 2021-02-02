<template>
  <div
    class="slider-container"
  >
    <ul
      class="slider"
      :style="{ transform: `translateX(-${sliderIndex * 100}%)` }"
    >
      <slot></slot>

      <li
        v-for="(image, index) in images"
        :key="'image-' + index"
        class="slider-img-box"
      >
        <img
          :src="image"
          class="slider-img"
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
    period: {
      type: Number,
      required: false,
      default() {
        return 5;
      },
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      curIndex: 0,
      autoPlayTimer: null,
    };
  },
  computed: {
    sliderIndex() {
      return this.$store.getters.sliderIndex(this.id);
    },
  },
  methods: {
    slideImage() {
      let sendIndex = (this.sliderIndex <= this.images.length - 2) ? this.sliderIndex + 1 : 0;
      
      this.$store.commit('setSliderIndex', {
        id: this.id,
        index: sendIndex,
      });
    },
    initSlider() {
      this.$store.commit('setSliderIndex', {
        id: this.sliderId,
        index: 0,
      });
    },
  },
  created() {
    this.initSlider();

    this.autoPlayTimer = setInterval(
      this.slideImage,
      this.period * 1000
    );
  },
  beforeDestroy() {
    clearInterval(this.autoPlayTimer);
  },
}
</script>
