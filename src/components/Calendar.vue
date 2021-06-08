<template>
  <div class="calendar">
    <p class="calendar-title font-bold">
      {{monthMap[month][lang]}} {{year}}
    </p>

    <table class="calendar-table">
      <tr class="weekday-row">
        <th
          v-for="day in weekday"
          :key="day.eng"
          class="weekday-item font-bold"
        >
          {{day[lang]}}
        </th>
      </tr>

      <tr
        v-for="weekNo in weekAmt"
        :key="weekNo"
        class="week-row"
      >
        <td
          v-for="dateNo in 7"
          :key="dateNo"
          class="week-date-item"
          :class="{
            disabled: hasPassed(weekNo, dateNo - 1) ||
                      (limitArange && exceedLimit(weekNo, dateNo - 1)) ||
                      !calDate(weekNo, dateNo - 1) ||
                      disabledDate.includes(dateStr(weekNo, dateNo - 1)),
            empty: !calDate(weekNo, dateNo - 1),
            middle: calMiddle(weekNo, dateNo - 1),
            start: dateStr(weekNo, dateNo - 1) === selectedDate.start,
            end: dateStr(weekNo, dateNo - 1) === selectedDate.end,
          }"
          @click="setSelectedDate($event, weekNo, dateNo - 1)"
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
    month: Number,
    year: Number,
    limitArange: Number,
    lang: String,
    selectedDate: Object,
    disabledDate: Array,
  },
  data() {
    return {
      monthMap: {
        1: {
          eng: 'January',
          ch: '一月',
        },
        2: {
          eng: 'Febuary',
          ch: '二月',
        },
        3: {
          eng: 'March',
          ch: '三月',
        },
        4: {
          eng: 'April',
          ch: '四月',
        },
        5: {
          eng: 'May',
          ch: '五月',
        },
        6: {
          eng: 'June',
          ch: '六月',
        },
        7: {
          eng: 'July',
          ch: '七月',
        },
        8: {
          eng: 'August',
          ch: '八月',
        },
        9: {
          eng: 'September',
          ch: '九月',
        },
        10: {
          eng: 'October',
          ch: '十月',
        },
        11: {
          eng: 'November',
          ch: '十一月',
        },
        12: {
          eng: 'December',
          ch: '十二月',
        },
      },
      weekday: [
        {
          eng: 'Su',
          ch: '日',
        },
        {
          eng: 'Mo',
          ch: '一',
        },
        {
          eng: 'Tu',
          ch: '二',
        },
        {
          eng: 'We',
          ch: '三',
        },
        {
          eng: 'Th',
          ch: '四',
        },
        {
          eng: 'Fr',
          ch: '五',
        },
        {
          eng: 'Sa',
          ch: '六',
        },
      ],
      dayDistance: 24 * 60 * 60 * 1000,
    };
  },
  computed: {
    monthLength() {
      let yearType = 'leap';

      if (this.year % 4 !== 0 || (this.year % 100 === 0 && this.year % 400 !== 0)) {
        yearType = 'normal';
      }

      const length = [31, yearType === 'normal' ? 28 : 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      return length[this.month - 1];
    },
    firstday() {
      const firstday = {
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
          weekAmt += 1;
        }
      } else {
        weekAmt = 4;
        leftDays = this.monthLength - 22;
        if (this.firstday.weekday + leftDays > 6) {
          weekAmt += 1;
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
      return (week, date) => {
        const targetDay = new Date(this.dateStr(week, date));
        const today = new Date(new Date().toLocaleDateString());
        return targetDay <= today;
      };
    },
    exceedLimit() {
      return (week, date) => {
        const startDay = new Date(Date.now());
        const targetDay = new Date(this.dateStr(week, date));
        const days = (targetDay - startDay) / this.dayDistance;
        return days > this.limitArange;
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
        const startDay = new Date(this.selectedDate.start);
        const endDay = new Date(this.selectedDate.end);
        return targetDay > startDay && targetDay < endDay;
      };
    },
  },
  methods: {
    setSelectedDate(e, week, date) {
      if (e.target.classList.contains('disabled')) {
        return;
      }
      this.$emit('selectDate', this.dateStr(week, date));
    },
  },
};
</script>
