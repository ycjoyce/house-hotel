<template>
  <aside class="hotel-info">
    <div class="hotel-info-logo-box">
      <img
        :src="hotelLogo"
        alt="好室House Hotel"
        class="hotel-info-logo"
      >
    </div>
    
    <ul class="hotel-info-list">
      <li class="hotel-info-item">
        好室旅店。HOUSE HOTEL
      </li>

      <li class="hotel-info-item">
        花蓮縣花蓮市國聯一路1號
      </li>

      <li class="hotel-info-item font-light">
        03-8321155
      </li>

      <li class="hotel-info-item font-light">
        HOUSE@HOTEL.COM
      </li>
    </ul>  

    <slider-dots
      :id="slider.id"
      :amount="slider.amount"
    />
  </aside>
</template>

<script>
import SliderDots from '@src/components/SliderDots.vue';

export default {
  components: {
    SliderDots,
  },
  props: {
    slider: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hotelLogo: require('@img/house-logo.svg'),
    };
  },
}
</script>