<template>
  <div class="full-pop">
    <slot></slot>
    
    <img
      :src="statusImg"
      class="reserve-status-img"
    >

    <p class="font-primary">
      {{statusTitle}}
    </p>

    <p v-html="statusText"></p>
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
      return require(`@img/icon/reserve-${this.result}.svg`);
    },
    statusTitle() {
      return this.result === 'success' ? '預約成功' : '預約失敗';
    },
    statusText() {
      let msg = '';
      switch (this.result) {
        case 'success':
          msg = '請留意簡訊發送訂房通知，入住當日務必出示此訂房通知，<br>若未收到簡訊請來電確認，謝謝您';
          break;
        case 'fail':
          msg = '哎呀！晚了一步！您預約的日期已經被預約走了，<br>再看看其它房型吧';
          break;
        default:
          break;
      }
      return msg;
    },
  },
}
</script>
