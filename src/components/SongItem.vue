<template>
	<li class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50">
		<div>
			<router-link :to="{ name: 'Song', params: { id: song.docID } }" class="font-bold block text-gray-600">{{ song.modified_name }} </router-link>
			<span class="text-gray-500 text-sm">{{ song.display_name }}</span>
		</div>

		<div class="text-gray-600 text-lg">
			<i class="fas mr-4" @click="getSong" :class="{ 'fa-play': !song.playing, 'fa-pause': song.playing }"></i>
			<span class="comments">
				<i class="fa fa-comments text-gray-600"></i>
				{{ song.comment_count }}
			</span>
		</div>
	</li>
</template>

<script>
import { songsCollection } from "@/includes/firebase";
import { useStore } from "vuex";
import { ref } from "vue";
export default {
	props: ["song"],
	name: "SongItem",
	setup(prop, ctx) {
		// Vuex
		const store = useStore();
		const currentSong = ref("");

		const getSong = async function () {
			ctx.emit("togglePlaying", prop.song.docID);

			const docSnapshot = await songsCollection.doc(prop.song.docID).get();

			if (store.getters.getSong.docID !== prop.song.docID) {
				store.dispatch("newSong", docSnapshot.data());
			} else {
				store.dispatch("clearSong");
				ctx.emit("stopPlaying", prop.song.docID);
				store.dispatch("toggleAudio");
			}
		};

		return { getSong, currentSong };
	},
};
</script>
