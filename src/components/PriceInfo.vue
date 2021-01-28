<template>
  <aside v-if="$store.state.curRoomDetail">
    <slider :images="sliderImages">
      <router-link
        :to="{ path: '/' }"
        class="btn btn-pure btn-primary btn-back"
      >
        查看其他房型
      </router-link>

      <p class="room-price">
        ${{totalPrice}} / {{totalNights}}晚 
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
  computed: {
    sliderImages() {
      return this.$store.state.curRoomDetail.imageUrl;
    },
    normalDayPrice() {
      return this.$store.state.curRoomDetail.normalDayPrice;
    },
    holidayPrice() {
      return this.$store.state.curRoomDetail.holidayPrice;
    },
    selectedDateStart() {
      return this.$store.state.selectDate.start;
    },
    selectedDateEnd() {
      return this.$store.state.selectDate.end;
    },
    dayTypeCount() {
      let result = {
        holiday: 0,
        normal: 0,
      };
      if (!this.selectedDateStart && !this.selectedDateEnd) {
        return result;
      }
      const newDateStart = new Date(this.selectedDateStart);
      const newDateEnd = new Date(this.selectedDateEnd);
      const weekdayStart = newDateStart.getDay();
      const nights = (newDateEnd - newDateStart) / 1000 / 60 / 60 / 24;
      let weekDays = [];
      for (let i = 0; i <= nights - 1; i++) {
        weekDays.push(weekdayStart + i > 6 ? weekdayStart + i - 7 : weekdayStart + i);
      }
      weekDays.forEach((day) => {
        if ([0, 5, 6].includes(day)) {
          result.holiday += 1;
          return;
        }
        result.normal += 1;
      });
      return result;
    },
    totalNights() {
      if (!this.selectedDateEnd) {
        return 1;
      } else {
        return this.dayTypeCount.holiday + this.dayTypeCount.normal;
      }
    },
    totalPrice() {
      const holidayPrice = this.dayTypeCount.holiday * this.holidayPrice;
      const normalDayPrice = this.dayTypeCount.normal * this.normalDayPrice;
      const today = new Date().getDay();
      const startDay = new Date(this.selectedDateStart).getDay();

      if (!this.selectedDateStart && !this.selectedDateEnd) {
        return this.dayType(today) === 'holiday' ? this.holidayPrice : this.normalDayPrice;
      } else if (this.selectedDateStart && !this.selectedDateEnd) {
        return this.dayType(startDay) === 'holiday' ? this.holidayPrice : this.normalDayPrice;
      } else {
        return holidayPrice + normalDayPrice;
      }
    },
    dayType() {
      return (day) => {
        return [0, 5, 6].includes(day) ? 'holiday' : 'normal';
      };
    },
  },
}
</script>

<style>

</style>