import { createStore } from "vuex";
import authStore from "@/store/authStore";
import songStore from '@/store/songStore'
import themeStore from '@/store/themeStore'

export default createStore({
  modules: {authStore, songStore, themeStore}
});
