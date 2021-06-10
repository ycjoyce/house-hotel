<template>
	<main
		class="room-detail"
	>
		<div class="section room-detail-type">
			<h1 class="font-primary">
				{{roomName}}
			</h1>

			<p>
				{{roomDesc}}
			</p>
		</div>

		<ul class="section room-basic-list">
			<li>
				平日（一～四）價格：{{normalDayPrice}}  /  假日（五〜日）價格：{{holidayPrice}}
			</li>

			<li>
				入住時間：{{checkInAndOut.checkInEarly}}（最早） /  {{checkInAndOut.checkInLate}}（最晚）
			</li>

			<li>
				退房時間：{{checkInAndOut.checkOut}}
			</li>
		</ul>

		<ul class="section room-intro-list">
			<li
				v-for="intro in roomIntro"
				:key="intro"
				class="styled-list-item"
			>
				{{intro}}
			</li>
		</ul>

		<amenity-box
			:amenities="amenities"
			class="section"
		/>

		<div>
			<p class="calendar-box-title">
				空房狀態查詢
			</p>
			<calendar-container
				lang="eng"
				:limit-arange="90"
				:multi-calendar="true"
				:reset="true"
				:disabled-date="$store.getters.disabledDate"
				@getCalendarDate="setCalendarDate"
			/>
		</div>
	</main>
</template>

<script>
import AmenityBox from '@src/components/AmenityBox.vue';
import CalendarContainer from '@src/components/CalendarContainer.vue';

export default {
	components: {
		AmenityBox,
		CalendarContainer,
	},
	props: {
		roomName: String,
		roomDesc: String,
		normalDayPrice: Number,
		holidayPrice: Number,
		checkInAndOut: Object,
		roomIntro: Array,
		amenities: Object,
	},
	methods: {
    setCalendarDate(data) {
      this.$store.commit('setSelectDate', data);
    },
  },
}
</script>