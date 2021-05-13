<template>
  <button
    class="btn btn-solid font-bold font-tertiary"
    @click.prevent="data.method"
  >
    <slot></slot>
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