<template>
  <ol class="slider-dots">
    <li
      v-for="n in amount"
      :key="`slider-dot-${n}`"
      class="slider-dot"
      :class="{ active: curSlide(n - 1) }"
      @click="slideImage(n - 1)"
    ></li>
  </ol>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    curSlide() {
      return (index) => {
        return index === this.$store.getters.sliderIndex(this.id);
      };
    },
  },
  methods: {
    slideImage(index) {
      this.$store.commit('setSliderIndex', {
        id: this.id,
        index,
      });
    },
  },
}
</script>