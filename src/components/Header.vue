<template>
	<header id="header" class="bg-gray-50 dark:bg-gray-700 px-20">
		<nav class="container mx-auto px-4 py-5 flex justify-between items-center">
			<!-- App Name -->
			<div>
				<router-link class="text-gray-600 dark:text-white font-bold uppercase text-2xl mr-4" to="/"> Music </router-link>
			</div>

			<div class="flex">
				<!-- Primary Navigation -->
				<ul class="flex flex-row mt-1 items-center">
					<!-- Navigation Links -->
					<li v-if="!getUserLoggedIn">
						<a class="px-2 text-gray-600 dark:text-white dark:text-black mr-4" href="#" @click="toggleAuthModal"> Login / Register </a>
					</li>
					<template v-else>
						<li>
							<router-link class="px-2 text-gray-600 dark:text-white dark:text-black" :to="{ name: 'Mange' }">Manage</router-link>
						</li>
						<li>
							<a class="px-2 text-gray-600 dark:text-white dark:text-black mr-4" href="#" @click="signout">Logout</a>
						</li>
					</template>
					<li>
						<button
							class="
								bg-blue-500
								hover:bg-blue-400
								text-white
								font-bold
								py-1
								px-3
								border-b-4 border-blue-700
								hover:border-blue-500
								rounded
								dark:bg-red-500 dark:hover:bg-red-400 dark:border-red-700
								hover:border-red-500
								focus:outline-none
							"
							@click="toggleTheme"
						>
							{{ theme }}
						</button>
					</li>
				</ul>
			</div>
		</nav>
	</header>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
export default {
	setup() {
		// Vuex
		const store = useStore();
		const getUserLoggedIn = computed(() => store.getters.getUserLoggedIn);
		const theme = computed(() => store.getters.getTheme);

		// Router
		const router = useRouter();
		const route = useRoute();

		const signout = async function () {
			try {
				await store.dispatch("signout", { router, route });
			} catch (err) {
				console.log(err.message);
			}
		};

		const toggleAuthModal = function () {
			store.dispatch("toggleAuthModal");
		};

		// Theme
		const toggleTheme = function () {
			store.dispatch("toggleTheme");
		};

		return { toggleAuthModal, signout, getUserLoggedIn, toggleTheme, theme };
	},
};
</script>
