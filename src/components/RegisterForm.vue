<template>
	<div>
		<!-- Registration Form -->
		<div class="text-white text-center font-bold p-5 mb-4" v-if="regShowAlert" :class="regAlertClass">{{ regAlertMsg }}</div>
		<vee-form :validation-schema="schema" @submit="register">
			<!-- Name -->
			<div class="mb-3">
				<label class="inline-block mb-2">Name</label>
				<vee-field
					name="name"
					type="text"
					class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
					placeholder="Enter Name"
				/>
				<ErrorMessage class="text-red-600" name="name" />
			</div>
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
					class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
					type="password"
					placeholder="Password"
				/>
				<ErrorMessage class="text-red-600" name="password" />
			</div>
			<!-- Confirm Password -->
			<div class="mb-3">
				<label class="inline-block mb-2">Confirm Password</label>
				<vee-field
					name="confirm_password"
					type="password"
					class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
					placeholder="Confirm Password"
				/>
				<ErrorMessage class="text-red-600" name="confirm_password" />
			</div>
			<!-- TOS -->
			<div class="mb-3 pl-6">
				<vee-field name="tos" value="1" type="checkbox" class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
				<label class="inline-block">Accept terms of service</label>
				<ErrorMessage class="block text-red-600" name="tos" />
			</div>
			<button type="submit" class="block w-full bg-gray-600 text-white py-1.5 px-3 mt-4 rounded transition hover:bg-gray-700">Submit</button>
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

		// Vee-validate
		const schema = ref({
			name: "required|min:3|max:100|alpha_spaces",
			email: "required|min:3|max:100|email",
			password: "required|min:3|max:32",
			confirm_password: "passwords_mismatch:@password",
			tos: "tos",
		});

		// registration config
		const regSubmission = ref(false);
		const regShowAlert = ref(false);
		const regAlertClass = ref("bg-blue-500");
		const regAlertMsg = ref("Please wait! We are creating your account");

		const register = async function (values) {
			regSubmission.value = true;
			regShowAlert.value = true;
			regAlertClass.value = "bg-blue-500";
			regAlertMsg.value = "Please wait! We are creating your account";

			try {
				await store.dispatch("register", values);
			} catch (err) {
				regSubmission.value = true;
				regShowAlert.value = true;
				regAlertClass.value = "bg-red-500";
				regAlertMsg.value = "An Unexpected error occured. Please try again later";
				return;
			}

			regAlertClass.value = "bg-green-500";
			regAlertMsg.value = "Success! Your account has been created";
			window.location.reload();
		};

		return { schema, regSubmission, regShowAlert, regAlertClass, regAlertMsg, register };
	},
};
</script>

<style></style>
