<template>
	<div class="fixed bottom-0 left-0 bg-gray-600 p-5 pb-4 text-left align-top w-full h-16 pl-10 dark:bg-white" v-show="song.modified_name">
		<div class="relative">
			<!-- Play/Pause Button -->
			<div class="float-left w-7 h-7 leading-3">
				<button class="focus:outline-none" type="button" @click="toggleAudio">
					<i class="fa text-white text-xl focus:outline-none dark:text-gray-500" :class="{ 'fa-play': !playing, 'fa-pause': playing }"></i>
				</button>
			</div>
			<!-- Current Position -->
			<div class="float-left w-7 h-7 leading-3 text-gray-50 mt-0 text-lg w-14 ml-6 mt-1 dark:text-gray-500">
				<span class="player-currenttime">{{ seek }}</span>
			</div>
			<!-- Scrub -->
			<div class="float-left w-7 h-7 leading-3 ml-6 mt-2 player-scrub">
				<div class="absolute left-0 right-5 text-lg text-center mx-auto player-song-info">
					<span class="song-title text-white dark:text-gray-800">{{ song.modified_name }}</span>
				</div>
				<!-- Scrub Container  -->
				<span class="block w-full h-2 rounded m-1 mt-2 bg-gray-200 relative cursor-pointer" @click.prevent="updateSeek($event)">
					<!-- Player Ball -->
					<span class="absolute top-neg-8 text-white text-lg dark:text-gray-500" :style="{ left: playerProgress }">
						<i class="fas fa-circle"></i>
					</span>
					<!-- Player Progress Bar-->
					<span class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400" :style="{ width: playerProgress }"></span>
				</span>
			</div>
			<!-- Duration -->
			<div class="float-left w-7 h-7 leading-3 text-gray-50 mt-0 text-lg w-14 ml-8 mt-1 dark:text-gray-500">
				<span class="player-duration">{{ duration }}</span>
			</div>
			<div class="flex justify-center items-center">
				<div class="inline-block">
					<i class="fa fa-volume-up text-white text-xl cursor-pointer dark:text-gray-600"></i>
				</div>
				<div class="inline-block">
					<input type="range" v-model="slider" min="0" max="100" id="slider" class="slider w-3/4 ml-3 bg-gray-200 rounded focus:outline-none" @change="changeVolume" />
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
