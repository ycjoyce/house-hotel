<template>
  <div
    v-if="$store.state.curRoomDetail"
    class="light-box"
    @click.self="closeLightBox"
  >
    <button
      class="btn btn-pure btn-prev light-box-prev"
      @click="changeImg('prev')"
      :disabled="curIndex === 0"
    ></button>

    <div class="light-box-inner">
      <img
        class="light-box-img"
        :src="roomImages[curIndex]"
      >
    </div>

    <button
      class="btn btn-pure btn-next light-box-next"
      @click="changeImg('next')"
      :disabled="curIndex === roomImages.length - 1"
    ></button>
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
    closeLightBox() {
      this.$store.commit('toggleModalStatus', {
        type: 'lightBox',
        status: false,
      });
    },
  },
}
</script>
