<template>
  <div class="process-box">
    <div class="process-icon">
      <img
        :src="data.img"
        class="process-icon-img"
      >
    </div>

    <div class="process-content">
      <p class="process-content-text">
        {{data.text}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>

</style>