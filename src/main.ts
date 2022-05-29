import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(createPinia);
app.mount("#app");
