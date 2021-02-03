import {
  formattedDateStr,
  dayDistance,
  getDateArr,
} from '@src/assets/js/util';

export default {
  data() {
    return {
      dayDistance,
    };
  },
  computed: {
    selectedDateStart() {
      return this.$store.state.selectDate.start;
    },
    selectedDateEnd() {
      return this.$store.state.selectDate.end;
    },
    normalDayPrice() {
      return this.$store.state.curRoomDetail.normalDayPrice;
    },
    holidayPrice() {
      return this.$store.state.curRoomDetail.holidayPrice;
    },
    daysAfterToday() {
      return (days) => {
        const targetDay = new Date(new Date().getTime() + days * this.dayDistance);
        return targetDay.toLocaleDateString();
      };
    },
    formattedDateStr() {
      return (dateStr) => formattedDateStr(dateStr);
    },
    dayTypeCount() {
      const result = {
        holiday: 0,
        normal: 0,
      };
      if (!this.selectedDateStart && !this.selectedDateEnd) {
        const today = new Date().getDay();
        const todayType = this.dayType(today);
        result[todayType] += 1;
        return result;
      }
      if (!this.selectedDateEnd) {
        const startDay = new Date(this.selectedDateStart).getDay();
        const startDayType = this.dayType(startDay);
        result[startDayType] += 1;
        return result;
      }
      const newDateStart = new Date(this.selectedDateStart);
      const newDateEnd = new Date(this.selectedDateEnd);
      const weekdayStart = newDateStart.getDay();
      const nights = (newDateEnd - newDateStart) / this.dayDistance;
      const weekDays = [];
      for (let i = 0; i <= nights - 1; i += 1) {
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
      }
      return this.dayTypeCount.holiday + this.dayTypeCount.normal;
    },
    totalPrice() {
      const holidayPrice = this.dayTypeCount.holiday * this.holidayPrice;
      const normalDayPrice = this.dayTypeCount.normal * this.normalDayPrice;
      const today = new Date().getDay();
      const startDay = new Date(this.selectedDateStart).getDay();

      if (!this.selectedDateStart && !this.selectedDateEnd) {
        return this.dayType(today) === 'holiday' ? this.holidayPrice : this.normalDayPrice;
      }
      if (this.selectedDateStart && !this.selectedDateEnd) {
        return this.dayType(startDay) === 'holiday' ? this.holidayPrice : this.normalDayPrice;
      }
      return holidayPrice + normalDayPrice;
    },
    dayType() {
      return (day) => (
        [0, 5, 6].includes(day) ? 'holiday' : 'normal'
      );
    },
    formatNum() {
      return (num) => {
        const arrNum = `${num}`.split('').reverse();
        for (let i = 2; i < arrNum.length - 1; i += 4) {
          arrNum.splice(i + 1, 0, ',');
        }
        return arrNum.reverse().join('');
      };
    },
    checkBooked() {
      return (date) => {
        const bookedDates = this.$store.state.curRoomBooked.map((item) => item.date);
        return bookedDates.includes(this.formattedDateStr(date));
      };
    },
    dateDefaultVal() {
      return (title) => {
        const type = title === '入住日期' ? 'start' : 'end';
        if (!this.selectedDateStart && !this.selectedDateEnd) {
          const daysAfter = title === '入住日期' ? 1 : 2;
          return this.checkBooked(this.daysAfterToday(1)) ? '' : this.daysAfterToday(daysAfter);
        }
        if (!this.selectedDateEnd) {
          if (type === 'start') return this.selectedDateStart;
          let nextDay = new Date(this.selectedDateStart).getTime() + this.dayDistance;
          nextDay = new Date(nextDay).toLocaleDateString();
          return nextDay;
        }
        return this.$store.state.selectDate[type];
      };
    },
  },
  methods: {
    getDateArr(start, end) {
      return getDateArr(start, end);
    },
  },
};
