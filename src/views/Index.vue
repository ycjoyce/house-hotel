<template>
  <div>
    <hotel-info/>
    <room-cards/>
  </div>
</template>

<script>
import HotelInfo from '@src/components/HotelInfo.vue';
import RoomCards from '@src/components/RoomCards.vue';

export default {
  components: {
    HotelInfo,
    RoomCards,
  },
}
</script>