export default {
	state: {
		theme: {},
	},
	mutations: {
		setTheme(state, payload) {
			state.theme = payload;
			localStorage.theme = payload;
		},
	},
	actions: {
		initTheme({ commit }) {
			const cachedTheme = localStorage.theme ? localStorage.theme : false;
			const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

			if (cachedTheme) commit("setTheme", cachedTheme);
			else if (userPrefersDark) commit("setTheme", "dark");
			else commit("setTheme", "dark");
		},
		toggleTheme({ commit }) {
			switch (localStorage.theme) {
				case "light":
					commit("setTheme", "dark");
					break;

				default:
					commit("setTheme", "light");
					break;
			}
		},
	},
	getters: {
		getTheme: state => state.theme,
	},
};
