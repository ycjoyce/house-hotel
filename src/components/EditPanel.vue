<template>
  <form
    class="edit-panel"
    v-if="$store.state.curRoomDetail"
  >
    <form-control
      v-for="{ type, title } in inputs"
      :key="title"
      :type="type"
      :title="title"
      :calendarOpened="calendarOpened"
      :value="formCtrlVal(type, title)"
      @calendarOpened="emitCalendarOpened"
      @getInputData="getInputData"
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
      v-for="btn in btns"
      :key="btn.title"
      :data="btn"
      class="edit-submit btn-solid-secondary"
      :disabled="disabledBtns.includes(btn.title)"
    >
      {{btn.title}}
    </solid-btn>

    <ul
      v-if="explanations"
      class="explaination-list"
    >
      <li
        v-for="explanation in explanations"
        :key="explanation"
        class="explaination-item font-sm"
      >
        {{explanation}}
      </li>
    </ul>
  </form>
</template>

<script>
import mixin from '@src/assets/js/mixin';
import { reserveRoom } from '@src/assets/js/getData';

import FormControl from '@src/components/FormControl.vue';
import SolidBtn from '@src/components/SolidBtn.vue';

export default {
  mixins: [mixin],
  components: {
    FormControl,
    SolidBtn,
  },
  props: {
    calendarOpened: String,
  },
  data() {
    return {
      inputData: [],
      inputs : [
        {
          type: 'text',
          title: '姓名',
        },
        {
          type: 'tel',
          title: '手機號碼',
        },
        {
          type: 'date',
          title: '入住日期',
        },
        {
          type: 'date',
          title: '退房日期',
        },
      ],
      btns: [
        {
          title: '確認送出',
          method: () => {
            if (this.inputData.length < this.inputs.length) {
              alert('請填寫完整資料');
              return;
            }
            this.sendReserve();
          },
        },
      ],
      disabledBtns: [],
      explanations: [
        '此預約系統僅預約功能，並不會對您進行收費',
      ],
    };
  },
  computed: {
    formCtrlVal() {
      return (type, title) => {
        if (type !== 'date') {
          return;
        }
        return this.dateDefaultVal(title);
      };
    },
  },
  methods: {
    getInputData(data) {
      if (!data) {
				this.inputData.splice(0);
				return;
      }
      
			const targetIndex = this.inputData.findIndex((item) => (
				item.type === data.type && item.title === data.title
      ));
      
			if (targetIndex > -1) {
				this.inputData.splice(targetIndex, 1, data);
				return;
      }
      
			this.inputData.push(data);
    },
    emitCalendarOpened(title) {
      this.$emit('calendarOpened', title);
    },
    sendReserve() {
      this.disabledBtns.push('確認送出');

      const name = this.inputData.find((item) => item.title === '姓名').value;
      const tel = this.inputData.find((item) => item.title === '手機號碼').value;
      const startDateStr = this.inputData.find((item) => item.title === '入住日期').value;
      const endDateStr = this.inputData.find((item) => item.title === '退房日期').value;
      const dateArr = this.getDateArr(startDateStr, endDateStr);
      const param = {
        name,
        tel,
        date: dateArr,
      };
      
      reserveRoom(this.$route.params.id, param).then((res) => {
        this.disabledBtns.splice(
          this.disabledBtns.findIndex((btn) => btn === '確認送出'),
          1,
        );
        this.$store.commit('setPopContent', {
          type: 'Result',
          status: 'success',
        });
        this.$store.commit('addCurRoomBooked', res.data.booking);
      }).catch((err) => {
        console.error(err);
        this.$store.commit('setPopContent', {
          type: 'Result',
          status: 'fail',
        });
      });
    },
  },
}
</script>
