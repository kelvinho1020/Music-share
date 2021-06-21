<template>
	<div>
		<!-- Registration Form -->
		<div class="text-white text-center font-bold p-5 mb-4">alert msg</div>
		<form>
			<!-- Name -->
			<div class="mb-3">
				<label class="inline-block mb-2">Name</label>
				<input
					name="name"
					type="text"
					class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
					placeholder="Enter Name"
				/>
			</div>
			<!-- Email -->
			<div class="mb-3">
				<label class="inline-block mb-2">Email</label>
				<input
					name="email"
					type="email"
					class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
					placeholder="Enter Email"
				/>
			</div>
			<!-- Password -->
			<div class="mb-3">
				<label class="inline-block mb-2">Password</label>
				<input name="password" />
				<input class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded" type="password" placeholder="Password" />
				<div class="text-red-600">error</div>
			</div>
			<!-- Confirm Password -->
			<div class="mb-3">
				<label class="inline-block mb-2">Confirm Password</label>
				<input
					type="password"
					name="confirm_password"
					class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
					placeholder="Confirm Password"
				/>
			</div>
			<!-- TOS -->
			<div class="mb-3 pl-6">
				<input name="tos" value="1" type="checkbox" class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
				<label class="inline-block">Accept terms of service</label>
			</div>
			<button type="submit" class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">Submit</button>
		</form>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
