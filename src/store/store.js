import { createStore } from "vuex";
import authStore from "@/store/authStore";
import songStore from '@/store/songStore'

export default createStore({
  modules: {authStore, songStore}
});
