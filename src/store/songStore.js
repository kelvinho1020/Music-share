import { Howl } from "howler";
import helper from "@/includes/helper";

export default {
	state: {
		currentSong: {},
		sound: {},
		seek: "00:00",
		duration: "00:00",
		playerProgress: "0%",
	},
	mutations: {
		setVolume(state, payload) {
			state.sound.volume(payload);
		},
		setSong(state, payload) {
			state.currentSong = { ...payload, isPlaying: true };
			state.sound = new Howl({
				src: [payload.url],
				html5: true,
				volume: 0.6,
				loop: true,
			});
		},
		setPosition(state) {
			state.seek = helper.formatTime(state.sound.seek());
			state.duration = helper.formatTime(state.sound.duration() - state.sound.seek());
			state.playerProgress = `${(state.sound.seek() / state.sound.duration()) * 100}% `;
		},
		setClearSong(state) {
			state.currentSong = {};
		},
	},
	actions: {
		changeVolume({ commit }, payload) {
			commit("setVolume", payload);
		},
		clearSong({ commit }) {
			commit("setClearSong");
		},
		progress({ commit, dispatch, state }) {
			commit("setPosition");

			if (state.sound.playing()) {
				requestAnimationFrame(() => {
					dispatch("progress");
				});
			}
		},
		async newSong({ state, commit, dispatch }, payload) {
			if (state.sound instanceof Howl) {
				state.sound.unload();
			}

			commit("setSong", payload);
			state.sound.play();

			state.sound.on("play", () => {
				requestAnimationFrame(() => {
					dispatch("progress"); // animationFrame need recursion <= here is the first time call itself
				});
			});
		},
		toggleAudio({ state }) {
			if (state.sound.playing()) {
				state.currentSong.isPlaying = false;
				state.sound.pause();
			} else {
				state.currentSong.isPlaying = true;
				state.sound.play();
			}
		},
		updateSeek({ state, dispatch }, payload) {
			if (!state.sound.playing) {
				return;
			}

			const { x, width } = payload.currentTarget.getBoundingClientRect();
			const clickX = payload.clientX - x;
			const percentage = clickX / width;
			const seconds = state.sound.duration() * percentage;

			state.sound.seek(seconds);

			state.sound.once("seek", () => {
				dispatch("progress");
			});
		},
	},
	getters: {
		getPlaying: state => {
			if (state.sound.playing) {
				return state.sound.playing();
			}

			return false;
		},
		getSound: state => state.sound,
		getSong: state => state.currentSong,
		getSeek: state => state.seek,
		getDuration: state => state.duration,
		getPlayerProgress: state => state.playerProgress,
	},
};
