<template>
	<!-- Login Form -->
	<div>
		<div class="text-white text-center font-bold p-5 mb-4" v-if="loginShowAlert" :class="loginAlertClass">{{ loginAlertMsg }}</div>
		<vee-form :validation-schema="schema" @submit="login">
			<!-- Email -->
			<div class="mb-3">
				<label class="inline-block mb-2">Email</label>
				<vee-field
					name="email"
					type="email"
					class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
					placeholder="Enter Email"
				/>
				<ErrorMessage class="text-red-600" name="email" />
			</div>
			<!-- Password -->
			<div class="mb-3">
				<label class="inline-block mb-2">Password</label>
				<vee-field
					name="password"
					type="password"
					class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
					placeholder="Password"
				/>
				<ErrorMessage class="text-red-600" name="password" />
			</div>
			<button type="submit" class="block w-full bg-gray-600 text-white py-1.5 px-3 rounded transition hover:bg-gray-700">Submit</button>
		</vee-form>
	</div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
export default {
	setup() {
		// Vuex
		const store = useStore();

		// vee-validate
		const schema = ref({
			email: "required|email",
			password: "required|min:3|max:32",
		});

		// Login config
		const loginSubmission = ref(false);
		const loginShowAlert = ref(false);
		const loginAlertClass = ref("bg-blue-500");
		const loginAlertMsg = ref("Please wait! We are creating your account");

		const login = async function (values) {
			loginSubmission.value = true;
			loginShowAlert.value = true;
			loginAlertClass.value = "bg-blue-500";
			loginAlertMsg.value = "Please wait! We are logging you in";

			try {
				await store.dispatch("login", values);
			} catch (err) {
				loginSubmission.value = false;
				loginAlertClass.value = "bg-red-500";
				loginAlertMsg.value = "An Unexpected error occured. Please try again later";
			}

			loginAlertClass.value = "bg-green-500";
			loginAlertMsg.value = "Success! You are now logged in";
			window.location.reload();
		};

		return { schema, loginSubmission, loginShowAlert, loginAlertClass, loginAlertMsg, login };
	},
};
</script>

<style></style>
