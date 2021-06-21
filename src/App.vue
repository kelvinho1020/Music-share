<template>
	<div>
		<!-- Header -->
		<Header />

		<Router-view />

		<!-- Header -->
		<Auth />
	</div>
</template>

<script>
import Header from "@/components/Header";
import Auth from "@/components/Auth";
import { useStore } from "vuex";
export default {
	name: "App",
	components: { Header, Auth },
	setup() {
		// Vuex
		const store = useStore();

		store.dispatch("initLogin");
	},
};
</script>

<style lang="scss">
body {
	font-family: Loto, sans-serif;
}
</style>
