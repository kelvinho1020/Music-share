<template>
	<div class="bg-gray-50 dark:bg-gray-700 min-h-screen">
		<!-- Header -->
		<Header />

		<Router-view />

		<!-- Header -->
		<Auth />

		<!-- Player -->
		<Player />
	</div>
</template>

<script>
import Player from "@/components/Player";
import Header from "@/components/Header";
import Auth from "@/components/Auth";
import { onBeforeMount, computed, watch } from "vue";
import { useStore } from "vuex";
export default {
	name: "App",
	components: { Header, Auth, Player },
	setup() {
		// Vuex
		const store = useStore();
		const theme = computed(() => store.getters.getTheme);

		onBeforeMount(() => {
			store.dispatch("initLogin");
			store.dispatch("initTheme");
		});

		watch(theme, newTheme => {
			if (newTheme === "light") {
				document.querySelector("html").classList.remove("dark");
			} else {
				document.querySelector("html").classList.add("dark");
			}
		});
	},
};
</script>

<style lang="scss">
body {
	font-family: Loto, sans-serif;
}
</style>
