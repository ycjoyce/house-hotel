<template>
  <div
    class="flex-container"
  >
    <slot></slot>

    <calendar-container
      v-show="$store.state.showCalendar"
      :style="{ top: `${$store.state.showCalendar}px` }"
      @mouseleave.native="closeCalendar"
    />

    <edit-panel
      :config="editPanelConfig"
      class="reserve-edit flex-aside-sm"
    />

    <room-detail
      class="reserve-intro flex-main"
      :simple="true"
    />
  </div>
</template>

<script>
import mixin from '@src/assets/js/mixin';
import { reserveRoom } from '@src/assets/js/getData';

import EditPanel from '@src/components/EditPanel.vue';
import RoomDetail from '@src/components/RoomDetail.vue';
import CalendarContainer from '@src/components/CalendarContainer.vue';

export default {
  mixins: [mixin],
  components: {
    EditPanel,
    RoomDetail,
    CalendarContainer,
  },
  data() {
    return {
      editPanelConfig: {
        input: {
          text: [
            '姓名',
          ],
          tel: [
            '手機號碼',
          ],
          date: [
            '入住日期',
            '退房日期',
          ],
        },
        cal: {
          dates: true,
          price: true,
        },
        btn: [
          {
            title: '確認送出',
            type: 'secondary',
            method: () => {
              if (!this.arrangeData()) {
                alert('請填寫完整資料');
                return;
              }
              this.arrangedData = this.arrangeData();
              this.sendReserve();
            },
          },
        ],
        explaination: [
          '此預約系統僅預約功能，並不會對您進行收費',
        ],
      },
      arrangedData: null,
    };
  },
  methods: {
    closeCalendar() {
      this.$store.commit('toggleCalendar', false);
    },
    arrangeData() {
      let allData = [];
      allData = allData.concat(this.$store.state.inputData);
      for (let item in this.$store.state.selectDate) {
        let formatted = {
          type: 'date',
        };
        switch(item) {
          case 'start':
            formatted.title = '入住日期';
            formatted.value = this.$store.state.selectDate[item] || this.daysAfterToday(1);
            break;
          case 'end':
            formatted.title = '退房日期';
            formatted.value = this.$store.state.selectDate[item] || this.daysAfterToday(2);
            break;
          default:
            break;
        }
        allData.push(formatted);
      }
      let length = 0;
      for (let col in this.editPanelConfig.input) {
        length += this.editPanelConfig.input[col].length;
      }
      return allData.length < length ? false : allData;
    },
    getDateArr(start, end) {
      const newStart = new Date(start).getTime();
      const newEnd = new Date(end).getTime();
      const dayDistance = 24 * 60 * 60 * 1000;
      const result = [];
      for (let i = newStart; i < newEnd; i += dayDistance) {
        let formattedDate = new Date(i).toLocaleDateString();
        formattedDate = formattedDate.split('/').map((time, index) => {
          if (index < 1) return time;
          return time < 10 ? `0${time}` : time;
        });
        formattedDate = formattedDate.join('-');
        result.push(formattedDate);
      }
      return result;
    },
    sendReserve() {
      const name = this.arrangedData.find((item) => item.title === '姓名').value;
      const tel = this.arrangedData.find((item) => item.title === '手機號碼').value;
      const startDateStr = this.arrangedData.find((item) => item.title === '入住日期').value;
      const endDateStr = this.arrangedData.find((item) => item.title === '退房日期').value;
      const dateArr = this.getDateArr(startDateStr, endDateStr);
      const param = {
        name,
        tel,
        date: dateArr,
      };
      
      reserveRoom(this.$route.params.id, param).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.error(err);
      });
    },
  },
}
</script>
