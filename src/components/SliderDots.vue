<template>
  <ol class="slider-list">
    <li
      v-for="n in sliderAmount"
      :key="'slider-dot-' + n"
      class="slider-dot"
    ></li>
  </ol>
</template>

<script>
export default {
  inject: ['sliderAmount'],
}
</script>