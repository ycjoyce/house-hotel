<template>
  <ul class="slider">
    <slot></slot>

    <slider-dots/>

    <li class="slider-img"></li>
  </ul>
</template>

<script>
import SliderDots from '@src/components/SliderDots.vue';

export default {
  components: {
    SliderDots,
  },
}
</script>

<style>

</style>