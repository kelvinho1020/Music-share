<template>
	<!-- Login Form -->
	<div>
		<div class="text-white text-center font-bold p-5 mb-4">login msg</div>
		<form>
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
				<input
					name="password"
					type="password"
					class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
					placeholder="Password"
				/>
			</div>
			<button type="submit" class="block w-full bg-gray-600 text-white py-1.5 px-3 rounded transition hover:bg-gray-700">Submit</button>
		</form>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
