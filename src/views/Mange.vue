<template>
	<!-- Main Content -->
	<section class="container mx-auto mt-6">
		<div class="grid grid-cols-3 gap-4">
			<div class="col-span-1">
				<Upload :addSong="addSong" />
			</div>
			<div class="col-span-2 mb-10">
				<div class="bg-white rounded border border-gray-200 relative flex flex-col">
					<div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
						<span class="card-title">My Songs</span>
						<i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
					</div>
					<div class="p-6">
						<!-- Composition Items -->
						<div class="font-bold block text-gray-600 text-center py-8" v-if="songs.length === 0">You do not have any song yet.</div>
						<Composition-item v-for="(song, i) in sliceSong" :updateSong="updateSong" :key="song.docID" :song="song" :index="i" :removeSong="removeSong" />
					</div>
					<div class="flex justify-center items-center pb-8">
						<button class="ml-1 py-1 px-2 text-sm rounded text-white bg-gray-600 float-right focus:outline-none" @click="prev" v-show="page !== 1">
							<i class="fas fa-arrow-left"></i>
						</button>
						<button class="ml-1 py-1 px-2 text-sm rounded text-white bg-gray-600 float-right focus:outline-none" @click="next" v-show="songs[songs.length - 1] !== sliceSong[sliceSong.length - 1]">
							<i class="fas fa-arrow-right"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import Upload from "../components/Upload.vue";
import CompositionItem from "../components/CompositionItem.vue";
import { songsCollection, auth } from "../includes/firebase";
import { ref, computed } from "vue";
export default {
	name: "mange",
	components: { Upload, CompositionItem },
	setup() {
		const songs = ref([]);
		const page = ref(+1);
		const sliceSong = computed(() => songs.value.slice(10 * (page.value - 1), 10 * page.value));

		const addSong = function (doc) {
			const song = {
				...doc.data(),
				docID: doc.id,
			};
			songs.value.push(song);
		};

		// init songs
		const updatSongList = async function () {
			let snapshots;
			if (!songs.value.length) {
				snapshots = await songsCollection.where("uid", "==", auth.currentUser.uid).get();
			}
			snapshots.forEach(doc => {
				addSong(doc);
			});
		};
		updatSongList();

		// update vue after user update firestore
		const updateSong = function (i, values) {
			songs.value[i + 10 * (page.value - 1)].modified_name = values.modified_name;
			songs.value[i + 10 * (page.value - 1)].description = values.description;
		};

		const removeSong = function (i) {
			songs.value.splice(i, 1);
		};

		// pagination
		const next = function () {
			page.value += 1;
		};
		const prev = function () {
			page.value -= 1;
		};

		return { songs, addSong, updateSong, removeSong, sliceSong, next, prev, page };
	},
};
</script>
