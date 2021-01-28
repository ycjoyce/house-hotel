<template>
  <div
    v-if="$store.state.curRoomDetail"
    class="light-box"
  >
    <button
      class="btn btn-pure btn-prev"
      @click="changeImg('prev')"
      :disabled="curIndex === 0"
    >prev</button>

    <div class="light-box-inner">
      <img
        :src="roomImages[curIndex]"
      >
    </div>

    <button
      class="btn btn-pure btn-next"
      @click="changeImg('next')"
      :disabled="curIndex === roomImages.length - 1"
    >next</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curIndex: 0,
    };
  },
  computed: {
    roomImages() {
      return this.$store.state.curRoomDetail.imageUrl;
    },
  },
  methods: {
    changeImg(direction) {
      switch (direction) {
        case 'prev':
          this.curIndex--;
          break;
        case 'next':
          this.curIndex++;
          break;
        default:
          break;
      }
    },
  },
}
</script>

<style>

</style>