<template>
  <ul class="slider">
    <slot></slot>

    <slider-dots :amount="images.length"/>

    <li
      v-for="(image, index) in images"
      :key="'image-' + index"
      class="slider-img"
    >
      <img
        :src="image"
        class="bg-img"
      >
    </li>
  </ul>
</template>

<script>
import SliderDots from '@src/components/SliderDots.vue';

export default {
  components: {
    SliderDots,
  },
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style>

</style>