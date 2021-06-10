<template>
  <div
    class="flex-container"
    @click="closeCalendar($event)"
  >
    <slot></slot>

    <edit-panel
      class="reserve-edit flex-aside-sm"
      @calendarOpened="setCalendarOpened"
      :calendarOpened="calendarOpened"
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
  data() {
    return {
      calendarOpened: null,
    };
  },
  methods: {
    setCalendarOpened(status) {
      this.calendarOpened = status;
    },
    closeCalendar(e) {
      const target = e.target;
      const input = target.matches(`.input-date[data-title="${this.calendarOpened}"]`);
      const calendar = target.closest('.calendar-container');
      if (!input && !calendar) {
        this.calendarOpened = null;
      }
    },
  },
}
</script>
