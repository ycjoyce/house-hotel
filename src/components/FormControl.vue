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
        maxlength="10"
        class="form-control-input"
        :class="{ 'input-date': data.name === 'date' }"
        :readonly="data.name === 'date'"
        :type="inputType"
        :value="inputVal(data.name, title)"
        @change="emitVal(data.name, title)"
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
        return this.dateDefaultVal(title);
      };
    }
  },
  methods: {
    emitVal(name, title) {
      if (name === 'tel' && !this.checkTel(window.event.target.value).status) {
        alert(this.checkTel(window.event.target.value).msg);
        window.event.target.value = '';
        return;
      }
      const val = {
        type: name,
        title,
        value: window.event.target.value,
      };
      this.$store.commit('getInputData', val);
    },
    checkTel(val) {
      const reg = /^09([0-9]{2})-?([0-9]{3})-?([0-9]{3})$/;
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
