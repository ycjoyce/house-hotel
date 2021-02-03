<template>
  <main class="room-cards-container">
    <div class="room-cards-box">
      <img-card
        v-for="(room, index) in rooms"
        :key="`room-${index}`"
        :data="room"
        class="room-card"
      />
    </div>
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
