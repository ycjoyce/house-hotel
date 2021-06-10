import Vue from 'vue';
import Vuex from 'vuex';

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
			)).filter((date) => (
				new Date(date) >= new Date()
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
		setPopContent(state, { type, status = null }) {
			state.popContent.type = type;
			state.popContent.status = status;
		},
	},
});

export default store;
