<template>
	<div class="fixed z-10 inset-0" id="modal" v-show="authModalShow">
		<div class="flex items-end justify-center min-h-screen text-center">
			<!-- overlay -->
			<div class="fixed inset-0" @click="toggleAuthModal">
				<div class="absolute inset-0 bg-gray-800 opacity-75"></div>
			</div>

			<div class="inline-block bg-white rounded-lg text-left transform transition-all m-auto w-4/12">
				<div class="py-4 text-left px-6">
					<!--Title-->
					<div class="flex justify-between items-center pb-4">
						<p class="text-2xl font-bold">Your Account</p>
						<!-- Modal Close Button -->
						<div class="modal-close cursor-pointer z-50">
							<i class="fas fa-times" @click="toggleAuthModal"></i>
						</div>
					</div>

					<!-- Tabs -->
					<ul class="flex flex-wrap mb-4">
						<li
							class="flex-auto text-center"
							@click="mode = 'login'"
							:class="{
								'hover:text-white text-white bg-gray-600': mode === 'login',
								'hover:text-gray-600': mode === 'register',
							}"
						>
							<a class="block rounded py-3 px-4 transition" href="#">Login</a>
						</li>
						<li
							class="flex-auto text-center"
							@click="mode = 'register'"
							:class="{
								'hover:text-white text-white bg-gray-600': mode === 'register',
								'hover:text-gray-600': mode === 'login',
							}"
						>
							<a class="block rounded py-3 px-4 transition" href="#">Register</a>
						</li>
					</ul>

					<!-- Login Form -->
					<LoginForm v-if="mode === 'login'" />
					<!-- Registration Form -->
					<RegisterForm v-else />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useStore } from "vuex";
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";
import { ref, computed } from "vue";
export default {
	name: "Auth",
	components: { LoginForm, RegisterForm },
	setup() {
		// Vuex
		const store = useStore();
		const authModalShow = computed(() => store.getters.getAuthModalShow);
		const toggleAuthModal = function () {
			store.dispatch("toggleAuthModal");
		};

		const mode = ref("login");
		return { mode, authModalShow, toggleAuthModal };
	},
};
</script>

<style></style>
