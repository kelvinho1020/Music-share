import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import './assets/tailwind.css'
import VeeValidatePlugin from "@/includes/validation";

createApp(App).use(store).use(router).use(VeeValidatePlugin).mount("#app");
