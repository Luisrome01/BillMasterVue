import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/Router.js";

import "./style.css";

createApp(App).use(router).mount("#app");
