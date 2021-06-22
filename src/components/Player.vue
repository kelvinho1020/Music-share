<template>
	<div class="fixed bottom-0 left-0 bg-white p-5 pb-4 text-left align-top w-full h-16 ml-6" v-show="song.modified_name">
		<div class="relative">
			<!-- Play/Pause Button -->
			<div class="float-left w-7 h-7 leading-3">
				<button type="button" @click="toggleAudio">
					<i class="fa text-gray-500 text-xl" :class="{ 'fa-play': !playing, 'fa-pause': playing }"></i>
				</button>
			</div>
			<!-- Current Position -->
			<div class="float-left w-7 h-7 leading-3 text-gray-400 mt-0 text-lg w-14 ml-5 mt-1">
				<span class="player-currenttime">{{ seek }}</span>
			</div>
			<!-- Scrub -->
			<div class="float-left w-7 h-7 leading-3 ml-7 mt-2 player-scrub">
				<div class="absolute left-0 right-0 text-lg text-center mx-auto player-song-info">
					<span class="song-title">{{ song.modified_name }}</span>
					<span class="song-artist">{{ song.displayName }}</span>
				</div>
				<!-- Scrub Container  -->
				<span class="block w-full h-2 rounded m-1 mt-2 bg-gray-200 relative cursor-pointer" @click.prevent="updateSeek($event)">
					<!-- Player Ball -->
					<span class="absolute top-neg-8 text-gray-800 text-lg" :style="{ left: playerProgress }">
						<i class="fas fa-circle"></i>
					</span>
					<!-- Player Progress Bar-->
					<span class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400" :style="{ width: playerProgress }"></span>
				</span>
			</div>
			<!-- Duration -->
			<div class="float-left w-7 h-7 leading-3 text-gray-400 mt-0 text-lg w-14 ml-8 mt-1">
				<span class="player-duration">{{ duration }}</span>
			</div>
			<div>
				<div class="inline-block">
					<i class="fa fa-volume-up text-gray-500 text-xl cursor-pointer"></i>
				</div>
				<div class="inline-block">
					<input type="range" v-model="slider" min="0" max="100" id="slider" class="slider w-3/4 ml-4 bg-gray-200 rounded focus:outline-none" @change="changeVolume()" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
	name: "Player",
	setup() {
		const store = useStore();
		const playing = computed(() => store.getters.getPlaying);
		const seek = computed(() => store.getters.getSeek);
		const song = computed(() => store.getters.getSong);
		const duration = computed(() => store.getters.getDuration);
		const playerProgress = computed(() => store.getters.getPlayerProgress);

		const slider = ref(60);

		const toggleAudio = function () {
			store.dispatch("toggleAudio");
		};

		const updateSeek = function (e) {
			store.dispatch("updateSeek", e);
		};

		const changeVolume = function () {
			store.dispatch("changeVolume", +slider.value / 100);
		};

		return { toggleAudio, playing, seek, song, duration, playerProgress, updateSeek, changeVolume, slider };
	},
};
</script>

<style scoped lang="scss">
.player-scrub,
.player-song-info {
	width: calc(100% - 400px);
}

.top-neg-8 {
	top: -8px;
}

.player-song-info {
	margin-top: -24px;
}

.slider {
	-webkit-appearance: none;
}

.slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: #04aa6d;
	cursor: pointer;
}

.slider::-moz-range-thumb {
	width: 30px;
	height: 30px;
	border-radius: 50%;
	background: #04aa6d;
	cursor: pointer;
}
</style>
