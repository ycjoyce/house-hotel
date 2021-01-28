<template>
  <ol class="slider-list">
    <li
      v-for="n in amount"
      :key="'slider-dot-' + n"
      class="slider-dot"
    ></li>
  </ol>
</template>

<script>
export default {
  props: {
    amount: {
      type: Number,
      required: true,
    }
  },
}
</script>