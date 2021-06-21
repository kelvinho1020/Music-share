import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import "./assets/tailwind.css";
import VeeValidatePlugin from "@/includes/validation";
import { auth } from "@/includes/firebase";

let app;

// we need to load firebase before load vue
auth.onAuthStateChanged(() => {
	if (!app) {
		app = createApp(App);

		app.use(store).use(router).use(VeeValidatePlugin).mount("#app");
	}
});
