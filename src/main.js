import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import VueObserveVisibility from "vue-observe-visibility";
import "vue-loading-overlay/dist/vue-loading.css";

import "./assets/app.css";
import useAuthStore from "./store/auth";

const app = createApp(App);

const pania = createPinia();
app.use(pania);

app.use(VueObserveVisibility);

const auth = useAuthStore();

auth.boot().then(() => {
  app.use(router);
  router.isReady().then(() => {
    app.mount("#app");
  });
});
