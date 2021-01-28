<template>
  <div>
    <reserve-pop/>
    <light-box/>
    <price-info/>
    <room-detail/>
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

<style>

</style>