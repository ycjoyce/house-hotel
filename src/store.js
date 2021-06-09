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
		selectedDate: {
			start: null,
			end: null,
		},
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
		disabledDate(state) {
			return state.curRoomBooked.map((item) => item.date).map((item) => (
				item.split('-').map((e) => {
					let res = e;
					if (e.startsWith('0')) {
						res = e.substr(1);
					}
					return res;
				}).join('/')
			));
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
		setSelectDate(state, data) {
			if (!data) {
				state.selectedDate.start = null;
				state.selectedDate.end = null;
				return;
			}
			state.selectedDate = data;
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
		initAllData({ commit }) {
			commit('setSelectDate', false);
			commit('getInputData', false);
		},
	},
});

export default store;
