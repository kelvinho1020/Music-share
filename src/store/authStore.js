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
				name: payload.name.trim(),
				email: payload.email.trim(),
				favorite: [],
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
		async signout({ commit }, payload) {
			await auth.signOut();
			if (payload.route.meta.requiresAuth) payload.router.push({ name: "Home" });
			commit("setAuth");
		},
		initLogin({ commit }) {
			const user = auth.currentUser; // if no auth will be null

			if (user) {
				commit("setAuth");
			}
		},
		toggleAuthModal({ commit }) {
			commit("setAuthModal");
		},
	},
	getters: {
		getAuthModalShow(state) {
			return state.authModalShow;
		},
		getUserLoggedIn(state) {
			return state.userLoggedIn;
		},
	},
};
