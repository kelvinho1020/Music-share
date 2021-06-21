<template>
	<!-- Main Content -->
	<section class="container mx-auto mt-6">
		<div class="grid grid-cols-3 gap-4">
			<div class="col-span-1">
				<Upload :addSong="addSong" />
			</div>
			<div class="col-span-2">
				<div class="bg-white rounded border border-gray-200 relative flex flex-col">
					<div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
						<span class="card-title">My Songs</span>
						<i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
					</div>
					<div class="p-6">
						<!-- Composition Items -->
						<div class="font-bold block text-gray-600 text-center py-8" v-if="songs.length === 0">You do not have any song yet.</div>
						<Composition-item v-for="(song, i) in songs" :key="song.docID" :song="song" :updateSong="updateSong" :index="i" :removeSong="removeSong" :updateUnsavedFlag="updateUnsavedFlag" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { onBeforeRouteLeave } from "vue-router";
import Upload from "../components/Upload.vue";
import CompositionItem from "../components/CompositionItem.vue";
import { songsCollection, auth } from "../includes/firebase";
import { ref } from "vue";
export default {
	name: "mange",
	components: { Upload, CompositionItem },
	setup() {
		const songs = ref([]);
		const unsavedFlag = ref(false);

		const updateUnsavedFlag = function (value) {
			unsavedFlag.value = value;
		};

		const addSong = function (doc) {
			const song = {
				...doc.data(),
				docID: doc.id,
			};
			songs.value.push(song);
		};

		// init songs
		const updatSongList = async function () {
			const snapshot = await songsCollection.where("uid", "==", auth.currentUser.uid).get();
			snapshot.forEach(doc => {
				addSong(doc);
			});
		};
		updatSongList();

		// update vue after user update firestore
		const updateSong = function (i, values) {
			songs.value[i].modified_name = values.modified_name;
			songs.value[i].genre = values.genre;
		};

		const removeSong = function (i) {
			songs.value.splice(i, 1);
		};

		onBeforeRouteLeave((to, from, next) => {
			if (!unsavedFlag.value) {
				next();
			} else {
				const leave = confirm("You have unsaved changes. Are you sure you wnat to leave?");
				next(leave);
			}
		});

		return { songs, addSong, updateUnsavedFlag, updateSong, removeSong };
	},
};
</script>
