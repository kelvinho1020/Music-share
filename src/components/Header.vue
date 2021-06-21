<template>
	<header id="header" class="bg-gray-600">
		<nav class="container mx-auto px-4 py-5 flex justify-between">
			<!-- App Name -->
			<div>
				<router-link class="text-white font-bold uppercase text-2xl mr-4" to="/"> Music </router-link>
			</div>

			<div class="flex">
				<!-- Primary Navigation -->
				<ul class="flex flex-row mt-1">
					<!-- Navigation Links -->
					<li v-if="!getUserLoggedIn">
						<a class="px-2 text-white" href="#" @click="toggleAuthModal"> Login / Register </a>
					</li>
					<template v-else>
						<li>
							<router-link class="px-2 text-white" :to="{ name: 'Mange' }">Manage</router-link>
						</li>
						<li>
							<a class="px-2 text-white" href="#" @click="signout">Logout</a>
						</li>
					</template>
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

		return { toggleAuthModal, signout, getUserLoggedIn };
	},
};
</script>