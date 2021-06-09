<template>
	<ol
    class="slider-dots"
    :style="[{ left: dotsLeft }, transform]"
  >
    <li
      v-for="n in amount"
      :key="n"
      class="slider-dot"
      :class="{ active: n - 1 === curIndex }"
      @click="slideImage(n - 1)"
    ></li>
  </ol>
</template>

<script>
export default {
	props: {
		amount: Number,
    curIndex: Number,
    dotsLeft: String,
  },
  computed: {
    transform() {
      if (this.dotsLeft) {
        return { transform: 'translateX(0)' };
      }
      return {};
    },
  },
	methods: {
		slideImage(index) {
			this.$emit('changeSlideIndex', index);
		},
  },
};
</script>
