<template>
	<li class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50 dark:hover:bg-gray-500" :class="{ 'bg-gray-100 dark:bg-gray-400': isPlaying }">
		<div>
			<router-link :to="{ name: 'Song', params: { id: song.docID } }" class="font-bold block text-gray-600 dark:text-white"
				>{{ song.modified_name }} <span class="text-gray-500 dark:text-gray-200 text-sm ml-2">{{ song.display_name }}</span></router-link
			>

			<span class="text-gray-500 dark:text-gray-200 text-sm">{{ song.createdAt }}</span>
		</div>

		<div class="text-gray-600 dark:text-white text-lg">
			<i class="fas fa-play mr-5" @click="getSong"></i>
			<span class="favorite mr-3">
				<i class="fas fa-heart text-gray-600 dark:text-white"></i>
				{{ song.favorite_count }}
			</span>
			<span class="comments">
				<i class="fa fa-comments text-gray-600 dark:text-white"></i>
				{{ song.comment_count }}
			</span>
		</div>
	</li>
</template>

<script>
import { songsCollection } from "@/includes/firebase";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
	props: ["song"],
	name: "SongItem",
	setup(prop) {
		// Vuex
		const store = useStore();

		const isPlaying = computed(() => {
			if (store.getters.getSong.docID !== prop.song.docID) {
				return false;
			} else {
				return true;
			}
		});

		const getSong = async function () {
			const docSnapshot = await songsCollection.doc(prop.song.docID).get();

			store.dispatch("newSong", docSnapshot.data());
		};

		return { getSong, isPlaying };
	},
};
</script>
