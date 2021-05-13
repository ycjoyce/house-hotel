<template>
  <aside
    v-if="$store.state.curRoomDetail"
    class="price-info"
    @click.self="toggleModal('lightBox', true)"
  >
    <router-link
      :to="{ path: '/' }"
      class="btn btn-pure btn-pure-primary btn-back"
    >
      查看其他房型
    </router-link>

    <div class="price-info-main">
      <div class="room-price-box">
        <p class="room-price font-secondary">
          ${{formatNum(totalPrice)}}
        </p>
        
        <p class="room-price-nights font-tertiary">
          {{totalNights}}晚
        </p>
      </div>

      <solid-btn
        :data="bookingBtn"
        class="room-reserve btn-solid-primary"
      >
        Booking now
      </solid-btn>

      <slider-dots
        :id="sliderId"
        :amount="sliderImages.length"
        class="colored"
      />
    </div>
    
    <slider
      :images="sliderImages"
      :period="5"
      :id="sliderId"
      class="pos-intro"
    />
  </aside>
</template>

<script>
import mixin from '@src/assets/js/mixin';

import Slider from '@src/components/Slider.vue';
import SliderDots from '@src/components/SliderDots.vue';
import SolidBtn from '@src/components/SolidBtn.vue';

export default {
  mixins: [mixin],
  components: {
    Slider,
    SliderDots,
    SolidBtn,
  },
  data() {
    return {
      sliderId: Date.now(),
      bookingBtn: {
        title: 'Booking now',
        method: () => {
          this.$store.commit('toggleModalStatus', {
            type: 'reservePop',
            status: true,
          });
        },
      },
    };
  },
  computed: {
    sliderImages() {
      return this.$store.state.curRoomDetail.imageUrl;
    },
  },
  methods: {
    toggleModal(type, status) {
      this.$store.commit('toggleModalStatus', {
        type,
        status,
      });
    },
  },
  created() {
    this.$store.dispatch('initSlider', this.sliderId);
  },
}
</script>