<template>
	<div>
		<!-- Introduction -->
		<section class="mb-8 py-20 text-white text-center relative">
			<div class="container mx-auto">
				<div class="absolute inset-0 w-full h-full bg-contain introduction-bg background"></div>
				<div class="relative text-white main-header-content z-10">
					<h1 class="font-bold text-5xl mb-5">Listen to great music</h1>
					<p class="w-full md:w-8/12 mx-auto">
						Welcome to this website, this is a place for you to share your favorite music
					</p>
				</div>
			</div>
			<img class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full" src="../assets/img/introduction-music.png" />
		</section>

		<!-- Main Content -->
		<section class="container mx-auto pb-20">
			<div class="bg-white rounded border border-gray-200 relative flex flex-col">
				<div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200 flex justify-between">
					<span class="card-title cursor-pointer" @click="back">{{ isSearching === false ? "All Songs" : "Back" }}</span>
					<div>
						<input
							v-show="searchItem !== 'favorite'"
							type="text"
							v-model="search"
							class="outline-none border-b-2 text-center text-gray-800 focus:border-gray-400 transition duration-150 ease-in-out"
							:placeholder="placeholder"
							@keyup.enter="searchSongs"
						/>
						<i class="fa fa-search text-gray-400 cursor-pointer ml-1" @click="searchSongs" v-show="searchItem !== 'favorite'"></i>
						<div class="inline-block ml-5">
							<input type="radio" name="search" value="user" class="ml-3" id="searchUser" v-model="searchItem" />
							<label for="searchUser" class="ml-1">User</label>
							<input type="radio" name="search" value="song" class="ml-3" id="searchSong" v-model="searchItem" />
							<label for="searchSong" class="ml-1">Song</label>
							<input type="radio" name="search" value="favorite" class="ml-3" id="searchSong" v-model="searchItem" :change="filterSong" />
							<label for="searchSong" class="ml-1">My favorite</label>
						</div>
					</div>
					<!-- Icon -->
					<i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
				</div>
				<!-- Playlist -->
				<ul id="playlist">
					<SongItem v-for="song in songs" :key="song.docID" :song="song"/>
					<div class="font-bold block text-gray-600 text-center py-8" v-if="songs.length === 0 && !pendingRequest">
						{{ searchItem === "favorite" ? "You do not have a favorite song yet. " : `We do not have this ${searchItem}. Please go to search another keywords or input the full name.` }}
					</div>
					<div class="w-full flex justify-center py-6" v-if="pendingRequest">
						<img src="../assets/svg/loading.svg" alt="loading" />
					</div>
				</ul>
			</div>
		</section>
	</div>
</template>

<script>
import { useStore } from "vuex";
import SongItem from "../components/SongItem.vue";
import { ref, onBeforeUnmount, computed, watch } from "vue";
import { songsCollection, usersCollection, auth } from "../includes/firebase";
export default {
	name: "Home",
	components: { SongItem },
	setup() {
		// Vuex
		const store = useStore();

		const songs = ref([]);
		const totalSongs = ref("");
		const maxPerPage = ref(10);
		const pendingRequest = ref(false);

		const search = ref("");
		const searchItem = ref("user");
		const isSearching = ref(false);

		const placeholder = computed(() => `search a ${searchItem.value}`);

		const getSongs = async function () {
			if (pendingRequest.value) return;

			pendingRequest.value = true;

			// get total songs
			if (!totalSongs.value) {
				const snapshot = await songsCollection.get();
				totalSongs.value = snapshot.size;
			}

			let snapshots;
			if (songs.value.length) {
				const lastDoc = await songsCollection.doc(songs.value[songs.value.length - 1].docID).get();
				snapshots = await songsCollection.orderBy("modified_name").startAfter(lastDoc).limit(maxPerPage.value).get();
			} else {
				snapshots = await songsCollection.orderBy("modified_name").limit(maxPerPage.value).get();
			}
			snapshots.forEach(doc => {
				songs.value.push({
					playing: store.getters.getSong.docID === doc.id ? true : false,
					docID: doc.id,
					...doc.data(),
				});
			});

			pendingRequest.value = false;
		};
		getSongs();

		// search songs
		const searchSongs = async function () {
			isSearching.value = true;

			let snapshots;
			if (searchItem.value === "user") {
				snapshots = await songsCollection.where("display_name", "==", search.value).get();
			} else if (searchItem.value === "song") {
				snapshots = await songsCollection.where("modified_name", "==", search.value).get();
			}

			songs.value = [];
			snapshots.forEach(doc => {
				songs.value.push({
					playing: store.getters.getSong.docID === doc.id ? true : false,
					docID: doc.id,
					...doc.data(),
				});
			});
		};

		// go back
		const back = async function () {
			isSearching.value = false;
			searchItem.value = "user";
			songs.value = [];
			getSongs();
		};

		// Scroll event
		const handleScroll = function () {
			const { scrollTop, offsetHeight } = document.documentElement;
			const { innerHeight } = window;
			const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

			if (bottomOfWindow && songs.value.length !== totalSongs.value && isSearching.value === false) {
				getSongs();
			}
		};

		// emit togglePlaying
		const togglePlaying = function (val) {
			songs.value.forEach(song => {
				if (song.docID === val) song.playing = true;
				else song.playing = false;
			});
		};

		const stopPlaying = function () {
			songs.value.forEach(song => {
				song.playing = false;
			});
		};

		// filter favorite song
		const filterSong = async function () {
			isSearching.value = true;
			const snapshot = await usersCollection.doc(auth.currentUser.uid).get();
			const favorite = snapshot.data().favorite;
			songs.value = [];

			favorite.forEach(async f => {
				const songSnap = await songsCollection.doc(f).get();
					songs.value.push(songSnap.data());
			});
		};

		watch(searchItem, value => {
			if (value === "favorite") {
				filterSong();
			}
		});

		window.addEventListener("scroll", handleScroll);
		onBeforeUnmount(() => {
			window.removeEventListener("scroll", handleScroll);
		});

		return { songs, getSongs, handleScroll, pendingRequest, searchItem, searchSongs, search, back, isSearching, placeholder, stopPlaying, filterSong, togglePlaying };
	},
};
</script>

<style scoped>
.background {
	background-image: url("../assets/img/user-header.png");
	background-size: cover;
	animation: slide 50s linear infinite;
	will-change: background-position;
}

@keyframes slide {
	0% {
		background-position: 0 0;
	}
	100% {
		background-position: -4000px 0;
	}
}
</style>
