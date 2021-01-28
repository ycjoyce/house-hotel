import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
const store = new Vuex.Store({
  state: {
    curRoomDetail: null,
    selectDate: {
      start: null,
      end: null,
    },
  },
  mutations: {
    setCurRoomDetail(state, data) {
      state.curRoomDetail = data;
    },
    setSelectDate(state, date) {
      const selectStart = new Date(state.selectDate.start);
      const curSelect = new Date(date);

      if (!state.selectDate.start || (state.selectDate.start && state.selectDate.end)) {
        state.selectDate.start = date;
        state.selectDate.end = null;
        return;
      }

      if (curSelect > selectStart) {
        state.selectDate.end = date;
      } else if (curSelect < selectStart) {
        state.selectDate.end = state.selectDate.start;
        state.selectDate.start = date;
      } else {
        state.selectDate.end = null;
      }
    },
  },
});

export default store;
