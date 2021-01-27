<template>
  <div class="calendar-box">
    <p
      v-if="config.title"
      class="calendar-title"
    >
      {{config.title}}
    </p>

    <div class="calendar"></div>

    <button
      v-if="config.reset"
      class="btn btn-pure btn-secondary"
    >
      重新選取
    </button>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
}
</script>

<style>

</style>