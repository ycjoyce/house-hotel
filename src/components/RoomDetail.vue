<template>
  <div v-if="$store.state.curRoomDetail">
    <main
      class="room-detail"
      v-if="!simple"      
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
          v-for="(intro, index) in roomIntro"
          :key="`intro-${index}`"
          class="styled-list-item"
        >
          {{intro}}
        </li>
      </ul>

      <amenity-box
        :amenities="amenities"
        class="section"
      />

      <calendar-container
        :config="calendarConfig"
      />
    </main>

    <div
      class="room-detail simple"
      v-else
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
            v-for="(item, index) in process"
            :key="`process-${index}`"
            :data="item"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import AmenityBox from '@src/components/AmenityBox.vue';
import CalendarContainer from '@src/components/CalendarContainer.vue';
import ProcessBox from '@src/components/ProcessBox.vue';

export default {
  props: {
    simple: {
      type: Boolean,
      required: false,
    },
  },
  components: {
    AmenityBox,
    CalendarContainer,
    ProcessBox,
  },
  data() {
    return {
      calendarConfig: {
        title: '空房狀態查詢',
        reset: true,
      },
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
  computed: {
    roomName() {
      return this.$store.state.curRoomDetail.name;
    },
    roomDesc() {
      const desc = this.$store.state.curRoomDetail.descriptionShort;
      const guestMin = desc.GuestMin;
      const guestMax = desc.GuestMax;
      const person = guestMin === guestMax ? `${guestMin}人` : `最少${guestMin}人-最多${guestMax}人`;
      const bed = desc.Bed.map((type) => `${type} Bed`).join('、');
      const bath = `衛浴${desc['Private-Bath']}間`;
      const footage = `${desc.Footage}平方公尺`;
      const strArr = [
        person,
        bed,
        bath,
        footage,
      ];
      return strArr.join('・');
    },
    normalDayPrice() {
      return this.$store.state.curRoomDetail.normalDayPrice;
    },
    holidayPrice() {
      return this.$store.state.curRoomDetail.holidayPrice;
    },
    checkInAndOut() {
      return this.$store.state.curRoomDetail.checkInAndOut;
    },
    roomIntro() {
      let intro = this.$store.state.curRoomDetail.description;
      intro = intro.split('.').filter((item) => item).map((item) => `${item}.`);
      return intro;
    },
    amenities() {
      return this.$store.state.curRoomDetail.amenities;
    },
  },
}
</script>