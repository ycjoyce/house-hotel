<template>
  <button @click.prevent="data.method">
    {{data.title}}
  </button>
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