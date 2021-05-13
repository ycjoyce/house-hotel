<template>
  <form
    class="edit-panel"
    v-if="$store.state.curRoomDetail"
  >
    <form-control
      v-for="(value, name, index) in config.input"
      :key="`form-control-box-${index}`"
      :data="{ name, value }"
    />

    <p class="edit-cal-dates">
      {{totalNights}}天，{{dayTypeCount.normal}}晚平日
    </p>

    <div class="edit-cal-price-box">
      <p>
        總計
      </p>

      <p class="edit-cal-price font-secondary">
        ${{formatNum(totalPrice)}}
      </p>
    </div>

    <solid-btn
      v-for="(btn, index) in config.btn"
      :key="`btn-${index}`"
      :data="btn"
      class="edit-submit btn-solid-secondary"
    >
      確認送出
    </solid-btn>

    <ul
      v-if="config.explaination"
      class="explaination-list"
    >
      <li
        v-for="(explaination, index) in config.explaination"
        :key="`explaination-${index}`"
        class="explaination-item font-sm"
      >
        {{explaination}}
      </li>
    </ul>
  </form>
</template>

<script>
import mixin from '@src/assets/js/mixin';

import FormControl from '@src/components/FormControl.vue';
import SolidBtn from '@src/components/SolidBtn.vue';

export default {
  mixins: [mixin],
  components: {
    FormControl,
    SolidBtn,
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
}
</script>
