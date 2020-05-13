import Vue from "vue";
import App from "./App.vue";
import router from "@/router";

//transmitting between chat
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
//ui library
import vuetify from "./plugins/vuetify";
//scrolling
import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";
//icon material
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// for validation form
import Vuelidate from 'vuelidate'

// for validation form
Vue.use(Vuelidate)

Vue.use(PerfectScrollbar);

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
  render: (h) => h(App),
}).$mount("#app");
