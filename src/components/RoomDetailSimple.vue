<template>
	<div
		class="room-detail simple"
	>
		<section class="section">
			<h2 class="section-title font-tertiary">
				{{roomName}}
			</h2>

			<p>
				{{roomDesc}}
			</p>

			<p>
				平日（一～四）價格：{{normalDayPrice}}  /  假日（五〜日）價格：{{holidayPrice}}
			</p>

			<amenity-box
				:amenities="amenities"
				class="simple"
			/>
		</section>
		
		<section class="section">
			<h3 class="section-title">
				訂房資訊
			</h3>

			<ul class="room-intro-list">
				<li class="styled-list-item">
					入住時間：最早{{checkInAndOut.checkInEarly}}，最晚{{checkInAndOut.checkInLate}}；退房時間：{{checkInAndOut.checkOut}}，請自行確認行程安排。
				</li>

				<li class="styled-list-item">
					平日定義週一至週四；假日定義週五至週日。
				</li>

				<li class="styled-list-item">
					好室旅店全面禁止吸菸。
				</li>

				<li class="styled-list-item">
					若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六 10:00 - 18:00 )。
				</li>
			</ul>
		</section>

		<section class="section">
			<h3 class="section-title">
				預約流程
			</h3>

			<div class="process-container">
				<process-box
					v-for="item in process"
					:key="item.text"
					:data="item"
				/>
			</div>
		</section>
	</div>
</template>

<script>
import AmenityBox from '@src/components/AmenityBox.vue';
import ProcessBox from '@src/components/ProcessBox.vue';

export default {
	components: {
		AmenityBox,
		ProcessBox,
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
	data() {
    return {
      process: [
        {
          img: require('@img/icon/reserve.svg'),
          text: '送出線上預約單',
        },
        {
          img: require('@img/icon/msg.svg'),
          text: '系統立即回覆是否預訂成功<br>並以簡訊發送訂房通知<br>(若未收到簡訊請來電確認)',
        },
        {
          img: require('@img/icon/payment.svg'),
          text: '入住當日憑訂房通知<br>以現金或刷卡付款即可<br>(僅接受VISA.JCB.銀聯卡)',
        },
      ],
    };
  },
}
</script>