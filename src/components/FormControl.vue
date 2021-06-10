<template>
  <div>
    <label class="form-control">
      <p class="form-control-title">
        {{title}}
      </p>
      
      <input
        maxlength="10"
        class="form-control-input"
        :class="{ 'input-date': type === 'date' }"
        :readonly="type === 'date'"
        :type="type === 'tel' ? 'tel' : 'text'"
        :data-title="title"
        :value="inputVal"
        @change="emitVal($event)"
        @click="openCalendar($event)"
      >
    </label>

    <calendar-container
      v-if="type === 'date'"
      v-show="calendarOpened === title"
      :style="{ top: `${calendarPos}px` }"
      lang="eng"
      :limit-arange="90"
      :multi-calendar="true"
      :reset="false"
      :disabled-date="$store.getters.disabledDate"
      @getCalendarDate="setCalendarDate"
    />
  </div>
</template>

<script>
import mixin from '@src/assets/js/mixin';
import CalendarContainer from '@src/components/CalendarContainer.vue';

export default {
  mixins: [mixin],
  components: {
    CalendarContainer,
  },
  props: {
    type: String,
    title: String,
    calendarOpened: String,
    value: String,
  },
  data() {
    return {
      calendarToOpen: null,
      inputVal: '',
      calendarPos: false,
    };
  },
  methods: {
    setCalendarDate(data) {
      this.$store.commit('setSelectDate', data);
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

      const val = {
        type: this.type,
        title: this.title,
        value: this.inputVal,
      };

      this.$emit('getInputData', val);
    },
    checkTel(val) {
      const reg = /^09([0-9]{2})([0-9]{3})([0-9]{3})$/;
      if(reg.test(val)){
        return {
          status: true,
        };
      }
      return {
        status: false,
        msg:'請輸入正確行動電話',
      };
    },
    openCalendar(e) {
      if (this.type !== 'date') {
        return;
      }
      const top = e.target.parentNode.offsetTop;
      const height = e.target.parentNode.offsetHeight;
      this.calendarPos = top + height;
      this.$emit('calendarOpened', this.title);
    },
  },
  watch: {
    value(val) {
      this.inputVal = val;
      const sendVal = {
        type: this.type,
        title: this.title,
        value: this.inputVal,
      };
      this.$emit('getInputData', sendVal);
    },
  },
  created() {
    if (this.value) {
      this.inputVal = this.value;
    }
  },
}
</script>
