<template>
  <main>
    <div class="room-type">
      <h1 class="room-type-name">
        {Single Room}
      </h1>

      <p class="room-type-desc">
        {1人・ 單人床・ 附早餐・衛浴1間・18平方公尺}
      </p>
    </div>

    <ul class="room-basic-list">
      <li class="room-basic-item">
        平日（一～四）價格：{1380}  /  假日（五〜日）價格：{1500}
      </li>

      <li class="room-basic-item">
        入住時間：{15：00}（最早） /  {21：00}（最晚）
      </li>

      <li class="room-basic-item">
        退房時間：{10：00}
      </li>
    </ul>

    <ul class="room-intro-list">
      <li class="room-intro-item">
        單人間僅供一位客人使用。
      </li>

      <li class="room-intro-item">
        臥室配有單人床和私人浴室。
      </li>

      <li class="room-intro-item">
        您需要的一切為您準備：床單和毯子，毛巾，肥皂和洗髮水，吹風機。
      </li>

      <li class="room-intro-item">
        房間裡有AC，當然還有WiFi。
      </li>
    </ul>

    <amenity-box :amenities="amenities"/>

    <calendar :config="calendarConfig"/>
  </main>
</template>

<script>
import AmenityBox from '@src/components/AmenityBox.vue';
import Calendar from '@src/components/Calendar.vue';

export default {
  components: {
    AmenityBox,
    Calendar,
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
      calendarConfig: {
        title: '空房狀態查詢',
        reset: true,
      },
    };
  },
}
</script>

<style>

</style>