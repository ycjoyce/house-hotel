<template>
  <div class="flex-container">
    <slider-box
      ref="slider-box"
      class="pos-index"
      :images="sliderImages"
      :period="5"
      :autoplay="true"
      :dots-left="sliderDotsLeft"
    />
    
    <hotel-info
      class="flex-aside-sm"
      ref="hotel-info"
    />

    <room-cards
      class="flex-main"
      v-if="allRooms"
      :rooms="allRooms"
    />
  </div>
</template>

<script>
import SliderBox from '@src/components/SliderBox.vue';
import HotelInfo from '@src/components/HotelInfo.vue';
import RoomCards from '@src/components/RoomCards.vue';

import { getAllRooms } from '@src/apis/getData';

export default {
  components: {
    SliderBox,
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
      sliderDotsLeft: '',
      dotsEl: null,
      asideEl: null,
    };
  },
  methods: {
    setDotsPos() {
      const dotsWidth = this.dotsEl.offsetWidth;
      const asideWidth = this.asideEl.offsetWidth;
      this.sliderDotsLeft = `${(asideWidth - dotsWidth) / 2}px`;
    },
  },
  created() {
    getAllRooms().then((res) => {
      this.allRooms = res.data.items;
    });
  },
  mounted() {
    this.dotsEl = this.$refs['slider-box'].$children.find((child) => (
      child.$el.matches('.slider-dots')
    )).$el;
    this.asideEl = this.$refs['hotel-info'].$el;
    if (this.dotsEl) {
      this.setDotsPos();
      window.addEventListener('resize', this.setDotsPos);
    }
  },
  beforeDestroy() {
    if (this.dotsEl) {
      window.removeEventListener('resize', this.setDotsPos);
    }
  },
}
</script>