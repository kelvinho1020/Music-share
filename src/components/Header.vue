<template>
	<header id="header" class="bg-gray-600">
		<nav class="container mx-auto px-4 py-5 flex justify-between">
			<!-- App Name -->
			<div>
				<a class="text-white font-bold uppercase text-2xl mr-4"> Music </a>
			</div>

			<div class="flex">
				<!-- Primary Navigation -->
				<ul class="flex flex-row mt-1">
					<!-- Navigation Links -->
					<li>
						<a class="px-2 text-white" href="#" @click="toggleAuthModal"> Login / Register </a>
					</li>
					<template>
						<li>
							<a class="px-2 text-white">Manage</a>
						</li>
						<li>
							<a class="px-2 text-white" href="#">Logout</a>
						</li>
					</template>
				</ul>
			</div>
		</nav>
	</header>
</template>

<script>
import { useStore } from "vuex";
export default {
	setup() {
		const store = useStore();

		const toggleAuthModal = function () {
			store.dispatch("toggleAuthModal");
		};

		return { toggleAuthModal };
	},
};
</script>

<style></style>
