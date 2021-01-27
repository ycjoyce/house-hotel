<template>
  <div class="amenity-box">
    <amenity-icon
      v-for="(value, name, index) in amenities"
      :key="'amenity-' + index"
      :amenity="{ name, value }"
    />
  </div>
</template>

<script>
import AmenityIcon from '@src/components/AmenityIcon.vue';

export default {
  components: {
    AmenityIcon,
  },
  props: {
    amenities: {
      type: Object,
      required: true,
    },
    simple: {
      type: Boolean,
      required: false,
    },
  },
}
</script>

<style>

</style>