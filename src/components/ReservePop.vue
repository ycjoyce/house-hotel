<template>
  <div class="reserve-pop">
    <button
      class="btn btn-pure btn-close"
    ></button>

    <component
      :is="reserveStatus"
      :result="reserveResult"
      class="reserve-pop-content"
    ></component>
  </div>
</template>

<script>
import ReservePopEditting from '@src/components/ReservePopEditting.vue';
import ReservePopResult from '@src/components/ReservePopResult.vue';

export default {
  components: {
    ReservePopEditting,
    ReservePopResult,
  },
  computed: {
    reserveStatus() {
      return 'ReservePopResult';
    },
    reserveResult() {
      return 'success';
    },
  },
}
</script>

<style>

</style>