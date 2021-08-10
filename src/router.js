import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@src/views/Index.vue';
import RoomIntro from '@src/views/RoomIntro.vue';

Vue.use(VueRouter);

const routes = [
	{
		name: 'Index',
		path: '/',
		component: Index,
	},
	{
		name: 'Room-intro',
		path: '/room-intro',
		component: RoomIntro,
		children: [
			{
				name: 'Room',
				path: ':id',
			},
		],
	},
	{
		path: '*',
		redirect: '/',
	},
];

const router = new VueRouter({
	mode: 'history',
	base: '/house-hotel/',
	routes,
});

export default router;
