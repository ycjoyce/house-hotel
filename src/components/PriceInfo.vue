<template>
  <aside>
    <slider>
      <router-link
        to=""
        class="btn btn-pure btn-primary btn-back"
      >
        查看其他房型
      </router-link>

      <p class="room-price">
        ${1,380} / {1}晚 
      </p>

      <solid-btn :data="bookingBtn"></solid-btn>
    </slider>
  </aside>
</template>

<script>
import Slider from '@src/components/Slider.vue';
import SolidBtn from '@src/components/SolidBtn.vue';

export default {
  components: {
    Slider,
    SolidBtn,
  },
  data() {
    return {
      bookingBtn: {
        title: 'Booking now',
        method() {
          console.log('hi');
        },
      },
    };
  },
  provide() {
    return {
      sliderAmount: 4,
    };
  },
}
</script>

<style>

</style>