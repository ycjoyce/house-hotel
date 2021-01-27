<template>
  <div
    class="amenity-icon"
    :class="{ available: amenity.value }"
  >
    <img
      src=""
      alt=""
      class="amenity-img"
    >

    <p class="amenity-name">
      {{amenity.name}}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    amenity: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>

</style>