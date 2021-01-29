<template>
  <div class="calendar">
    <p class="calendar-title font-bold">
      {{monthMap[month]}} {{year}}
    </p>

    <table class="calendar-table">
      <tr class="weekday-row">
        <th
          v-for="(day, index) in weekday"
          :key="'day-' + index"
          class="weekday-item font-bold"
        >
          {{day}}
        </th>
      </tr>

      <tr
        v-for="weekNo in weekAmt"
        :key="'week-' + weekNo"
        class="week-row"
      >
        <td
          class="week-date-item"
          :class="{ 
            disabled: hasPassed(dateStr(weekNo, dateNo - 1)) ||
                      exceedLimit(dateStr(weekNo, dateNo - 1)) ||
                      !calDate(weekNo, dateNo - 1),
            empty: !calDate(weekNo, dateNo - 1),
            start: $store.state.selectDate.start === dateStr(weekNo, dateNo - 1),
            end: $store.state.selectDate.end === dateStr(weekNo, dateNo - 1),
            middle: calMiddle(weekNo, dateNo - 1),
          }"
          v-for="dateNo in 7"
          :key="'date-' + dateNo"
          @click="setSelectDate(`${year}/${month}/${calDate(weekNo, dateNo - 1)}`)"
        >
          {{calDate(weekNo, dateNo - 1)}}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      monthMap: {
        1: 'January',
        2: 'Febuary',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
      },
      weekday: [
        'Su',
        'Mo',
        'Tu',
        'We',
        'Th',
        'Fr',
        'Sa',
      ],
      today: new Date(new Date().toLocaleDateString()),
      limitDays: 90,
    };
  },
  computed: {
    selectedDateStart() {
      return this.$store.state.selectDate.start;
    },
    selectedDateEnd() {
      return this.$store.state.selectDate.end;
    },
    monthLength() {
      let length;
      let yearType;

      if (this.year % 4 !== 0 || (this.year % 100 === 0 && this.year % 400 !== 0)) {
        yearType = 'normal';
      } else {
        yearType = 'leap';
      }

      length = [31, yearType === 'normal' ? 28 : 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      
      return length[this.month - 1];
    },
    firstday() {
      let firstday = {
        date: `${this.year}/${this.month}/1`,
      };
      firstday.weekday = new Date(firstday.date).getDay();

      return firstday;
    },
    weekAmt() {
      let leftDays;
      let weekAmt = 5;

      if (this.monthLength >= 29) {
        leftDays = this.monthLength - 29;
        if (this.firstday.weekday + leftDays > 6) {
          weekAmt++;
        }
      } else {
        weekAmt = 4;
        leftDays = this.monthLength - 22;
        if (this.firstday.weekday+leftDays > 6) {
          weekAmt++;
        }
      }

      return weekAmt;
    },
    calDate() {
      return (weekNo, dateNo) => {
        const date = 1 + 7 * (weekNo - 1) - (this.firstday.weekday - dateNo);
        return date > this.monthLength || date < 1 ? null : date;
      };
    },
    hasPassed() {
      return (date) => {
        const targetDay = new Date(date);
        return targetDay < this.today;
      };
    },
    exceedLimit() {
      return (date) => {
        if (!this.selectedDateStart) {
          return false;
        }
        const startDay = new Date(this.selectedDateStart);
        const targetDay = new Date(date);
        const days = (targetDay - startDay) / 1000 / 60 / 60 / 24;
        return days > this.limitDays;
      };
    },
    dateStr() {
      return (week, date) => (
        `${this.year}/${this.month}/${this.calDate(week, date)}`
      );
    },
    calMiddle() {
      return (week, date) => {
        const targetDay = new Date(this.dateStr(week, date));
        const startDay = new Date(this.selectedDateStart);
        const endDay = new Date(this.selectedDateEnd);
        return targetDay > startDay && targetDay < endDay;
      };
    },
  },
  methods: {
    setSelectDate(date) {
      if (window.event.target.classList.contains('disabled')) {
        return;
      }
      this.$store.commit('setSelectDate', date);
    },
  },
}
</script>