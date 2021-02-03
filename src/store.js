import Vue from 'vue';
import Vuex from 'vuex';
import {
  formattedDateStr,
  getDateArr,
} from '@src/assets/js/util';

Vue.use(Vuex);

/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
const store = new Vuex.Store({
  state: {
    curRoomDetail: null,
    curRoomBooked: [],
    selectDate: {
      start: null,
      end: null,
    },
    sliderIndex: [],
    modalStatus: {
      lightBox: false,
      reservePop: false,
    },
    showCalendar: false,
    inputData: [],
    popContent: {
      type: 'Editting',
      status: null,
    },
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
    setCurRoomBooked(state, data) {
      state.curRoomBooked = data;
    },
    addCurRoomBooked(state, data) {
      state.curRoomBooked = state.curRoomBooked.concat(data);
    },
    setSelectDate(state, date) {
      if (!date) {
        state.selectDate.start = null;
        state.selectDate.end = null;
        return;
      }

      const selectStart = new Date(state.selectDate.start);
      const curSelect = new Date(date);

      if (!state.selectDate.start || (state.selectDate.start && state.selectDate.end)) {
        state.selectDate.start = date;
        state.selectDate.end = null;
        return;
      }

      const selectedDates = getDateArr(state.selectDate.start, date);
      const bookedDates = state.curRoomBooked.map((book) => book.date);
      const result = selectedDates.map((selectedDate) => (
        bookedDates.includes(formattedDateStr(selectedDate))
      ));

      if (result.includes(true)) {
        state.selectDate.end = null;
        state.selectDate.start = date;
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
    toggleModalStatus(state, { type, status }) {
      state.modalStatus[type] = status;
    },
    toggleCalendar(state, data) {
      if (!data) {
        state.showCalendar = false;
        return;
      }
      state.showCalendar = data;
    },
    getInputData(state, data) {
      if (!data) {
        state.inputData.splice(0);
        return;
      }
      const targetIndex = state.inputData.findIndex((item) => (
        item.type === data.type && item.title === data.title
      ));
      if (targetIndex > -1) {
        state.inputData.splice(targetIndex, 1, data);
        return;
      }
      state.inputData.push(data);
    },
    setPopContent(state, { type, status = null }) {
      state.popContent.type = type;
      state.popContent.status = status;
    },
  },
  actions: {
    initSlider({ commit }, id) {
      commit('setSliderIndex', {
        id,
        index: 0,
      });
    },
    initAllData({ commit }) {
      commit('setSelectDate', false);
      commit('getInputData', false);
    },
  },
});

export default store;
