<template>
  <div class="flex-container">
    <reserve-pop v-show="false"/>

    <light-box v-show="false"/>

    <price-info class="flex-aside-lg"/>

    <room-detail class="flex-main"/>
  </div>
</template>

<script>
import PriceInfo from '@src/components/PriceInfo.vue';
import RoomDetail from '@src/components/RoomDetail.vue';
import LightBox from '@src/components/LightBox.vue';
import ReservePop from '@src/components/ReservePop.vue';

import { getRoomDetail } from '@src/assets/js/getData';

export default {
  components: {
    PriceInfo,
    RoomDetail,
    LightBox,
    ReservePop,
  },
  data() {
    return {
      roomId: null,
    };
  },
  created() {
    this.roomId = this.$route.params.id;
    
    getRoomDetail(this.roomId).then((res) => {
      this.$store.commit('setCurRoomDetail', res.data.room[0]);
    });
  },
}
</script>