<template>
  <div v-if="$store.state.curRoomDetail">
    <component
      :is="showContent"
      :room-name="roomName"
      :room-desc="roomDesc"
      :normal-day-price="normalDayPrice"
      :holiday-price="holidayPrice"
      :check-in-and-out="checkInAndOut"
      :room-intro="roomIntro"
      :amenities="amenities"
    ></component>
  </div>
</template>

<script>
import RoomDetailComplex from '@src/components/RoomDetailComplex.vue';
import RoomDetailSimple from '@src/components/RoomDetailSimple.vue';

export default {
  props: {
    simple: {
      type: Boolean,
      required: false,
    },
  },
  components: {
    RoomDetailComplex,
    RoomDetailSimple,
  },
  computed: {
    showContent() {
      return this.simple ? 'RoomDetailSimple' : 'RoomDetailComplex';
    },
    roomName() {
      return this.$store.state.curRoomDetail.name;
    },
    roomDesc() {
      const desc = this.$store.state.curRoomDetail.descriptionShort;
      const guestMin = desc.GuestMin;
      const guestMax = desc.GuestMax;
      const person = guestMin === guestMax ? `${guestMin}人` : `最少${guestMin}人-最多${guestMax}人`;
      const bed = desc.Bed.map((type) => `${type} Bed`).join('、');
      const bath = `衛浴${desc['Private-Bath']}間`;
      const footage = `${desc.Footage}平方公尺`;
      const strArr = [
        person,
        bed,
        bath,
        footage,
      ];
      return strArr.join('・');
    },
    normalDayPrice() {
      return this.$store.state.curRoomDetail.normalDayPrice;
    },
    holidayPrice() {
      return this.$store.state.curRoomDetail.holidayPrice;
    },
    checkInAndOut() {
      return this.$store.state.curRoomDetail.checkInAndOut;
    },
    roomIntro() {
      let intro = this.$store.state.curRoomDetail.description;
      intro = intro.split('.').filter((item) => item).map((item) => `${item}.`);
      return intro;
    },
    amenities() {
      return this.$store.state.curRoomDetail.amenities;
    },
  },
}
</script>