export default {
	state: {
		authModalShow: false,
	},
	mutations: {
		setAuthModal(state) {
			state.authModalShow = !state.authModalShow;
		},
	},
	actions: {
		toggleAuthModal(context) {
			context.commit("setAuthModal");
		},
	},
	getters: {
		getAuthModalShow(state) {
			return state.authModalShow;
		},
	},
};
