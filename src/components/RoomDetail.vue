<template>
  <main v-if="$store.state.curRoomDetail">
    <div class="room-type">
      <h1 class="room-type-name">
        {{roomName}}
      </h1>

      <p class="room-type-desc">
        {{roomDesc}}
      </p>
    </div>

    <ul class="room-basic-list">
      <li class="room-basic-item">
        平日（一～四）價格：{{normalDayPrice}}  /  假日（五〜日）價格：{{holidayPrice}}
      </li>

      <li class="room-basic-item">
        入住時間：{{checkInAndOut.checkInEarly}}（最早） /  {{checkInAndOut.checkInLate}}（最晚）
      </li>

      <li class="room-basic-item">
        退房時間：{{checkInAndOut.checkOut}}
      </li>
    </ul>

    <ul class="room-intro-list">
      <li
        v-for="(intro, index) in roomIntro"
        :key="'intro-' + index"
        class="room-intro-item"
      >
        {{intro}}
      </li>
    </ul>

    <amenity-box :amenities="amenities"/>

    <calendar-container :config="calendarConfig"/>
  </main>
</template>

<script>
import AmenityBox from '@src/components/AmenityBox.vue';
import CalendarContainer from '@src/components/CalendarContainer.vue';

export default {
  components: {
    AmenityBox,
    CalendarContainer,
  },
  data() {
    return {
      calendarConfig: {
        title: '空房狀態查詢',
        reset: true,
      },
    };
  },
  computed: {
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

<style>

</style>