<template>
  <div>
    <edit-panel :config="editPanelConfig"/>

    <room-detail-simple/>
  </div>
</template>

<script>
import EditPanel from '@src/components/EditPanel.vue';
import RoomDetailSimple from '@src/components/RoomDetailSimple.vue';

export default {
  components: {
    EditPanel,
    RoomDetailSimple,
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
            method() {
              console.log('test');
            },
          },
        ],
        explaination: [
          '此預約系統僅預約功能，並不會對您進行收費',
        ],
      },
    };
  },
}
</script>

<style>

</style>