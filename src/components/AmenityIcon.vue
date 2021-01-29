<template>
  <div
    class="amenity-icon"
    :class="{ 'not-available': !amenity.value }"
  >
    <img
      :src="require(`@img/icon/${amenity.name}.svg`)"
      :alt="amenity.name"
      class="amenity-img"
    >

    <p class="amenity-name font-sm">
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