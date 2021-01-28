<template>
  <main>
    <img-card
      v-for="(room, index) in rooms"
      :key="'room-' + index"
      :data="room"
    />
  </main>
</template>

<script>
import ImgCard from '@src/components/ImgCard.vue';

export default {
  components: {
    ImgCard,
  },
  props: {
    rooms: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style>

</style>