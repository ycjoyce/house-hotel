<template>
  <div class="calendar-container">
    <p
      v-if="config && config.title"
      class="calendar-box-title"
    >
      {{config.title}}
    </p>

    <div class="calendar-box">
      <button
        class="btn btn-pure btn-prev"
        @click="changeCalendar('prev')"
      ></button>
      
      <calendar
        :month="showDate.month"
        :year="showDate.year"
      />

      <calendar
        :month="showDate.month + 1 > 12 ? 1 : showDate.month + 1"
        :year="showDate.month + 1 > 12 ? showDate.year + 1 : showDate.year"
      />

      <button
        class="btn btn-pure btn-next"
        @click="changeCalendar('next')"
      ></button>
    </div>

    <button
      v-if="config && config.reset"
      class="calendar-reset btn btn-pure btn-pure-secondary"
      @click="resetCalendar"
    >
      重新選取
    </button>
  </div>
</template>

<script>
import Calendar from '@src/components/Calendar.vue';

export default {
  components: {
    Calendar,
  },
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      showDate: {},
    };
  },
  computed: {
    curDate() {
      let curDate = new Date();
      let month = curDate.getMonth() + 1;
      let year = curDate.getFullYear();
      
      return {
        month,
        year,
      };
    },
  },
  methods: {
    changeCalendar(direction) {
      let month = this.showDate.month;

      switch (direction) {
        case 'prev':
          if (month < 2) {
            this.showDate.month = 12;
            this.showDate.year--;
          } else {
            this.showDate.month--;
          }
          break;
        case 'next':
          if (month > 11) {
            this.showDate.month = 1;
            this.showDate.year++;
          } else {
            this.showDate.month++;
          }
          break;
        default:
          break;
      }
    },
    resetCalendar() {
      this.$store.commit('setSelectDate', null);
    },
  },
  created() {
    this.showDate = this.curDate;
  },
}
</script>
