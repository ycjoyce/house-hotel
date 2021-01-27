<template>
  <form class="edit-panel">
    <form-control
      v-for="(value, name, index) in config.input"
      :key="'form-control-box-' + index"
      :data="{ name, value }"
    />

    <p class="cal-dates">
      {2}天，{1}晚平日
    </p>

    <div class="cal-price">
      <p class="cal-price-title">
        總計
      </p>

      <p class="cal-price-price">
        ${1,380}
      </p>
    </div>

    <solid-btn
      v-for="(btn, index) in config.btn"
      :key="'btn-' + index"
      :data="btn"
    />

    <ul
      v-if="config.explaination"
      class="explaination-list"
    >
      <li
        v-for="(explaination, index) in config.explaination"
        :key="'explaination-' + index"
        class="explaination-item"
      >
        {{explaination}}
      </li>
    </ul>
  </form>
</template>

<script>
import FormControl from '@src/components/FormControl.vue';
import SolidBtn from '@src/components/SolidBtn.vue';

export default {
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

<style>

</style>