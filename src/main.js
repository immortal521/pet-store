import "./assets/base.css";
import "./assets/iconfont/iconfont.css";

import { createApp } from "vue";
import { setupStore } from "@/stores/index.js";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

setupStore(app);
app.use(router);

app.mount("#app");
