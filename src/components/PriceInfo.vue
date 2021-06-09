<template>
  <aside
    v-if="$store.state.curRoomDetail"
  >
    <slider-box
      :images="sliderImages"
      :period="5"
      :autoplay="true"
      :coloredDots="true"
      class="pos-intro price-info"
      @click.native.self="toggleModal('lightBox', true)"
    >
      <router-link
        :to="{ path: '/' }"
        class="btn btn-pure btn-pure-primary btn-back price-info-back"
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
          {{bookingBtn.title}}
        </solid-btn>
      </div>
    </slider-box>
  </aside>
</template>

<script>
import mixin from '@src/assets/js/mixin';

import SliderBox from '@src/components/SliderBox.vue';
import SolidBtn from '@src/components/SolidBtn.vue';

export default {
  mixins: [mixin],
  components: {
    SliderBox,
    SolidBtn,
  },
  data() {
    return {
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
}
</script>