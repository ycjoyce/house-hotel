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
    sliderIndex: [],
  },
  getters: {
    sliderIndex(state) {
      return (id) => {
        const targetIndex = state.sliderIndex.findIndex((item) => item.id === id);
        return state.sliderIndex[targetIndex].index;
      };
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
    setSliderIndex(state, data) {
      const existIndex = state.sliderIndex.findIndex((item) => item.id === data.id);
      if (existIndex > -1) {
        state.sliderIndex.splice(existIndex, 1, data);
      } else {
        state.sliderIndex.push(data);
      }
    },
  },
});

export default store;
