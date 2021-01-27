<template>
  <aside>
    <slider>
      <img
        src=""
        alt="好室House Hotel"
        class="hotel-logo"
      >

      <ul class="hotel-info-list">
        <li class="hotel-info-item">
          好室旅店。HOUSE HOTEL
        </li>

        <li class="hotel-info-item">
          花蓮縣花蓮市國聯一路1號
        </li>

        <li class="hotel-info-item">
          03-8321155
        </li>

        <li class="hotel-info-item">
          HOUSE@HOTEL.COM
        </li>
      </ul>  
    </slider>
  </aside>
</template>

<script>
import Slider from '@src/components/Slider.vue';

export default {
  components: {
    Slider,
  },
  provide() {
    return {
      sliderAmount: 4,
    };
  },
}
</script>