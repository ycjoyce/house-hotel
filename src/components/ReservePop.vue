<template>
  <div
    class="reserve-pop"
    @click.self="closePop"
  >
    <component
      :is="`ReservePop${reserveStatus}`"
      :result="reserveResult"
      :class="['reserve-pop-content', `reserve-pop-${reserveStatus.toLowerCase()}`]"
    >
      <button
        class="btn btn-pure btn-close reserve-pop-close"
        @click="closePop"
      ></button>
    </component>
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
      return this.$store.state.popContent.type;
    },
    reserveResult() {
      return this.$store.state.popContent.status;
    },
  },
  methods: {
    closePop() {
      this.$store.commit('toggleModalStatus', {
        type: 'reservePop',
        status: false,
      });
      this.$store.commit('setPopContent', {
        type: 'Editting',
        status: null,
      });
    },
  },
}
</script>