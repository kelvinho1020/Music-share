import { auth, usersCollection } from "@/includes/firebase";
export default {
	state: {
		authModalShow: false,
		userLoggedIn: false,
	},
	mutations: {
		setAuthModal(state) {
			state.authModalShow = !state.authModalShow;
		},
		setAuth(state) {
			state.userLoggedIn = !state.userLoggedIn;
		},
	},
	actions: {
		async register({ commit }, payload) {
			const userCred = await auth.createUserWithEmailAndPassword(payload.email, payload.password);
			await usersCollection.doc(userCred.user.uid).set({
				name: payload.name,
				email: payload.email,
				age: payload.age,
				country: payload.country,
			});

			userCred.user.updateProfile({
				displayName: payload.name,
			});
			commit("setAuth");
		},
		async login({ commit }, payload) {
			await auth.signInWithEmailAndPassword(payload.email, payload.password);

			commit("setAuth");
		},
		toggleAuthModal({ commit }) {
			commit("setAuthModal");
		},
	},
	getters: {
		getAuthModalShow(state) {
			return state.authModalShow;
		},
	},
};
