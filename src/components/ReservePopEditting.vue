<template>
  <div class="flex-container">
    <slot></slot>

    <edit-panel
      class="reserve-edit flex-aside-sm"
    />

    <room-detail
      class="reserve-intro flex-main"
      :simple="true"
    />
  </div>
</template>

<script>
import EditPanel from '@src/components/EditPanel.vue';
import RoomDetail from '@src/components/RoomDetail.vue';

export default {
  components: {
    EditPanel,
    RoomDetail,
  },
}
</script>
