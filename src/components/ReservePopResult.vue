<template>
  <div class="full-pop">
    <img
      :src="statusImg"
      class="status-img"
    >

    <p class="status-title">
      {{statusTitle}}
    </p>

    <p class="status-text">
      {{statusText}}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: String,
      required: true,
    },
  },
  computed: {
    statusImg() {
      return 'success'; // require
    },
    statusTitle() {
      return '預約成功';
      // '預約失敗'
    },
    statusText() {
      return '請留意簡訊發送訂房通知，入住當日務必出示此訂房通知，\n若未收到簡訊請來電確認，謝謝您';
      // '哎呀！晚了一步！您預約的日期已經被預約走了，\n再看看其它房型吧'
    },
  },
}
</script>

<style>

</style>