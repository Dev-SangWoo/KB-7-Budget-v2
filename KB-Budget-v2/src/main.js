import { createApp } from "vue";

import "./assets/theme.css";
import App from "./App.vue";
import router from "./router";
import { createAppPinia } from "./plugins/pinia.js";
import { createGtag } from "vue-gtag";

const app = createApp(App);

const gtag = createGtag({
  tagId: "GTM-NC4Q9LWD",
  router,
});

app.use(createAppPinia());
app.use(router);
app.use(gtag);

app.mount("#app");
