<template>
  <div class="room-detail">
    <section class="section">
      <h2 class="section-title section-title-primary">
        {Single Room}
      </h2>

      <p class="room-desc">
        {1人・ 單人床・ 附早餐・衛浴1間・18平方公尺}
      </p>

      <p class="room-desc">
        平日（一～四）價格：{1380}  /  假日（五〜日）價格：{1500}
      </p>

      <amenity-box
        :amenities="amenities"
        :simple="true"
      />
    </section>
    
    <section class="section">
      <h3 class="section-title section-title-secondary">
        訂房資訊
      </h3>

      <ul class="room-intro-list">
        <li class="room-intro-item">
          入住時間：最早15：00，最晚21：00；退房時間：10：00，請自行確認行程安排。
        </li>

        <li class="room-intro-item">
          平日定義週一至週四；假日定義週五至週日及國定假日。
        </li>

        <li class="room-intro-item">
          好室旅店全面禁止吸菸。
        </li>

        <li class="room-intro-item">
          若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六 10:00 - 18:00 )。
        </li>
      </ul>
    </section>

    <section class="section">
      <h3 class="section-title section-title-secondary">
        預約流程
      </h3>

      <div class="process-container">
        <process-box
          v-for="(item, index) in process"
          :key="'process-' + index"
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
  data() {
    return {
      amenities: {
        "Wi-Fi": true,
        "Breakfast": true,
        "Mini-Bar": false,
        "Room-Service": false,
        "Television": true,
        "Air-Conditioner": true,
        "Refrigerator": true,
        "Sofa": false,
        "Great-View": false,
        "Smoke-Free": true,
        "Child-Friendly": false,
        "Pet-Friendly": true,
      },
      process: [
        {
          img: '', // require()
          text: '送出線上預約單',
        },
        {
          img: '',
          text: '系統立即回覆是否預訂成功\n並以簡訊發送訂房通知\n(若未收到簡訊請來電確認)',
        },
        {
          img: '',
          text: '入住當日憑訂房通知\n以現金或刷卡付款即可\n(僅接受VISA.JCB.銀聯卡)',
        },
      ],
    };
  },
}
</script>

<style>

</style>