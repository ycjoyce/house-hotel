<template>
  <div v-click-outside="closeCalendar">
    <label class="form-control">
      <p class="form-control-title">
        {{title}}
      </p>

      <input
        maxlength="10"
        class="form-control-input"
        :class="{ 'input-date': type === 'date' }"
        :readonly="type === 'date'"
        :type="type === 'date' ? 'text' : type"
        :data-title="title"
        :value="inputVal"
        @change="emitVal($event)"
        @click="openCalendar($event)"
      >
    </label>

    <calendar-container
      v-if="type === 'date'"
      v-show="calendarOpened"
      :style="{ top: `${calendarPos}px` }"
      lang="eng"
      :limit-arange="90"
      :multi-calendar="true"
      :reset="false"
      :disabled-date="disabledDate"
			:start-only="startOnly"
      @getCalendarDate="setCalendarDate"
    />
  </div>
</template>

<script>
import CalendarContainer from '@src/components/CalendarContainer.vue';
import clickOutside from '@src/assets/js/clickOutside';

export default {
	components: {
		CalendarContainer,
	},
	directives: {
		clickOutside,
	},
	props: {
		type: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		disabledDate: {
			type: Array,
			default: () => [],
		},
		defaultValue: String,
		startOnly: Boolean,
	},
	data() {
		return {
			inputVal: '',
			calendarPos: null,
      calendarOpened: false,
		};
	},
	methods: {
		setCalendarDate(data) {
			this.inputVal = `${data.start}`;
			if (data.end) {
				this.inputVal += `-${data.end}`;
      }

			const sendVal = {
				type: this.type,
				title: this.title,
				value: data,
			};
			this.$emit('getInputData', sendVal);
		},
		emitVal(e) {
			this.inputVal = e.target.value;

			if (!this.inputVal) {
				return;
			}

			if (this.type === 'tel' && !this.checkTel(this.inputVal).status) {
				alert(this.checkTel(this.inputVal).msg);
				this.inputVal = '';
				return;
			}

			this.sendInputData(this.inputVal);
		},
		checkTel(val) {
			const reg = /^09([0-9]{2})([0-9]{3})([0-9]{3})$/;
			if (reg.test(val)) {
				return {
					status: true,
				};
			}
			return {
				status: false,
				msg: '請輸入正確行動電話',
			};
		},
		openCalendar(e) {
			if (this.type !== 'date') {
				return;
			}
			const top = e.target.parentNode.offsetTop;
			const height = e.target.parentNode.offsetHeight;
			this.calendarPos = top + height;
			this.calendarOpened = true;
		},
		closeCalendar() {
			if (this.type !== 'date') {
				return;
			}
			this.calendarOpened = false;
		},
		sendInputData(val) {
			const sendVal = {
				type: this.type,
				title: this.title,
				value: val,
			};
			this.$emit('getInputData', sendVal);
		},
		setDefaultVal(val) {
			if (this.type !== 'date') {
				this.inputVal = val;
				this.sendInputData(this.inputVal);
				return;
			}
			const dates = this.defaultValue.split('-');
			let start = null;
			let end = null;
			if (this.startOnly && dates.length > 1) {
				throw new Error('startOnly為true,預設日期不可為期間');
			}
			if (dates.length > 1) {
				start = new Date(dates[0]) <= new Date(dates[1]) ? dates[0] : dates[1];
				end = start === dates[0] ? dates[1] : dates[0];
			} else {
				[start] = dates;
			}
			const dateData = {
				start,
				end,
			};
			this.setCalendarDate(dateData);
		},
	},
	watch: {
		defaultValue(val) {
			this.setDefaultVal(val);
		},
	},
	created() {
		if (this.defaultValue) {
			this.setDefaultVal(this.defaultValue);
		}
	},
};
</script>
