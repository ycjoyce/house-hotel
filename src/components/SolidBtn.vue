<template>
  <button
    class="btn btn-solid font-bold font-tertiary"
    :class="`btn-solid-${data.type}`"
    @click.prevent="data.method"
  >
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