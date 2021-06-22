<template>
	<div>
		<div class="w-full flex justify-center py-6" v-if="loading">
			<img src="../assets/svg/loading.svg" alt="loading" />
		</div>
		<div class="border border-gray-200 p-3 mb-4 rounded">
			<div>
				<h4 class="inline-block text-2xl font-bold">{{ song.modified_name.length >= 20 ? song.modified_name.slice(0, 30) + "..." : song.modified_name }}</h4>
				<button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right" @click="deleteSong">
					<i class="fa fa-times"></i>
				</button>
				<button class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right" @click="(showForm = true), (submitting = false)">
					<i class="fa fa-pencil-alt"></i>
				</button>
			</div>
			<div v-show="showForm">
				<div class="text-white text-center font-bold p-4 my-4" :class="alertClass" v-if="submitting">{{ alertMsg }}</div>
				<vee-form class="mt-4" :validation-schema="schema" :initial-values="song" @submit="edit">
					<div class="mb-3">
						<label class="inline-block mb-2">Song Title</label>
						<vee-field
							name="modified_name"
							type="text"
							class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
							placeholder="Enter Song Title"
						/>
						<ErrorMessage class="text-red-600" name="modified_name" />
					</div>
					<div class="mb-6">
						<label class="inline-block mb-2">Description</label>
						<vee-field
							as="textarea"
							name="description"
							type="text"
							class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
							placeholder="Enter description"
						/>
						<ErrorMessage class="text-red-600" name="description" />
					</div>
					<button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600">Submit</button>
					<button type="button" class="py-1.5 px-3 rounded text-white bg-gray-600 ml-4" @click="showForm = false">Go Back</button>
				</vee-form>
			</div>
		</div>
	</div>
</template>

<script>
import { songsCollection, storage } from "../includes/firebase";
import { ref } from "vue";
export default {
	name: "CompositionItem",
	props: {
		song: {
			type: Object,
			required: true,
		},
		updateSong: {
			type: Function,
			required: true,
		},
		index: {
			type: Number,
			required: true,
		},
		removeSong: {
			type: Function,
			required: true,
		},
		updateUnsavedFlag: {
			type: Function,
		},
	},
	setup(prop) {
		const showForm = ref(false);

		const submitting = ref(false);
		const showAlert = ref(false);
		const alertClass = ref("bg-blue-500");
		const alertMsg = ref("Please wait! Updating song info");
		const loading = ref(false);

		const schema = ref({
			modified_name: "required_song_title|min:1|max:30|",
			genre: "alpha_spaces",
		});

		const edit = async function (values) {
			submitting.value = true;
			showAlert.value = true;
			alertClass.value = "bg-blue-500";
			alertMsg.value = "Please wait! Updating song info";

			try {
				await songsCollection.doc(prop.song.docID).update({
					...values,
					modified_name: values.modified_name.trim(),
				});
			} catch (err) {
				alertClass.value = "bg-red-500";
				alertMsg.value = "Something went wrong! Try again later";
				return;
			}
			prop.updateSong(prop.index, values);
			prop.updateUnsavedFlag(false);
			alertClass.value = "bg-green-500";
			alertMsg.value = "Success";
		};

		const deleteSong = async function () {
			const storageRef = storage.ref();
			const songRef = storageRef.child(`songs/${prop.song.original_name}`);

			loading.value = true;
			await songRef.delete();
			await songsCollection.doc(prop.song.docID).delete();
			loading.value = false;
			prop.removeSong(prop.index);
		};

		return { schema, showForm, submitting, showAlert, alertClass, alertMsg, edit, deleteSong, loading };
	},
};
</script>
