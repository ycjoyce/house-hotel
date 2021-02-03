<template>
  <div class="process-box">
    <div class="process-icon">
      <img
        :src="data.img"
        class="process-icon-img"
      >
    </div>

    <div class="process-content">
      <p
        v-html="data.text"
        class="process-content-text"
      ></p>
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
