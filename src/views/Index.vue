<template>
  <div class="flex-container">
    <hotel-info
      class="flex-aside-sm"
      :slider="{
        id: sliderId,
        amount: sliderImages.length,
      }"
    />

    <room-cards
      class="flex-main"
      v-if="allRooms"
      :rooms="allRooms"
    />

    <slider
      :images="sliderImages"
      :period="5"
      :id="sliderId"
      class="pos-index"
    ></slider>
  </div>
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
      sliderId: Date.now(),
    };
  },
  created() {
    getAllRooms().then((res) => {
      this.allRooms = res.data.items;
    });

    this.$store.dispatch('initSlider', this.sliderId);
  },
}
</script>