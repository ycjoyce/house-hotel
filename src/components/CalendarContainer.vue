<template>
  <div class="calendar-container">
    <div class="calendar-box">
      <button
				type="button"
        class="btn btn-pure btn-prev"
        @click="changeCalendar('prev')"
      ></button>

      <calendar
        v-for="calendar in calendars"
        :key="`${calendar.year}/${calendar.month}`"
        :month="calendar.month"
        :year="calendar.year"
        :limit-arange="limitArange"
        :lang="lang"
        :selected-date="selectedDate"
        :disabled-date="disabledDate"
        @selectDate="setSelectedDate"
      />

      <button
				type="button"
        class="btn btn-pure btn-next"
        @click="changeCalendar('next')"
      ></button>
    </div>

    <button
      v-if="reset"
      v-show="selectedDate.start || selectedDate.end"
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
		reset: {
			type: Boolean,
			default: false,
		},
		multiCalendar: {
			type: Boolean,
			default: false,
		},
		limitArange: Number,
		lang: {
			type: String,
			default: 'eng',
		},
		disabledDate: {
			type: Array,
			default: () => [],
		},
		startOnly: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			showDate: {},
			selectedDate: {
				start: null,
				end: null,
			},
		};
	},
	computed: {
		calendars() {
			const { month, year } = this.showDate;
			const calendars = [{ month, year }];
			if (this.multiCalendar) {
				calendars.push({
					month: month + 1 > 12 ? 1 : month + 1,
					year: month + 1 > 12 ? year + 1 : year,
				});
			}
			return calendars;
		},
		curDate() {
			const curDate = new Date();
			const month = curDate.getMonth() + 1;
			const year = curDate.getFullYear();

			return { month, year };
		},
	},
	methods: {
		changeCalendar(direction) {
			const { month } = this.showDate;

			switch (direction) {
			case 'prev':
				if (month < 2) {
					this.showDate.month = 12;
					this.showDate.year -= 1;
				} else {
					this.showDate.month -= 1;
				}
				break;
			case 'next':
				if (month > 11) {
					this.showDate.month = 1;
					this.showDate.year += 1;
				} else {
					this.showDate.month += 1;
				}
				break;
			default:
				break;
			}
		},
		resetCalendar() {
			this.setSelectedDate(null);
		},
		setSelectedDate(date) {
			if (!date) {
				this.selectedDate.start = null;
				this.selectedDate.end = null;
				return;
			}

			if (this.startOnly) {
				this.selectedDate.start = date;
				return;
			}

			const selectStart = new Date(this.selectedDate.start);
			const curSelect = new Date(date);
			let reSelectStart = !this.selectedDate.start;
			reSelectStart = reSelectStart || (this.selectedDate.start && this.selectedDate.end);

			const containDisabled = this.disabledDate.some((item) => {
				const start = selectStart < curSelect ? selectStart : curSelect;
				const end = start === selectStart ? curSelect : selectStart;
				const targetDate = new Date(item);
				return targetDate > start && targetDate < end;
			});

			if (reSelectStart || containDisabled) {
				this.selectedDate.start = date;
				this.selectedDate.end = null;
				return;
			}

			if (curSelect > selectStart) {
				this.selectedDate.end = date;
			} else if (curSelect < selectStart) {
				this.selectedDate.end = this.selectedDate.start;
				this.selectedDate.start = date;
			} else {
				this.selectedDate.end = null;
			}
		},
	},
	watch: {
		selectedDate: {
			deep: true,
			handler(val) {
				this.$emit('getCalendarDate', val);
			},
		},
	},
	created() {
		this.showDate = this.curDate;
	},
};
</script>
