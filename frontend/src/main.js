import Vue from "vue";
import App from "./App.vue";
import router from "@/router";

import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
import vuetify from './plugins/vuetify';

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO("http://localhost:3000"),
  })
);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
