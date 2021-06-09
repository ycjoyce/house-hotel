<template>
  <div class="amenity-box">
    <amenity-icon
      v-for="(value, name) in amenities"
      :key="`${name}-${value}`"
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
  },
}
</script>