<template>
  <div>
    <label
      class="form-control"
      v-for="(title, index) in data.value"
      :key="'form-control-' + index"
    >
      <p class="form-control-title">
        {{title}}
      </p>
      
      <input
        class="form-control-input"
        :class="{ 'input-date': data.name === 'date' }"
        :readonly="data.name === 'date'"
        :type="inputType"
        :value="inputVal(data.name, title)"
        @input="emitVal(data.name, title)"
        @click="openCalendar(data.name)"
      >
    </label>
  </div>
</template>

<script>
import mixin from '@src/assets/js/mixin';

export default {
  mixins: [mixin],
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      calendarToOpen: null,
    };
  },
  computed: {
    inputType() {
      return this.data.name === 'tel' ? 'tel' : 'text';
    },
    inputVal() {
      return (name, title) => {
        if (name !== 'date') {
          const targetIndex = this.$store.state.inputData.findIndex((item) => item.title === title);
          return targetIndex > -1 ? this.$store.state.inputData[targetIndex].value : '';
        }
        const type = title === '入住日期' ? 'start' : 'end';
        if (type === 'start') {
          return this.$store.state.selectDate[type] || this.daysAfterToday(1);
        }
        return this.$store.state.selectDate[type] || this.daysAfterToday(2);
      };
    }
  },
  methods: {
    emitVal(name, title) {
      const val = {
        type: name,
        title,
        value: window.event.target.value,
      };
      this.$store.commit('getInputData', val);
    },
    openCalendar(name) {
      if (name !== 'date') {
        return;
      }
      const top = window.event.target.parentNode.offsetTop;
      const height = window.event.target.parentNode.offsetHeight;
      this.$store.commit('toggleCalendar', top + height);
    },
  },
}
</script>
