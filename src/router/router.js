import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Mange from "@/views/Mange.vue";
import store from "@/store/store";
import Song from "@/views/Song.vue";

const requireAuth = (to, from, next) => {
	if (!store.getters.getUserLoggedIn) {
		next({ name: "Home" });
	} else next();
};

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			title: 'Home | Music-share'
		}
	},
	{
		path: "/mange",
		name: "Mange",
		component: Mange,
		meta: {
			requiresAuth: true,
			title: 'Manage | Music-share'
		},
		beforeEnter: requireAuth,
	},
	{
		path: "/song/:id",
		name: "Song",
		component: Song,
	},
	{
		path: "/:catchAll(.*)*",
		redirect: { name: "Home" },
		meta: {
			title: 'Music-share'
		},
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next();
})

export default router;
