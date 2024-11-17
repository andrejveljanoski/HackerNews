import { createApp } from "vue";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import Toast from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "./style.css";
import App from "./App.vue";
import router from "./router";

const queryClient = new QueryClient();

const app = createApp(App);
app.use(VueQueryPlugin, { queryClient });
app.use(router);
app.use(Toast);
app.mount("#app");
