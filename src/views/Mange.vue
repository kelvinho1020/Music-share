<template>
	<!-- Main Content -->
	<section class="container mx-auto mt-6">
		<div class="grid grid-cols-3 gap-4">
			<div class="col-span-1">
				<Upload :addSong="addSong" />
			</div>
			<div class="col-span-2 mb-16">
				<div class="bg-white rounded border border-gray-200 relative flex flex-col dark:bg-gray-600 dark:border-white">
					<div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
						<span class="card-title dark:text-white">My Songs</span>
						<i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
						<i class="fa fa-search float-right text-green-400 text-2xl mr-4 cursor-pointer" @click="toggleSearch"></i>
					</div>
					<input
						type="text"
						class="bg-gray-50 outline-none border-b-2 text-center py-3 text-gray-800 focus:border-gray-400 transition duration-150 ease-in-out dark:text-white dark:bg-gray-500 dark:focus:border-white "
						placeholder="search a song"
						v-model="search"
						v-show="showSearch"
					/>
					<div class="p-6">
						<!-- Composition Items -->
						<div class="font-bold block text-gray-600 text-center py-8 dark:text-white" v-if="sliceSong.length === 0">You do not have any song yet.</div>
						<Composition-item v-for="(song, i) in sliceSong" :updateSong="updateSong" :key="song.docID" :song="song" :index="i" :removeSong="removeSong" />
					</div>
					<div class="flex justify-center items-center pb-8" v-show="!search">
						<button class="ml-1 py-1 px-2 text-sm rounded text-white bg-gray-600 float-right focus:outline-none dark:bg-gray-800" @click="prev" v-show="page !== 1">
							<i class="fas fa-arrow-left"></i>
						</button>
						<button class="ml-1 py-1 px-2 text-sm rounded text-white bg-gray-600 float-right focus:outline-none dark:bg-gray-800" @click="next" v-show="songs[songs.length - 1] !== sliceSong[sliceSong.length - 1]">
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
		const search = ref("");
		const showSearch = ref(false);
		const sliceSong = computed(() => {
			if (!search.value) {
				return songs.value.slice(10 * (page.value - 1), 10 * page.value);
			} else {
				return songs.value.filter(song => {
					if (song.modified_name.toLowerCase().includes(search.value.toLowerCase())) {
						return song;
					}
				});
			}
		});

		const toggleSearch = function () {
			search.value = "";
			showSearch.value = !showSearch.value;
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
		const updateSong = function (i, values, id) {
			if (!search.value) {
				songs.value[i + 10 * (page.value - 1)].modified_name = values.modified_name;
				songs.value[i + 10 * (page.value - 1)].description = values.description;
			} else {
				songs.value.forEach(song => {
					if (song.docID === id) {
						song.modified_name = values.modified_name;
						song.description = values.description;
					}
				});
			}
		};

		const removeSong = function (i, id) {
			if (!search.value) {
				songs.value.splice(i + 10 * (page.value - 1), 1);
			} else {
				search.value = "";
				songs.value = songs.value.filter(song => {
					if (song.docID !== id) {
						return song;
					}
				});
			}
		};

		// pagination
		const next = function () {
			page.value += 1;
		};
		const prev = function () {
			page.value -= 1;
		};

		return { songs, addSong, updateSong, removeSong, sliceSong, next, prev, page, search, toggleSearch, showSearch };
	},
};
</script>
