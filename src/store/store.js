import { createStore } from "vuex";
import authStore from "../store/authStore";

export default createStore({
  modules: {authStore}
});
