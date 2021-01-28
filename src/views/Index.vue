<template>
  <slider :images="sliderImages">
    <hotel-info/>

    <room-cards
      v-if="allRooms"
      :rooms="allRooms"
    />
  </slider>
</template>

<script>
import Slider from '@src/components/Slider.vue';
import HotelInfo from '@src/components/HotelInfo.vue';
import RoomCards from '@src/components/RoomCards.vue';

import { getAllRooms } from '@src/assets/js/getData';

export default {
  components: {
    Slider,
    HotelInfo,
    RoomCards,
  },
  data() {
    return {
      allRooms: null,
      sliderImages: [
        require('@img/house-1.jpeg'),
        require('@img/house-2.jpeg'),
        require('@img/house-3.jpeg'),
        require('@img/house-4.jpeg'),
      ],
    };
  },
  created() {
    getAllRooms().then((res) => {
      this.allRooms = res.data.items;
    });
  },
}
</script>