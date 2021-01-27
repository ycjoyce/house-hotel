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

export default {
  components: {
    PriceInfo,
    RoomDetail,
    LightBox,
    ReservePop,
  },
}
</script>

<style>

</style>