import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@src/views/Index.vue';
import RoomIntro from '@src/views/RoomIntro.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/room-intro',
    component: RoomIntro,
  },
];

const router = new VueRouter({
  base: '/',
  routes,
});

export default router;
